import React, { useState, useEffect, useCallback } from 'react';
import { DollarSign, TrendingUp, Users, Shield, Zap, Calculator, Download, Upload, Presentation, ArrowLeft, Settings, X, Search, Loader2, Building2, AlertTriangle, RotateCcw } from 'lucide-react';

export type ModelType = 'marketing' | 'ecommerce' | 'knowledge';

interface TCOCalculatorProps {
  model: ModelType;
  onBack: () => void;
}

const modelConfigs = {
  marketing: {
    name: 'Marketing Sites',
    enabledDrivers: ['revenue', 'cx'],
    defaults: {
      monthlyVisitors: 100000,
      currentConversionRate: 2.5,
      avgRevenuePerConversion: 2000,
      campaignLaunchTime: 21,
      campaignsPerYear: 6,
      developerHourlyRate: 150,
      monthlyDevHoursOnContent: 80,
      numberOfCMS: 2,
      cmsMaintenanceCostPerYear: 75000,
      marketingTeamSize: 8,
      downtimeHoursPerYear: 12,
      hourlyRevenueLoss: 25000,
      complianceAuditCost: 50000,
      securityIncidentsPerYear: 1,
      incidentCost: 75000,
      currentBounceRate: 55,
      repeatCustomerRateIncrease: 10,
      implementationCost: 125000,
      implementationTime: 6,
      annualLicenseCost: 60000,
      conversionRateIncrease: 15,
      timeToMarketReduction: 65,
      devEfficiencyGain: 45,
      downtimeReduction: 85,
      cxImprovement: 30
    }
  },
  ecommerce: {
    name: 'Ecommerce Sites',
    enabledDrivers: ['revenue', 'risk'],
    defaults: {
      monthlyVisitors: 250000,
      currentConversionRate: 2.5,
      avgRevenuePerConversion: 150,
      campaignLaunchTime: 14,
      campaignsPerYear: 12,
      developerHourlyRate: 175,
      monthlyDevHoursOnContent: 120,
      numberOfCMS: 3,
      cmsMaintenanceCostPerYear: 150000,
      marketingTeamSize: 12,
      downtimeHoursPerYear: 8,
      hourlyRevenueLoss: 100000,
      complianceAuditCost: 100000,
      securityIncidentsPerYear: 3,
      incidentCost: 150000,
      currentBounceRate: 40,
      repeatCustomerRateIncrease: 10,
      implementationCost: 200000,
      implementationTime: 9,
      annualLicenseCost: 100000,
      conversionRateIncrease: 25,
      timeToMarketReduction: 70,
      devEfficiencyGain: 55,
      downtimeReduction: 95,
      cxImprovement: 20
    }
  },
  knowledge: {
    name: 'Knowledge Bases',
    enabledDrivers: ['efficiency', 'cx'],
    defaults: {
      monthlyVisitors: 75000,
      currentConversionRate: 2.5,
      avgRevenuePerConversion: 500,
      campaignLaunchTime: 30,
      campaignsPerYear: 4,
      developerHourlyRate: 140,
      monthlyDevHoursOnContent: 200,
      numberOfCMS: 4,
      cmsMaintenanceCostPerYear: 120000,
      marketingTeamSize: 6,
      downtimeHoursPerYear: 16,
      hourlyRevenueLoss: 15000,
      complianceAuditCost: 60000,
      securityIncidentsPerYear: 1,
      incidentCost: 50000,
      currentBounceRate: 35,
      repeatCustomerRateIncrease: 10,
      implementationCost: 100000,
      implementationTime: 4,
      annualLicenseCost: 50000,
      conversionRateIncrease: 5,
      timeToMarketReduction: 50,
      devEfficiencyGain: 60,
      downtimeReduction: 80,
      cxImprovement: 35
    }
  }
};

export default function TCOCalculator({ model, onBack }: TCOCalculatorProps) {
  const config = modelConfigs[model];
  const [valueDriver, setValueDriver] = useState(config.enabledDrivers[0]);
  const [inputs, setInputs] = useState(config.defaults);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [prospectName, setProspectName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [companyData, setCompanyData] = useState<{
    name: string;
    industry: string;
    monthlyVisitors?: number;
    avgRevenuePerConversion?: number;
    currentConversionRate?: number;
    currentBounceRate?: number;
    marketingTeamSize?: number;
    numberOfCMS?: number;
  } | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [roiYears, setRoiYears] = useState<3 | 5>(3);

  const STORAGE_KEY = `tco-calculator-${model}`;

  // Load saved inputs from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        // Merge saved values with defaults (in case new fields were added)
        setInputs(prev => ({ ...config.defaults, ...parsedSaved }));
      }
    } catch (e) {
      console.error('Failed to load saved inputs:', e);
    }
  }, [model]);

  // Save inputs to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    } catch (e) {
      console.error('Failed to save inputs:', e);
    }
  }, [inputs, STORAGE_KEY]);

  // Track unsaved changes and warn on page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(String(value)) }));
    setIsDirty(true);
  };

  const handleBackClick = useCallback(() => {
    if (isDirty) {
      setPendingAction(() => onBack);
      setShowUnsavedModal(true);
    } else {
      onBack();
    }
  }, [isDirty, onBack]);

  const handleDiscardChanges = () => {
    setShowUnsavedModal(false);
    setIsDirty(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleExportAndContinue = () => {
    exportToCSV();
    setShowUnsavedModal(false);
    setIsDirty(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const resetToDefaults = () => {
    setInputs(config.defaults);
    setIsDirty(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear saved inputs:', e);
    }
  };

  const searchCompanyData = async (companyName: string) => {
    setIsSearching(true);
    setCompanyData(null);
    
    try {
      // Check if input looks like a domain
      const isDomain = companyName.includes('.') && !companyName.includes(' ');
      
      const response = await fetch('/api/company-lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isDomain 
            ? { domain: companyName } 
            : { companyName: companyName }
        ),
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setCompanyData({
          name: result.data.name,
          industry: result.data.industry,
          monthlyVisitors: result.data.monthlyVisitors,
          avgRevenuePerConversion: result.data.avgRevenuePerConversion,
          currentConversionRate: result.data.currentConversionRate,
          currentBounceRate: result.data.currentBounceRate,
          marketingTeamSize: result.data.marketingTeamSize,
          numberOfCMS: result.data.numberOfCMS,
        });
      } else {
        // Show error state
        console.error('Company lookup failed:', result.error);
        setCompanyData(null);
      }
    } catch (error) {
      console.error('Error searching company data:', error);
      setCompanyData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const applyCompanyData = () => {
    if (!companyData) return;
    
    setInputs(prev => ({
      ...prev,
      ...(companyData.monthlyVisitors && { monthlyVisitors: companyData.monthlyVisitors }),
      ...(companyData.avgRevenuePerConversion && { avgRevenuePerConversion: companyData.avgRevenuePerConversion }),
      ...(companyData.currentConversionRate && { currentConversionRate: Math.round(companyData.currentConversionRate * 10) / 10 }),
      ...(companyData.currentBounceRate && { currentBounceRate: companyData.currentBounceRate }),
      ...(companyData.marketingTeamSize && { marketingTeamSize: companyData.marketingTeamSize }),
      ...(companyData.numberOfCMS && { numberOfCMS: companyData.numberOfCMS })
    }));
    
    setIsDirty(true);
    setShowConfigureModal(false);
  };

  const calculateRevenueImpact = () => {
    const annualVisitors = inputs.monthlyVisitors * 12;
    const currentConversions = annualVisitors * (inputs.currentConversionRate / 100);
    const currentRevenue = currentConversions * inputs.avgRevenuePerConversion;
    const newConversionRate = inputs.currentConversionRate * (1 + inputs.conversionRateIncrease / 100);
    const newConversions = annualVisitors * (newConversionRate / 100);
    const newRevenue = newConversions * inputs.avgRevenuePerConversion;
    const timeToMarketValue = (currentRevenue / 365) * (inputs.campaignLaunchTime * inputs.timeToMarketReduction / 100) * inputs.campaignsPerYear;
    return {
      currentRevenue,
      newRevenue,
      conversionLift: newRevenue - currentRevenue,
      timeToMarketValue,
      totalLift: (newRevenue - currentRevenue) + timeToMarketValue
    };
  };

  const calculateEfficiencyImpact = () => {
    const currentDevCost = inputs.monthlyDevHoursOnContent * inputs.developerHourlyRate * 12;
    const savedDevHours = inputs.monthlyDevHoursOnContent * (inputs.devEfficiencyGain / 100);
    const devCostSavings = savedDevHours * inputs.developerHourlyRate * 12;
    const cmsConsolidationSavings = inputs.cmsMaintenanceCostPerYear * ((inputs.numberOfCMS - 1) / inputs.numberOfCMS);
    const marketingProductivityGain = (inputs.marketingTeamSize * 80000) * 0.3;
    return {
      currentDevCost,
      devCostSavings,
      cmsConsolidationSavings,
      marketingProductivityGain,
      totalSavings: devCostSavings + cmsConsolidationSavings + marketingProductivityGain
    };
  };

  const calculateRiskImpact = () => {
    const currentDowntimeCost = inputs.downtimeHoursPerYear * inputs.hourlyRevenueLoss;
    const downtimeSavings = currentDowntimeCost * (inputs.downtimeReduction / 100);
    const securitySavings = inputs.securityIncidentsPerYear * inputs.incidentCost * 0.75;
    const complianceEfficiency = inputs.complianceAuditCost * 0.4;
    return {
      currentDowntimeCost,
      downtimeSavings,
      securitySavings,
      complianceEfficiency,
      totalRiskReduction: downtimeSavings + securitySavings + complianceEfficiency
    };
  };

  const calculateCXImpact = () => {
    const baseRevenue = inputs.monthlyVisitors * 12 * (inputs.currentConversionRate / 100) * inputs.avgRevenuePerConversion;
    const bounceReduction = (inputs.currentBounceRate * 0.3) / 100;
    const bounceImpact = baseRevenue * bounceReduction;
    const engagementLift = baseRevenue * (inputs.cxImprovement / 100);
    const repeatCustomerLift = baseRevenue * (inputs.repeatCustomerRateIncrease / 100) * 0.5;
    return {
      bounceImpact,
      engagementLift,
      repeatCustomerLift,
      totalCXValue: bounceImpact + engagementLift + repeatCustomerLift
    };
  };

  const revenue = calculateRevenueImpact();
  const efficiency = calculateEfficiencyImpact();
  const risk = calculateRiskImpact();
  const cx = calculateCXImpact();

  const totalAnnualBenefit = 
    (config.enabledDrivers.includes('revenue') ? revenue.totalLift : 0) + 
    (config.enabledDrivers.includes('efficiency') ? efficiency.totalSavings : 0) + 
    (config.enabledDrivers.includes('risk') ? risk.totalRiskReduction : 0) + 
    (config.enabledDrivers.includes('cx') ? cx.totalCXValue : 0);
  const multiYearBenefit = totalAnnualBenefit * roiYears;
  const totalCost = inputs.implementationCost + (inputs.annualLicenseCost * roiYears);
  const netBenefit = multiYearBenefit - totalCost;
  const roi = ((netBenefit / totalCost) * 100);
  const roiLabel = `${roiYears}-Year`;
  const paybackMonths = inputs.implementationTime + (inputs.implementationCost / (totalAnnualBenefit / 12));

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  };

  const exportToCSV = () => {
    const inputLabels = {
      monthlyVisitors: 'Monthly Website Visitors',
      currentConversionRate: 'Current Conversion Rate (%)',
      avgRevenuePerConversion: 'Avg Revenue per Conversion ($)',
      campaignLaunchTime: 'Campaign Launch Time (Days)',
      campaignsPerYear: 'Major Campaigns per Year',
      developerHourlyRate: 'Developer Hourly Rate ($)',
      monthlyDevHoursOnContent: 'Monthly Dev Hours on Content',
      numberOfCMS: 'Number of CMS Systems',
      cmsMaintenanceCostPerYear: 'Annual CMS Maintenance Cost ($)',
      marketingTeamSize: 'Marketing Team Size',
      downtimeHoursPerYear: 'Downtime Hours per Year',
      hourlyRevenueLoss: 'Hourly Revenue Loss ($)',
      complianceAuditCost: 'Annual Compliance Audit Cost ($)',
      securityIncidentsPerYear: 'Security Incidents per Year',
      incidentCost: 'Cost per Security Incident ($)',
      currentBounceRate: 'Current Bounce Rate (%)',
      repeatCustomerRateIncrease: 'Repeat Customer Rate Increase (%)',
      implementationCost: 'Implementation Cost ($)',
      implementationTime: 'Implementation Time (Months)',
      annualLicenseCost: 'Annual License Cost ($)',
      conversionRateIncrease: 'Expected Conversion Increase (%)',
      timeToMarketReduction: 'Time-to-Market Reduction (%)',
      devEfficiencyGain: 'Developer Efficiency Gain (%)',
      downtimeReduction: 'Downtime Reduction (%)',
      cxImprovement: 'Expected CX Improvement (%)'
    };

    const csvRows = [
      ['Input Parameter', 'Value'],
      ...Object.entries(inputs).map(([key, value]) => [inputLabels[key] || key, value])
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'contentful-roi-inputs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDirty(false);
  };

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Map labels to keys (lowercase for case-insensitive matching)
    const labelToKey: Record<string, string> = {
      'monthly website visitors': 'monthlyVisitors',
      'current conversion rate (%)': 'currentConversionRate',
      'avg revenue per conversion ($)': 'avgRevenuePerConversion',
      'campaign launch time (days)': 'campaignLaunchTime',
      'major campaigns per year': 'campaignsPerYear',
      'developer hourly rate ($)': 'developerHourlyRate',
      'monthly dev hours on content': 'monthlyDevHoursOnContent',
      'number of cms systems': 'numberOfCMS',
      'annual cms maintenance cost ($)': 'cmsMaintenanceCostPerYear',
      'marketing team size': 'marketingTeamSize',
      'downtime hours per year': 'downtimeHoursPerYear',
      'hourly revenue loss ($)': 'hourlyRevenueLoss',
      'annual compliance audit cost ($)': 'complianceAuditCost',
      'security incidents per year': 'securityIncidentsPerYear',
      'cost per security incident ($)': 'incidentCost',
      'current bounce rate (%)': 'currentBounceRate',
      'repeat customer rate increase (%)': 'repeatCustomerRateIncrease',
      'implementation cost ($)': 'implementationCost',
      'implementation time (months)': 'implementationTime',
      'annual license cost ($)': 'annualLicenseCost',
      'expected conversion increase (%)': 'conversionRateIncrease',
      'time-to-market reduction (%)': 'timeToMarketReduction',
      'developer efficiency gain (%)': 'devEfficiencyGain',
      'downtime reduction (%)': 'downtimeReduction',
      'expected cx improvement (%)': 'cxImprovement'
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target?.result as string;
      
      // Remove BOM if present
      if (text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
      }
      
      // Handle both Windows (\r\n) and Unix (\n) line endings
      const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(line => line.trim());
      
      // Parse CSV into updates object
      const updates: Record<string, number> = {};
      
      // Skip header row, parse each data row
      for (let i = 1; i < lines.length; i++) {
        // Handle quoted CSV values
        const line = lines[i];
        let parts: string[];
        
        // Simple CSV parsing that handles quotes
        if (line.includes('"')) {
          parts = [];
          let current = '';
          let inQuotes = false;
          for (const char of line) {
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              parts.push(current);
              current = '';
            } else {
              current += char;
            }
          }
          parts.push(current);
        } else {
          parts = line.split(',');
        }
        
        if (parts.length >= 2) {
          const label = parts[0].trim().toLowerCase();
          const valueStr = parts[1].trim();
          const key = labelToKey[label];
          if (key && valueStr) {
            const value = parseFloat(valueStr);
            if (!isNaN(value)) {
              updates[key] = value;
            }
          }
        }
      }
      
      if (Object.keys(updates).length > 0) {
        // Use functional update to ensure we get latest state
        setInputs(prevInputs => ({
          ...prevInputs,
          ...updates
        }));
      }
    };
    
    reader.readAsText(file);
    // Reset file input so same file can be imported again
    event.target.value = '';
  };

  const generatePresentation = () => {
    const logoUrl = 'https://images.ctfassets.net/jtqsy5pye0zd/6wNuQ2xMvbw134rccObi0q/bf61badc6d6d9780609e541713f0bba6/Contentful_Logo_2.5_Dark.svg';
    
    // Build slides array - always include title, exec summary, and investment slides
    // Include only enabled value driver slides
    const enabledDrivers = config.enabledDrivers;
    const totalSlides = 3 + enabledDrivers.length; // title + exec summary + investment + enabled drivers
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contentful Business Case - ${config.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --ctfl-blue: #0286FF;
      --ctfl-green: #00D47E;
      --ctfl-yellow: #FFDA00;
      --ctfl-orange: #E65021;
      --ctfl-gray: #D9DBDD;
      --ctfl-dark: #1A1A1A;
      --ctfl-bg: #F7F8F9;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body {
      height: 100%;
      overflow: hidden;
      font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--ctfl-bg);
      color: var(--ctfl-dark);
      line-height: 1.5;
    }
    
    .slideshow {
      height: 100vh;
      width: 100vw;
      position: relative;
    }
    
    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 50px 70px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
      background: white;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    
    .slide.active {
      opacity: 1;
      visibility: visible;
    }
    
    .logo {
      height: 24px;
    }
    
    .eyebrow {
      display: inline-block;
      padding: 8px 20px;
      border: 2px solid var(--ctfl-dark);
      border-radius: 50px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    
    .title-content {
      max-width: 50%;
      position: relative;
      z-index: 1;
    }
    
    h1 {
      font-size: 52px;
      font-weight: 700;
      line-height: 1.1;
      color: var(--ctfl-dark);
      margin-bottom: 16px;
    }
    
    h2 {
      font-size: 44px;
      font-weight: 700;
      line-height: 1.15;
      color: var(--ctfl-dark);
      margin-bottom: 12px;
    }
    
    .subtitle {
      font-size: 22px;
      font-weight: 400;
      color: #666;
      margin-bottom: 32px;
    }
    
    .slide-content {
      flex: 1;
      display: flex;
    }
    
    .content-left {
      flex: 1;
      padding-right: 60px;
    }
    
    .content-right {
      width: 320px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    /* Geometric pattern for title slides */
    .geo-pattern {
      position: absolute;
      right: 0;
      top: 0;
      width: 45%;
      height: calc(100% - 100px);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(7, 1fr);
      gap: 8px;
      padding: 20px;
      overflow: hidden;
    }
    
    .geo-shape {
      border-radius: 50px;
    }
    
    .geo-circle { border-radius: 50%; }
    .geo-pill { border-radius: 50px; }
    .geo-half { border-radius: 0 100px 100px 0; }
    .geo-half-left { border-radius: 100px 0 0 100px; }
    
    .bg-blue { background: var(--ctfl-blue); }
    .bg-green { background: var(--ctfl-green); }
    .bg-yellow { background: var(--ctfl-yellow); }
    .bg-orange { background: var(--ctfl-orange); }
    .bg-gray { background: var(--ctfl-gray); }
    
    /* Stats sidebar */
    .stats-sidebar {
      background: var(--ctfl-blue);
      color: white;
      padding: 40px 30px;
      padding-bottom: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 40px;
      min-height: calc(100% - 60px);
      border-radius: 0 0 12px 12px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .stat-desc {
      font-size: 13px;
      opacity: 0.85;
      line-height: 1.4;
    }
    
    /* Bullet list */
    .bullet-list {
      list-style: disc;
      padding-left: 24px;
      font-size: 18px;
      line-height: 1.8;
      color: var(--ctfl-dark);
    }
    
    .bullet-list li {
      margin-bottom: 12px;
    }
    
    /* Colorful bottom strip */
    .color-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 20px 0;
      margin-top: auto;
    }
    
    .strip-shape {
      height: 24px;
      flex-shrink: 0;
    }
    
    .strip-pill { width: 60px; border-radius: 12px; }
    .strip-circle { width: 24px; border-radius: 50%; }
    .strip-wide { width: 100px; border-radius: 12px; }
    .strip-arrow { width: 20px; font-size: 18px; color: var(--ctfl-gray); }
    
    /* Footer */
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #888;
      padding-top: 20px;
    }
    
    /* Summary cards */
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 24px 0;
    }
    
    .summary-card {
      background: var(--ctfl-bg);
      border-radius: 12px;
      padding: 24px;
    }
    
    .summary-card .label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .summary-card .value {
      font-size: 32px;
      font-weight: 700;
      color: var(--ctfl-dark);
    }
    
    .summary-card.highlight {
      background: var(--ctfl-blue);
      color: white;
    }
    
    .summary-card.highlight .label {
      color: rgba(255,255,255,0.8);
    }
    
    .summary-card.highlight .value {
      color: white;
    }
    
    /* Value driver cards row */
    .driver-cards {
      display: flex;
      gap: 16px;
      margin: 24px 0;
    }
    
    .driver-card {
      flex: 1;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    
    .driver-card .icon {
      font-size: 28px;
      margin-bottom: 8px;
    }
    
    .driver-card .name {
      font-size: 13px;
      color: #666;
      margin-bottom: 4px;
    }
    
    .driver-card .amount {
      font-size: 20px;
      font-weight: 700;
    }
    
    .driver-card.green { background: #E8F9F0; }
    .driver-card.green .amount { color: #00875A; }
    .driver-card.blue { background: #E6F3FF; }
    .driver-card.blue .amount { color: var(--ctfl-blue); }
    .driver-card.orange { background: #FFF0E6; }
    .driver-card.orange .amount { color: var(--ctfl-orange); }
    .driver-card.yellow { background: #FFFBE6; }
    .driver-card.yellow .amount { color: #B8860B; }
    
    /* Yearly Value Line Chart */
    .yearly-chart {
      margin-top: 24px;
      padding: 20px;
      background: var(--ctfl-bg);
      border-radius: 12px;
    }
    
    .yearly-chart h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--ctfl-dark);
      margin-bottom: 16px;
    }
    
    .line-chart-container {
      position: relative;
      width: 100%;
      height: 180px;
    }
    
    .line-chart-svg {
      width: 100%;
      height: 100%;
    }
    
    .chart-line {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    
    .chart-line.benefit {
      stroke: #00875A;
    }
    
    .chart-line.investment {
      stroke: var(--ctfl-orange);
    }
    
    .chart-point {
      stroke-width: 2;
      stroke: white;
    }
    
    .chart-point.benefit {
      fill: #00875A;
    }
    
    .chart-point.investment {
      fill: var(--ctfl-orange);
    }
    
    .chart-grid-line {
      stroke: #E5E7EB;
      stroke-width: 1;
    }
    
    .chart-axis-label {
      font-size: 11px;
      fill: #666;
    }
    
    .chart-value-label {
      font-size: 10px;
      font-weight: 600;
    }
    
    .chart-value-label.benefit {
      fill: #00875A;
    }
    
    .chart-value-label.investment {
      fill: var(--ctfl-orange);
    }
    
    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-top: 16px;
      justify-content: center;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #666;
    }
    
    .legend-line {
      width: 24px;
      height: 3px;
      border-radius: 2px;
    }
    
    .legend-line.benefit {
      background: #00875A;
    }
    
    .legend-line.investment {
      background: var(--ctfl-orange);
    }
    
    /* Breakdown rows */
    .breakdown-section {
      background: var(--ctfl-bg);
      border-radius: 12px;
      padding: 24px;
      margin: 20px 0;
    }
    
    .breakdown-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #E5E7EB;
      font-size: 16px;
    }
    
    .breakdown-row:last-child {
      border-bottom: none;
    }
    
    .breakdown-row .label {
      color: #666;
    }
    
    .breakdown-row .value {
      font-weight: 600;
      color: var(--ctfl-dark);
    }
    
    .breakdown-row.total {
      border-top: 2px solid var(--ctfl-dark);
      border-bottom: none;
      margin-top: 8px;
      padding-top: 16px;
      font-weight: 700;
    }
    
    /* Proof points */
    .proof-section {
      background: #E6F3FF;
      border-radius: 12px;
      padding: 20px 24px;
      margin-top: 20px;
    }
    
    .proof-section h4 {
      font-size: 15px;
      font-weight: 600;
      color: var(--ctfl-blue);
      margin-bottom: 12px;
    }
    
    .proof-section ul {
      list-style: none;
      font-size: 15px;
      color: #1A5FB4;
    }
    
    .proof-section li {
      padding: 4px 0;
    }
    
    .proof-section li::before {
      content: "✓ ";
      color: var(--ctfl-green);
      font-weight: bold;
    }
    
    .proof-section a {
      color: var(--ctfl-blue);
      text-decoration: underline;
      font-weight: 600;
    }
    
    .proof-section a:hover {
      color: #0066CC;
    }
    
    /* CTA section */
    .cta-section {
      background: var(--ctfl-blue);
      color: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      margin-top: 24px;
    }
    
    .cta-section h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .cta-section p {
      font-size: 16px;
      opacity: 0.9;
    }
    
    /* Navigation Controls */
    .nav-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 20px;
    }
    
    .nav-controls {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(26, 26, 26, 0.9);
      padding: 10px 20px;
      border-radius: 50px;
      backdrop-filter: blur(10px);
      opacity: 1;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .nav-controls.hidden {
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
    }
    
    .nav-wrapper:hover .nav-controls.hidden {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    
    .nav-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: var(--ctfl-blue);
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .nav-btn:hover:not(:disabled) {
      background: #0066CC;
      transform: scale(1.1);
    }
    
    .nav-btn:disabled {
      background: #666;
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .slide-indicator {
      display: flex;
      gap: 6px;
    }
    
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #666;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .dot.active {
      background: var(--ctfl-blue);
      transform: scale(1.3);
    }
    
    .dot:hover {
      background: #888;
    }
    
    .slide-counter {
      color: white;
      font-size: 13px;
      font-weight: 500;
      min-width: 50px;
      text-align: center;
    }
    
    .keyboard-hint {
      color: rgba(255,255,255,0.6);
      font-size: 11px;
      margin-bottom: 8px;
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    
    .keyboard-hint.hidden {
      opacity: 0;
    }
    
    .nav-wrapper:hover .keyboard-hint.hidden {
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="slideshow">
    <!-- Slide 1: Title -->
    <div class="slide active" data-slide="0" style="position: relative;">
      <div class="title-content">
        <div class="eyebrow">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        <h1>Business Case<br>for Contentful</h1>
        <p class="subtitle">A comprehensive ROI analysis demonstrating the value of migrating to a modern, composable content platform</p>
      </div>
      
      <div class="geo-pattern">
        <div class="geo-shape geo-pill bg-green" style="grid-column: span 2;"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-circle bg-yellow"></div>
        <div class="geo-shape geo-circle bg-orange" style="width: 20px; height: 20px;"></div>
        <div class="geo-shape geo-circle bg-blue"></div>
        <div class="geo-shape geo-pill bg-gray" style="grid-column: span 2;"></div>
        <div class="geo-shape geo-circle bg-green"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-pill bg-yellow" style="grid-column: span 3;"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-circle bg-blue"></div>
        <div class="geo-shape geo-half bg-blue"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-pill bg-gray" style="grid-column: span 2;"></div>
        <div class="geo-shape geo-circle bg-yellow"></div>
        <div class="geo-shape geo-circle bg-green"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-half bg-orange"></div>
        <div class="geo-shape geo-circle bg-blue"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-pill bg-green" style="grid-column: span 2;"></div>
        <div class="geo-shape geo-circle bg-yellow"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-circle bg-orange"></div>
        <div class="geo-shape geo-half-left bg-blue"></div>
        <div class="geo-shape geo-circle bg-gray"></div>
        <div class="geo-shape geo-pill bg-yellow" style="grid-column: span 2;"></div>
      </div>
      
      <div class="slide-footer" style="margin-top: auto;"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>

    <!-- Slide 2: Executive Summary -->
    <div class="slide" data-slide="1">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Executive Summary</div>
          <h2>Total Business Impact</h2>
          <p class="subtitle">${roiYears}-year projected value from Contentful implementation</p>
          
          <div class="summary-grid">
            <div class="summary-card highlight">
              <div class="label">${roiYears}-Year Total Benefit</div>
              <div class="value">${formatCurrency(multiYearBenefit)}</div>
            </div>
            <div class="summary-card highlight">
              <div class="label">Return on Investment</div>
              <div class="value">${roi.toFixed(0)}%</div>
            </div>
            <div class="summary-card">
              <div class="label">Annual Benefit</div>
              <div class="value">${formatCurrency(totalAnnualBenefit)}</div>
            </div>
            <div class="summary-card">
              <div class="label">Payback Period</div>
              <div class="value">${paybackMonths.toFixed(1)} months</div>
            </div>
          </div>
          
          <div class="driver-cards">
            ${enabledDrivers.includes('revenue') ? `<div class="driver-card green">
              <div class="icon">📈</div>
              <div class="name">Revenue Growth</div>
              <div class="amount">${formatCurrency(revenue.totalLift)}</div>
            </div>` : ''}
            ${enabledDrivers.includes('efficiency') ? `<div class="driver-card blue">
              <div class="icon">⚡</div>
              <div class="name">Operational Efficiency</div>
              <div class="amount">${formatCurrency(efficiency.totalSavings)}</div>
            </div>` : ''}
            ${enabledDrivers.includes('risk') ? `<div class="driver-card orange">
              <div class="icon">🛡️</div>
              <div class="name">Risk Mitigation</div>
              <div class="amount">${formatCurrency(risk.totalRiskReduction)}</div>
            </div>` : ''}
            ${enabledDrivers.includes('cx') ? `<div class="driver-card yellow">
              <div class="icon">👥</div>
              <div class="name">Customer Experience</div>
              <div class="amount">${formatCurrency(cx.totalCXValue)}</div>
            </div>` : ''}
          </div>
          
          <div class="yearly-chart">
            <h4>Investment vs. Cumulative Benefit</h4>
            ${(() => {
              // Calculate data points for both lines
              const chartDataPoints: Array<{year: number, cumulativeBenefit: number, cumulativeInvestment: number}> = [];
              for (let i = 0; i < roiYears; i++) {
                const year = i + 1;
                const cumulativeBenefit = totalAnnualBenefit * year;
                const cumulativeInvestment = inputs.implementationCost + (inputs.annualLicenseCost * year);
                chartDataPoints.push({ year, cumulativeBenefit, cumulativeInvestment });
              }
              
              // Find max value for scaling
              const chartMaxValue = Math.max(
                chartDataPoints[chartDataPoints.length - 1].cumulativeBenefit,
                chartDataPoints[chartDataPoints.length - 1].cumulativeInvestment
              );
              
              // SVG dimensions
              const svgWidth = 500;
              const svgHeight = 170;
              const padTop = 20, padRight = 70, padBottom = 50, padLeft = 10;
              const plotWidth = svgWidth - padLeft - padRight;
              const plotHeight = svgHeight - padTop - padBottom;
              
              // Generate points for benefit line
              const bPoints = chartDataPoints.map((d, i) => ({
                x: padLeft + (i / (roiYears - 1)) * plotWidth,
                y: padTop + plotHeight - (d.cumulativeBenefit / chartMaxValue) * plotHeight,
                value: d.cumulativeBenefit,
                year: d.year
              }));
              
              // Generate points for investment line
              const iPoints = chartDataPoints.map((d, i) => ({
                x: padLeft + (i / (roiYears - 1)) * plotWidth,
                y: padTop + plotHeight - (d.cumulativeInvestment / chartMaxValue) * plotHeight,
                value: d.cumulativeInvestment,
                year: d.year
              }));
              
              // Create path strings
              const bPath = bPoints.map((p, idx) => (idx === 0 ? 'M' : 'L') + ' ' + p.x + ' ' + p.y).join(' ');
              const iPath = iPoints.map((p, idx) => (idx === 0 ? 'M' : 'L') + ' ' + p.x + ' ' + p.y).join(' ');
              
              // Build SVG elements
              let svgContent = '<div class="line-chart-container">';
              svgContent += '<svg class="line-chart-svg" viewBox="0 0 ' + svgWidth + ' ' + svgHeight + '" preserveAspectRatio="xMidYMid meet">';
              
              // Grid lines
              svgContent += '<line class="chart-grid-line" x1="' + padLeft + '" y1="' + padTop + '" x2="' + (svgWidth - padRight) + '" y2="' + padTop + '"></line>';
              svgContent += '<line class="chart-grid-line" x1="' + padLeft + '" y1="' + (padTop + plotHeight/2) + '" x2="' + (svgWidth - padRight) + '" y2="' + (padTop + plotHeight/2) + '"></line>';
              svgContent += '<line class="chart-grid-line" x1="' + padLeft + '" y1="' + (padTop + plotHeight) + '" x2="' + (svgWidth - padRight) + '" y2="' + (padTop + plotHeight) + '"></line>';
              
              // Lines
              svgContent += '<path class="chart-line benefit" d="' + bPath + '"></path>';
              svgContent += '<path class="chart-line investment" d="' + iPath + '"></path>';
              
              // Benefit points and labels
              bPoints.forEach(p => {
                svgContent += '<circle class="chart-point benefit" cx="' + p.x + '" cy="' + p.y + '" r="5"></circle>';
                svgContent += '<text class="chart-value-label benefit" x="' + p.x + '" y="' + (p.y - 10) + '" text-anchor="middle">' + formatCurrency(p.value) + '</text>';
              });
              
              // Investment points and labels
              iPoints.forEach(p => {
                svgContent += '<circle class="chart-point investment" cx="' + p.x + '" cy="' + p.y + '" r="5"></circle>';
                svgContent += '<text class="chart-value-label investment" x="' + p.x + '" y="' + (p.y + 18) + '" text-anchor="middle">' + formatCurrency(p.value) + '</text>';
              });
              
              // X-axis labels
              bPoints.forEach(p => {
                svgContent += '<text class="chart-axis-label" x="' + p.x + '" y="' + (svgHeight - 5) + '" text-anchor="middle">Year ' + p.year + '</text>';
              });
              
              svgContent += '</svg></div>';
              return svgContent;
            })()}
            <div class="chart-legend">
              <div class="legend-item"><div class="legend-line benefit"></div>Cumulative Benefit</div>
              <div class="legend-item"><div class="legend-line investment"></div>Total Investment</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${roi.toFixed(0)}%</div>
              <div class="stat-label">${roiYears}-Year ROI</div>
              <div class="stat-desc">Return on total investment including implementation and licensing</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${Math.round(paybackMonths) === 0 ? paybackMonths.toFixed(1) : paybackMonths.toFixed(0)} months</div>
              <div class="stat-label">Payback Period</div>
              <div class="stat-desc">Time to recover initial implementation investment</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(netBenefit)}</div>
              <div class="stat-label">Net Benefit</div>
              <div class="stat-desc">Total ${roiYears}-year benefit minus all costs</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>

    <!-- Value Driver Slides (conditionally rendered) -->
    ${enabledDrivers.includes('revenue') ? `
    <!-- Revenue Growth -->
    <div class="slide" data-slide="${2 + enabledDrivers.indexOf('revenue')}">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Revenue Growth</div>
          <h2>Accelerating Business Performance</h2>
          <p class="subtitle">Drive conversions and speed time-to-market with unified content delivery</p>
          
          <ul class="bullet-list">
            <li>Disconnected content systems stall campaign launches and make personalization hard</li>
            <li>Contentful brings all content into an API-first hub</li>
            <li>Marketers get self-serve tools to build, test, and tailor experiences quickly</li>
          </ul>
          
          <div class="breakdown-section">
            <div class="breakdown-row">
              <span class="label">Conversion Rate Lift</span>
              <span class="value">${formatCurrency(revenue.conversionLift)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">Time-to-Market Value</span>
              <span class="value">${formatCurrency(revenue.timeToMarketValue)}</span>
            </div>
            <div class="breakdown-row total">
              <span class="label">Total Revenue Impact</span>
              <span class="value" style="color: var(--ctfl-green);">${formatCurrency(revenue.totalLift)}</span>
            </div>
          </div>
          
          <div class="proof-section">
            <h4>Customer Success Stories</h4>
            <ul>
              <li><a href="https://www.contentful.com/case-studies/kraft-heinz/" target="_blank">Kraft Heinz:</a> 78% conversion rate increase</li>
              <li><a href="https://www.contentful.com/case-studies/ruggable/" target="_blank">Ruggable:</a> 25% higher conversions, 7x CTR</li>
              <li><a href="https://www.contentful.com/case-studies/kfc-global/" target="_blank">KFC:</a> 43% digital sales growth</li>
            </ul>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(revenue.totalLift)}</div>
              <div class="stat-label">Revenue Impact</div>
              <div class="stat-desc">Annual value from conversion improvements and faster launches</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.timeToMarketReduction}%</div>
              <div class="stat-label">Faster Time-to-Market</div>
              <div class="stat-desc">Reduction in campaign launch time</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.conversionRateIncrease}%</div>
              <div class="stat-label">Conversion Increase</div>
              <div class="stat-desc">Expected lift in conversion rates</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>
    ` : ''}

    ${enabledDrivers.includes('efficiency') ? `
    <!-- Operational Efficiency -->
    <div class="slide" data-slide="${2 + enabledDrivers.indexOf('efficiency')}">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Operational Efficiency</div>
          <h2>Doing More with Less</h2>
          <p class="subtitle">Reduce costs and free developers for higher-value work</p>
          
          <ul class="bullet-list">
            <li>Manual workflows and multiple CMSs slow releases and inflate content costs</li>
            <li>A single structured platform with visual editor lets marketers publish independently</li>
            <li>Developers focus on innovation instead of routine content updates</li>
          </ul>
          
          <div class="breakdown-section">
            <div class="breakdown-row">
              <span class="label">Developer Cost Savings</span>
              <span class="value">${formatCurrency(efficiency.devCostSavings)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">CMS Consolidation Savings</span>
              <span class="value">${formatCurrency(efficiency.cmsConsolidationSavings)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">Marketing Productivity Gain</span>
              <span class="value">${formatCurrency(efficiency.marketingProductivityGain)}</span>
            </div>
            <div class="breakdown-row total">
              <span class="label">Total Annual Savings</span>
              <span class="value" style="color: var(--ctfl-blue);">${formatCurrency(efficiency.totalSavings)}</span>
            </div>
          </div>
          
          <div class="proof-section">
            <h4>Customer Success Stories</h4>
            <ul>
              <li><a href="https://www.contentful.com/case-studies/audible/" target="_blank">Audible:</a> 80% decrease in content production time</li>
              <li><a href="https://www.contentful.com/case-studies/shiseido-professional/" target="_blank">Shiseido:</a> 50% reduction in content costs</li>
              <li><a href="https://www.contentful.com/case-studies/costa-coffee/" target="_blank">Costa Coffee:</a> 15 sites built in 15 minutes each</li>
            </ul>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(efficiency.totalSavings)}</div>
              <div class="stat-label">Annual Savings</div>
              <div class="stat-desc">Total operational cost reduction per year</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.devEfficiencyGain}%</div>
              <div class="stat-label">Dev Efficiency Gain</div>
              <div class="stat-desc">Reduction in developer time on content tasks</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.numberOfCMS}</div>
              <div class="stat-label">CMS Platforms</div>
              <div class="stat-desc">Consolidated to a single platform</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>
    ` : ''}

    ${enabledDrivers.includes('risk') ? `
    <!-- Risk Mitigation -->
    <div class="slide" data-slide="${2 + enabledDrivers.indexOf('risk')}">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Risk Mitigation</div>
          <h2>Reducing Business & Technical Risk</h2>
          <p class="subtitle">Enterprise-grade reliability with cloud-native architecture</p>
          
          <ul class="bullet-list">
            <li>Legacy stacks expose businesses to outages and traffic-spike failures</li>
            <li>Cloud-native architecture delivers high availability and rapid rollback</li>
            <li>Strong governance controls ensure security and compliance</li>
          </ul>
          
          <div class="breakdown-section">
            <div class="breakdown-row">
              <span class="label">Downtime Cost Savings</span>
              <span class="value">${formatCurrency(risk.downtimeSavings)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">Security Incident Savings</span>
              <span class="value">${formatCurrency(risk.securitySavings)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">Compliance Efficiency</span>
              <span class="value">${formatCurrency(risk.complianceEfficiency)}</span>
            </div>
            <div class="breakdown-row total">
              <span class="label">Total Risk Reduction</span>
              <span class="value" style="color: var(--ctfl-orange);">${formatCurrency(risk.totalRiskReduction)}</span>
            </div>
          </div>
          
          <div class="proof-section">
            <h4>Enterprise-Grade Reliability</h4>
            <ul>
              <li><a href="https://www.contentful.com/case-studies/milwaukeebucks/" target="_blank">Milwaukee Bucks:</a> 2.9M app opens, zero downtime</li>
              <li><a href="https://www.contentful.com/case-studies/telus-support-portal/" target="_blank">TELUS:</a> Consolidated 11 CMS platforms to one</li>
              <li><a href="https://www.contentful.com/case-studies/vodafone/" target="_blank">Vodafone:</a> 40% faster pages, zero outages</li>
            </ul>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(risk.totalRiskReduction)}</div>
              <div class="stat-label">Risk Reduction</div>
              <div class="stat-desc">Annual value from reduced downtime and incidents</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.downtimeReduction}%</div>
              <div class="stat-label">Downtime Reduction</div>
              <div class="stat-desc">With 99.99% uptime SLA</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">ISO/SOC2</div>
              <div class="stat-label">Certified</div>
              <div class="stat-desc">ISO 27001 & SOC 2 Type II compliant</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>
    ` : ''}

    ${enabledDrivers.includes('cx') ? `
    <!-- Customer Experience -->
    <div class="slide" data-slide="${2 + enabledDrivers.indexOf('cx')}">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Customer Experience</div>
          <h2>Elevating Engagement & Loyalty</h2>
          <p class="subtitle">Create fast, consistent, personalized journeys across every touchpoint</p>
          
          <ul class="bullet-list">
            <li>Siloed channels and sluggish pages erode engagement</li>
            <li>Composable delivery and reusable components ensure consistency</li>
            <li>Native personalization creates relevant experiences at scale</li>
          </ul>
          
          <div class="breakdown-section">
            <div class="breakdown-row">
              <span class="label">Bounce Rate Reduction Impact</span>
              <span class="value">${formatCurrency(cx.bounceImpact)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">Engagement Lift Value</span>
              <span class="value">${formatCurrency(cx.engagementLift)}</span>
            </div>
            <div class="breakdown-row">
              <span class="label">Repeat Customer Value</span>
              <span class="value">${formatCurrency(cx.repeatCustomerLift)}</span>
            </div>
            <div class="breakdown-row total">
              <span class="label">Total CX Value</span>
              <span class="value" style="color: #B8860B;">${formatCurrency(cx.totalCXValue)}</span>
            </div>
          </div>
          
          <div class="proof-section">
            <h4>Customer Success Stories</h4>
            <ul>
              <li><a href="https://www.contentful.com/case-studies/kraft-heinz/" target="_blank">Kraft Heinz:</a> 30% engagement increase</li>
              <li><a href="https://www.contentful.com/case-studies/telus-support-portal/" target="_blank">TELUS:</a> 14% conversion uplift, 30% faster loads</li>
              <li><a href="https://www.contentful.com/case-studies/bmw-tmwx/" target="_blank">BMW:</a> 47% increase in test-drive bookings</li>
            </ul>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(cx.totalCXValue)}</div>
              <div class="stat-label">CX Value</div>
              <div class="stat-desc">Annual value from improved customer experiences</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.cxImprovement}%</div>
              <div class="stat-label">CX Improvement</div>
              <div class="stat-desc">Expected engagement lift</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${inputs.currentBounceRate}%</div>
              <div class="stat-label">Current Bounce</div>
              <div class="stat-desc">Reduced with faster, better experiences</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>
    ` : ''}

    <!-- Investment & ROI -->
    <div class="slide" data-slide="${2 + enabledDrivers.length}">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Investment Summary</div>
          <h2>Investment & ROI</h2>
          <p class="subtitle">Comprehensive ${roiYears}-year financial analysis</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0;">
            <div class="breakdown-section">
              <h4 style="font-size: 16px; margin-bottom: 16px; color: var(--ctfl-dark);">Investment</h4>
              <div class="breakdown-row">
                <span class="label">Implementation</span>
                <span class="value">${formatCurrency(inputs.implementationCost)}</span>
              </div>
              <div class="breakdown-row">
                <span class="label">License (${roiYears} years)</span>
                <span class="value">${formatCurrency(inputs.annualLicenseCost * roiYears)}</span>
              </div>
              <div class="breakdown-row total">
                <span class="label">Total Investment</span>
                <span class="value">${formatCurrency(totalCost)}</span>
              </div>
            </div>
            
            <div class="breakdown-section">
              <h4 style="font-size: 16px; margin-bottom: 16px; color: var(--ctfl-dark);">Benefits</h4>
              <div class="breakdown-row">
                <span class="label">Annual Benefit</span>
                <span class="value">${formatCurrency(totalAnnualBenefit)}</span>
              </div>
              <div class="breakdown-row">
                <span class="label">${roiYears}-Year Benefit</span>
                <span class="value">${formatCurrency(multiYearBenefit)}</span>
              </div>
              <div class="breakdown-row total">
                <span class="label">Net Benefit</span>
                <span class="value" style="color: var(--ctfl-green);">${formatCurrency(netBenefit)}</span>
              </div>
            </div>
          </div>
          
          <div class="cta-section">
            <h3>Ready to Transform Your Content Operations?</h3>
            <p>Contact Contentful to discuss how we can help you achieve these results for your organization.</p>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${roi.toFixed(0)}%</div>
              <div class="stat-label">${roiYears}-Year ROI</div>
              <div class="stat-desc">Return on total investment</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(netBenefit)}</div>
              <div class="stat-label">Net Benefit</div>
              <div class="stat-desc">Total value minus costs</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${Math.round(paybackMonths) === 0 ? paybackMonths.toFixed(1) : paybackMonths.toFixed(0)} months</div>
              <div class="stat-label">Payback</div>
              <div class="stat-desc">Time to recover investment</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer"><span>© 2025 Contentful</span><img src="${logoUrl}" alt="Contentful" class="logo"></div>
    </div>

    <!-- Navigation Controls -->
    <div class="nav-wrapper" id="navWrapper">
      <div class="keyboard-hint" id="keyboardHint">Use ← → arrow keys or click to navigate</div>
      <div class="nav-controls" id="navControls">
        <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">←</button>
        <div class="slide-indicator" id="slideIndicator"></div>
        <span class="slide-counter" id="slideCounter">1 / ${totalSlides}</span>
        <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">→</button>
      </div>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const totalSlides = ${totalSlides};
    let hideTimeout;
    const HIDE_DELAY = 2000;
    
    function initSlideshow() {
      const indicator = document.getElementById('slideIndicator');
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        indicator.appendChild(dot);
      }
      updateNav();
      startHideTimer();
    }
    
    function showNav() {
      document.getElementById('navControls').classList.remove('hidden');
      document.getElementById('keyboardHint').classList.remove('hidden');
    }
    
    function hideNav() {
      document.getElementById('navControls').classList.add('hidden');
      document.getElementById('keyboardHint').classList.add('hidden');
    }
    
    function startHideTimer() {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(hideNav, HIDE_DELAY);
    }
    
    function resetHideTimer() {
      showNav();
      startHideTimer();
    }
    
    function changeSlide(direction) {
      const newSlide = currentSlide + direction;
      if (newSlide >= 0 && newSlide < totalSlides) {
        goToSlide(newSlide);
      }
      resetHideTimer();
    }
    
    function goToSlide(index) {
      document.querySelectorAll('.slide').forEach(slide => slide.classList.remove('active'));
      document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
      
      currentSlide = index;
      document.querySelector('[data-slide="' + index + '"]').classList.add('active');
      document.querySelectorAll('.dot')[index].classList.add('active');
      
      updateNav();
      resetHideTimer();
    }
    
    function updateNav() {
      document.getElementById('prevBtn').disabled = currentSlide === 0;
      document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
      document.getElementById('slideCounter').textContent = (currentSlide + 1) + ' / ' + totalSlides;
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        changeSlide(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeSlide(-1);
      }
    });
    
    document.addEventListener('mousemove', resetHideTimer);
    
    document.getElementById('navWrapper').addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
      showNav();
    });
    
    document.getElementById('navWrapper').addEventListener('mouseleave', startHideTimer);
    
    initSlideshow();
  </script>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'contentful-business-case.html');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SliderInput = ({ label, value, onChange, min, max, step, prefix = '', suffix = '', helper, decimals }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min: number;
    max: number;
    step: number;
    prefix?: string;
    suffix?: string;
    helper?: string;
    decimals?: number;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-base font-bold text-blue-600">
          {prefix}{decimals !== undefined ? value.toFixed(decimals) : formatNumber(value)}{suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer slider" style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #dbeafe ${((value - min) / (max - min)) * 100}%, #dbeafe 100%)` }} />
      {helper && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
  );

  const allValueDrivers = [
    { id: 'revenue', name: 'Revenue Growth', icon: TrendingUp, color: 'green' },
    { id: 'efficiency', name: 'Operational Efficiency', icon: Zap, color: 'blue' },
    { id: 'risk', name: 'Risk Mitigation', icon: Shield, color: 'purple' },
    { id: 'cx', name: 'Customer Experience', icon: Users, color: 'orange' }
  ];
  
  const valueDrivers = allValueDrivers.filter(d => config.enabledDrivers.includes(d.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <style>{`.slider::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #3b82f6; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.2s; } .slider::-webkit-slider-thumb:hover { transform: scale(1.2); background: #2563eb; } .slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #3b82f6; cursor: pointer; border: none; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.2s; } .slider::-moz-range-thumb:hover { transform: scale(1.2); background: #2563eb; }`}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <button onClick={handleBackClick} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Change Model</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {roiYears}-Year Model
            </span>
            <button
              onClick={() => setShowConfigureModal(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Configure</span>
            </button>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contentful Value ROI Calculator</h1>
          <p className="text-gray-600">{config.name} — Calculate business impact across key value drivers</p>
          {companyData && (
            <p className="text-blue-600 text-sm mt-1">
              <Building2 className="w-4 h-4 inline mr-1" />
              Configured for: <strong>{companyData.name}</strong> ({companyData.industry})
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {valueDrivers.map((driver) => {
            const Icon = driver.icon;
            const isActive = valueDriver === driver.id;
            return (
              <button key={driver.id} onClick={() => setValueDriver(driver.id)} className={`p-4 rounded-xl border-2 transition-all ${isActive ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-gray-600'}`}>{driver.name}</div>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-h-[800px] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />Configure Inputs</h2>

            <div className="space-y-6">
              {valueDriver === 'revenue' && (
                <>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Revenue Growth: Accelerating Business Performance</h3>
                    <p className="text-sm text-blue-700 mb-3">Disconnected content systems and reliance on IT stall campaign launches and make personalization hard. Contentful brings all content into an API-first hub and gives marketers self-serve tools to build, test, and tailor experiences quickly.</p>
                    <div className="text-xs text-blue-600"><strong>Expected Outcomes:</strong> 25-78% conversion increase • 60-80% faster time-to-market • Higher marketing ROI</div>
                  </div>
                  <SliderInput label="Monthly Website Visitors" value={inputs.monthlyVisitors} onChange={(val) => handleInputChange('monthlyVisitors', val)} min={10000} max={500000} step={10000} />
                  <SliderInput label="Current Conversion Rate" value={inputs.currentConversionRate} onChange={(val) => handleInputChange('currentConversionRate', val)} min={0} max={5} step={0.1} suffix="%" decimals={1} />
                  <SliderInput label="Avg Revenue per Conversion" value={inputs.avgRevenuePerConversion} onChange={(val) => handleInputChange('avgRevenuePerConversion', val)} min={500} max={20000} step={500} prefix="$" />
                  <SliderInput label="Campaign Launch Time (Days)" value={inputs.campaignLaunchTime} onChange={(val) => handleInputChange('campaignLaunchTime', val)} min={7} max={90} step={1} helper="Current time to launch" />
                  <SliderInput label="Major Campaigns per Year" value={inputs.campaignsPerYear} onChange={(val) => handleInputChange('campaignsPerYear', val)} min={1} max={24} step={1} helper="Number of significant launches annually" />
                  <div className="border-t pt-4">
                    <SliderInput label="Expected Conversion Increase" value={inputs.conversionRateIncrease} onChange={(val) => handleInputChange('conversionRateIncrease', val)} min={0} max={100} step={5} suffix="%" helper="Conservative: 10%, Typical: 25-78%" />
                    <div className="mt-4"><SliderInput label="Time-to-Market Reduction" value={inputs.timeToMarketReduction} onChange={(val) => handleInputChange('timeToMarketReduction', val)} min={30} max={90} step={5} suffix="%" helper="Launch in days vs weeks" /></div>
                  </div>
                </>
              )}

              {valueDriver === 'efficiency' && (
                <>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Operational Efficiency: Doing More with Less</h3>
                    <p className="text-sm text-blue-700 mb-3">Manual workflows, multiple CMSs, and developer ticket backlogs slow releases and inflate content costs. A single structured platform with a visual editor lets marketers publish independently while developers focus on higher-value work.</p>
                    <div className="text-xs text-blue-600"><strong>Expected Outcomes:</strong> 50-80% dev time reduction • CMS consolidation savings • Faster content cycles</div>
                  </div>
                  <SliderInput label="Developer Hourly Rate" value={inputs.developerHourlyRate} onChange={(val) => handleInputChange('developerHourlyRate', val)} min={75} max={250} step={5} prefix="$" />
                  <SliderInput label="Monthly Dev Hours on Content" value={inputs.monthlyDevHoursOnContent} onChange={(val) => handleInputChange('monthlyDevHoursOnContent', val)} min={40} max={400} step={10} helper="Hours on routine updates" />
                  <SliderInput label="Number of CMS Systems" value={inputs.numberOfCMS} onChange={(val) => handleInputChange('numberOfCMS', val)} min={1} max={10} step={1} />
                  <SliderInput label="Annual CMS Maintenance Cost" value={inputs.cmsMaintenanceCostPerYear} onChange={(val) => handleInputChange('cmsMaintenanceCostPerYear', val)} min={50000} max={500000} step={10000} prefix="$" />
                  <SliderInput label="Marketing Team Size" value={inputs.marketingTeamSize} onChange={(val) => handleInputChange('marketingTeamSize', val)} min={3} max={50} step={1} />
                  <div className="border-t pt-4"><SliderInput label="Developer Efficiency Gain" value={inputs.devEfficiencyGain} onChange={(val) => handleInputChange('devEfficiencyGain', val)} min={30} max={80} step={5} suffix="%" helper="Typical: 50-80%" /></div>
                </>
              )}

              {valueDriver === 'risk' && (
                <>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Risk Mitigation: Reducing Business & Technical Risk</h3>
                    <p className="text-sm text-blue-700 mb-3">Legacy stacks expose businesses to outages, traffic-spike failures, and security or compliance gaps. Contentful's cloud-native architecture delivers high availability, rapid rollback, and strong governance controls.</p>
                    <div className="text-xs text-blue-600"><strong>Expected Outcomes:</strong> 99.99% uptime SLA • ISO 27001 & SOC 2 certified • Zero-downtime deployments</div>
                  </div>
                  <SliderInput label="Downtime Hours per Year" value={inputs.downtimeHoursPerYear} onChange={(val) => handleInputChange('downtimeHoursPerYear', val)} min={1} max={100} step={1} />
                  <SliderInput label="Hourly Revenue Loss" value={inputs.hourlyRevenueLoss} onChange={(val) => handleInputChange('hourlyRevenueLoss', val)} min={10000} max={200000} step={5000} prefix="$" />
                  <SliderInput label="Annual Compliance Audit Cost" value={inputs.complianceAuditCost} onChange={(val) => handleInputChange('complianceAuditCost', val)} min={25000} max={200000} step={5000} prefix="$" />
                  <SliderInput label="Security Incidents per Year" value={inputs.securityIncidentsPerYear} onChange={(val) => handleInputChange('securityIncidentsPerYear', val)} min={0} max={10} step={1} />
                  <SliderInput label="Cost per Security Incident" value={inputs.incidentCost} onChange={(val) => handleInputChange('incidentCost', val)} min={25000} max={500000} step={25000} prefix="$" />
                  <div className="border-t pt-4"><SliderInput label="Downtime Reduction" value={inputs.downtimeReduction} onChange={(val) => handleInputChange('downtimeReduction', val)} min={50} max={99} step={5} suffix="%" helper="99.99% uptime SLA" /></div>
                </>
              )}

              {valueDriver === 'cx' && (
                <>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Customer Experience: Elevating Engagement & Loyalty</h3>
                    <p className="text-sm text-blue-700 mb-3">Siloed channels, limited personalization, and sluggish pages erode engagement and push visitors away. Composable delivery, reusable components, and native personalization create fast, consistent, and relevant journeys across every touchpoint.</p>
                    <div className="text-xs text-blue-600"><strong>Expected Outcomes:</strong> Reduced bounce rates • Higher NPS/CSAT • Increased repeat customers</div>
                  </div>
                  <SliderInput label="Monthly Visitors" value={inputs.monthlyVisitors} onChange={(val) => handleInputChange('monthlyVisitors', val)} min={10000} max={500000} step={10000} />
                  <SliderInput label="Current Bounce Rate" value={inputs.currentBounceRate} onChange={(val) => handleInputChange('currentBounceRate', val)} min={20} max={80} step={1} suffix="%" />
                  <SliderInput label="Repeat Customer Rate Increase" value={inputs.repeatCustomerRateIncrease} onChange={(val) => handleInputChange('repeatCustomerRateIncrease', val)} min={0} max={20} step={1} suffix="%" helper="Expected increase in repeat customers" />
                  <div className="border-t pt-4"><SliderInput label="Expected CX Improvement" value={inputs.cxImprovement} onChange={(val) => handleInputChange('cxImprovement', val)} min={15} max={50} step={5} suffix="%" helper="Engagement lift" /></div>
                </>
              )}

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Investment</h3>
                <div className="space-y-4">
                  <SliderInput label="Implementation Cost" value={inputs.implementationCost} onChange={(val) => handleInputChange('implementationCost', val)} min={50000} max={500000} step={10000} prefix="$" />
                  <SliderInput label="Implementation Time" value={inputs.implementationTime} onChange={(val) => handleInputChange('implementationTime', val)} min={1} max={18} step={1} suffix=" months" helper="Time before benefits begin" />
                  <SliderInput label="Annual License Cost" value={inputs.annualLicenseCost} onChange={(val) => handleInputChange('annualLicenseCost', val)} min={25000} max={200000} step={5000} prefix="$" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Total Business Impact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">Annual Benefit</div><div className="text-xl md:text-2xl font-bold">{formatCurrency(totalAnnualBenefit)}</div></div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">{roiYears}-Year Benefit</div><div className="text-xl md:text-2xl font-bold">{formatCurrency(multiYearBenefit)}</div></div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">ROI ({roiYears} Years)</div><div className="text-xl md:text-2xl font-bold">{roi.toFixed(0)}%</div></div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">Payback Period</div><div className="text-xl md:text-2xl font-bold">{paybackMonths.toFixed(1)} months</div></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Value Driver Breakdown</h3>
              <div className="space-y-3">
                {config.enabledDrivers.includes('revenue') && <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg"><div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-600" /><span className="font-medium text-gray-900">Revenue Growth</span></div><span className="text-lg font-bold text-green-600">{formatCurrency(revenue.totalLift)}</span></div>}
                {config.enabledDrivers.includes('efficiency') && <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"><div className="flex items-center gap-2"><Zap className="w-5 h-5 text-blue-600" /><span className="font-medium text-gray-900">Efficiency</span></div><span className="text-lg font-bold text-blue-600">{formatCurrency(efficiency.totalSavings)}</span></div>}
                {config.enabledDrivers.includes('risk') && <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg"><div className="flex items-center gap-2"><Shield className="w-5 h-5 text-purple-600" /><span className="font-medium text-gray-900">Risk Mitigation</span></div><span className="text-lg font-bold text-purple-600">{formatCurrency(risk.totalRiskReduction)}</span></div>}
                {config.enabledDrivers.includes('cx') && <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg"><div className="flex items-center gap-2"><Users className="w-5 h-5 text-orange-600" /><span className="font-medium text-gray-900">Customer Experience</span></div><span className="text-lg font-bold text-orange-600">{formatCurrency(cx.totalCXValue)}</span></div>}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {valueDriver === 'revenue' && 'Revenue Growth Details'}
                {valueDriver === 'efficiency' && 'Efficiency Savings'}
                {valueDriver === 'risk' && 'Risk Reduction Details'}
                {valueDriver === 'cx' && 'CX Impact Details'}
              </h3>
              <div className="space-y-3">
                {valueDriver === 'revenue' && (<><div className="flex justify-between text-sm"><span className="text-gray-600">Conversion Rate Lift</span><span className="font-semibold">{formatCurrency(revenue.conversionLift)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">Time-to-Market Value</span><span className="font-semibold">{formatCurrency(revenue.timeToMarketValue)}</span></div><div className="flex justify-between text-sm pt-3 border-t"><span className="font-medium">Total Revenue Impact</span><span className="font-bold text-green-600">{formatCurrency(revenue.totalLift)}</span></div></>)}
                {valueDriver === 'efficiency' && (<><div className="flex justify-between text-sm"><span className="text-gray-600">Dev Cost Savings</span><span className="font-semibold">{formatCurrency(efficiency.devCostSavings)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">CMS Consolidation</span><span className="font-semibold">{formatCurrency(efficiency.cmsConsolidationSavings)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">Marketing Productivity</span><span className="font-semibold">{formatCurrency(efficiency.marketingProductivityGain)}</span></div><div className="flex justify-between text-sm pt-3 border-t"><span className="font-medium">Total Savings</span><span className="font-bold text-blue-600">{formatCurrency(efficiency.totalSavings)}</span></div></>)}
                {valueDriver === 'risk' && (<><div className="flex justify-between text-sm"><span className="text-gray-600">Downtime Reduction</span><span className="font-semibold">{formatCurrency(risk.downtimeSavings)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">Security Savings</span><span className="font-semibold">{formatCurrency(risk.securitySavings)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">Compliance Efficiency</span><span className="font-semibold">{formatCurrency(risk.complianceEfficiency)}</span></div><div className="flex justify-between text-sm pt-3 border-t"><span className="font-medium">Total Risk Reduction</span><span className="font-bold text-purple-600">{formatCurrency(risk.totalRiskReduction)}</span></div></>)}
                {valueDriver === 'cx' && (<><div className="flex justify-between text-sm"><span className="text-gray-600">Bounce Reduction Impact</span><span className="font-semibold">{formatCurrency(cx.bounceImpact)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">Engagement Lift</span><span className="font-semibold">{formatCurrency(cx.engagementLift)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-600">Repeat Customer Value</span><span className="font-semibold">{formatCurrency(cx.repeatCustomerLift)}</span></div><div className="flex justify-between text-sm pt-3 border-t"><span className="font-medium">Total CX Value</span><span className="font-bold text-orange-600">{formatCurrency(cx.totalCXValue)}</span></div></>)}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 md:p-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3">Key Proof Points</h3>
              {valueDriver === 'revenue' && <div className="text-sm text-blue-800 space-y-2"><p><a href="https://www.contentful.com/case-studies/kraft-heinz/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Kraft Heinz:</a> 78% conversion rate increase</p><p><a href="https://www.contentful.com/case-studies/ruggable/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Ruggable:</a> 25% higher conversions, 7x CTR</p><p><a href="https://www.contentful.com/case-studies/kfc-global/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">KFC:</a> 43% digital sales growth</p></div>}
              {valueDriver === 'efficiency' && <div className="text-sm text-blue-800 space-y-2"><p><a href="https://www.contentful.com/case-studies/audible/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Audible:</a> 80% decrease in content production time</p><p><a href="https://www.contentful.com/case-studies/shiseido-professional/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Shiseido:</a> 50% reduction in content costs</p><p><a href="https://www.contentful.com/case-studies/costa-coffee/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Costa Coffee:</a> 15 sites built in 15 min each</p></div>}
              {valueDriver === 'risk' && <div className="text-sm text-blue-800 space-y-2"><p><a href="https://www.contentful.com/case-studies/milwaukeebucks/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Milwaukee Bucks:</a> 2.9M app opens, zero downtime</p><p><a href="https://www.contentful.com/case-studies/telus-support-portal/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">TELUS:</a> Consolidated 11 CMS to one platform</p><p><a href="https://www.contentful.com/case-studies/vodafone/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Vodafone:</a> 40% faster pages, zero outages</p></div>}
              {valueDriver === 'cx' && <div className="text-sm text-blue-800 space-y-2"><p><a href="https://www.contentful.com/case-studies/kraft-heinz/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">Kraft Heinz:</a> 30% engagement increase</p><p><a href="https://www.contentful.com/case-studies/telus-support-portal/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">TELUS:</a> 14% conversion uplift, 30% faster loads</p><p><a href="https://www.contentful.com/case-studies/bmw-tmwx/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-600">BMW:</a> 47% increase in test-drive bookings</p></div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About Contentful's Value Framework</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            This calculator is based on Contentful's proven Value Messaging Framework, demonstrating ROI across four key value drivers. Real customer results include conversion rate increases of 25-78%, time-to-market reductions of 60-80%, operational cost savings of 30-50%, and enterprise-grade 99.99% uptime.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>Key Differentiators:</strong> Composable API-first platform • Native personalization & experimentation • 110+ marketplace integrations • Powers 30% of Fortune 500 • ISO 27001 & SOC 2 Type II certified
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Export Inputs to CSV
          </button>
          <label className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Inputs from CSV
            <input
              type="file"
              accept=".csv"
              onChange={importFromCSV}
              className="hidden"
            />
          </label>
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Reset to Defaults
          </button>
          <button
            onClick={generatePresentation}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            <Presentation className="w-5 h-5" />
            Generate Business Case
          </button>
        </div>
      </div>

      {/* Configure Prospect Modal */}
      {showConfigureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Configure for Prospect
                </h2>
                <button
                  onClick={() => setShowConfigureModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* ROI Period Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ROI Calculation Period
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRoiYears(3)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      roiYears === 3
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    3 Years
                  </button>
                  <button
                    onClick={() => setRoiYears(5)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      roiYears === 5
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    5 Years
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Choose the time horizon for ROI calculations and business case projections.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Enter a company name to auto-fill calculator inputs with estimated company data.
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prospect Company Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prospectName}
                    onChange={(e) => setProspectName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && prospectName.trim() && searchCompanyData(prospectName)}
                    placeholder="e.g., Salesforce, Nike, Shopify..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={() => searchCompanyData(prospectName)}
                    disabled={!prospectName.trim() || isSearching}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    {isSearching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    Search
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try: Salesforce, Shopify, HubSpot, Nike, Netflix, Adobe
                </p>
              </div>

              {isSearching && (
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-700">Searching for company data...</p>
                </div>
              )}

              {companyData && !isSearching && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <Building2 className="w-5 h-5" />
                    <span className="font-semibold">{companyData.name}</span>
                    <span className="text-gray-500 text-sm">• {companyData.industry}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {companyData.monthlyVisitors && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-gray-500 text-xs">Monthly Visitors</div>
                        <div className="font-semibold text-gray-900">{formatNumber(companyData.monthlyVisitors)}</div>
                      </div>
                    )}
                    {companyData.avgRevenuePerConversion && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-gray-500 text-xs">Avg Revenue/Conversion</div>
                        <div className="font-semibold text-gray-900">{formatCurrency(companyData.avgRevenuePerConversion)}</div>
                      </div>
                    )}
                    {companyData.currentConversionRate && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-gray-500 text-xs">Conversion Rate</div>
                        <div className="font-semibold text-gray-900">{companyData.currentConversionRate.toFixed(1)}%</div>
                      </div>
                    )}
                    {companyData.currentBounceRate && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-gray-500 text-xs">Bounce Rate</div>
                        <div className="font-semibold text-gray-900">{companyData.currentBounceRate}%</div>
                      </div>
                    )}
                    {companyData.marketingTeamSize && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-gray-500 text-xs">Marketing Team Size</div>
                        <div className="font-semibold text-gray-900">{companyData.marketingTeamSize}</div>
                      </div>
                    )}
                    {companyData.numberOfCMS && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-gray-500 text-xs">CMS Systems</div>
                        <div className="font-semibold text-gray-900">{companyData.numberOfCMS}</div>
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                    <strong>Note:</strong> These are estimated values based on available data. Review and adjust as needed after applying.
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConfigureModal(false);
                  setCompanyData(null);
                  setProspectName('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyCompanyData}
                disabled={!companyData}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                Apply to Calculator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved Changes Warning Modal */}
      {showUnsavedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Unsaved Changes</h2>
                  <p className="text-sm text-gray-600">You have modified calculator inputs</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Would you like to export your data to a CSV file before leaving? This will preserve your changes so you can import them later.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleExportAndContinue}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export to CSV & Continue
                </button>
                <button
                  onClick={handleDiscardChanges}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Discard Changes
                </button>
                <button
                  onClick={() => {
                    setShowUnsavedModal(false);
                    setPendingAction(null);
                  }}
                  className="w-full px-4 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
