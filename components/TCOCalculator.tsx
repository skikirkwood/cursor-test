import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Shield, Zap, Calculator, Download, Presentation } from 'lucide-react';

export default function App() {
  const [valueDriver, setValueDriver] = useState('revenue');
  const [inputs, setInputs] = useState({
    monthlyVisitors: 50000,
    currentConversionRate: 0.1,
    avgRevenuePerConversion: 5000,
    campaignLaunchTime: 30,
    developerHourlyRate: 150,
    monthlyDevHoursOnContent: 160,
    numberOfCMS: 3,
    cmsMaintenanceCostPerYear: 100000,
    marketingTeamSize: 10,
    downtimeHoursPerYear: 24,
    hourlyRevenueLoss: 50000,
    complianceAuditCost: 75000,
    securityIncidentsPerYear: 2,
    incidentCost: 100000,
    currentBounceRate: 45,
    avgSessionDuration: 3.5,
    customerSatisfactionScore: 70,
    repeatCustomerRate: 30,
    implementationCost: 150000,
    annualLicenseCost: 75000,
    conversionRateIncrease: 10,
    timeToMarketReduction: 60,
    devEfficiencyGain: 50,
    downtimeReduction: 90,
    cxImprovement: 25
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const calculateRevenueImpact = () => {
    const annualVisitors = inputs.monthlyVisitors * 12;
    const currentConversions = annualVisitors * (inputs.currentConversionRate / 100);
    const currentRevenue = currentConversions * inputs.avgRevenuePerConversion;
    const newConversionRate = inputs.currentConversionRate * (1 + inputs.conversionRateIncrease / 100);
    const newConversions = annualVisitors * (newConversionRate / 100);
    const newRevenue = newConversions * inputs.avgRevenuePerConversion;
    const timeToMarketValue = (currentRevenue / 365) * (inputs.campaignLaunchTime * inputs.timeToMarketReduction / 100) * 6;
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
    const repeatCustomerLift = baseRevenue * (inputs.repeatCustomerRate / 100) * 0.4;
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

  const totalAnnualBenefit = revenue.totalLift + efficiency.totalSavings + risk.totalRiskReduction + cx.totalCXValue;
  const threeYearBenefit = totalAnnualBenefit * 3;
  const totalCost = inputs.implementationCost + (inputs.annualLicenseCost * 3);
  const netBenefit = threeYearBenefit - totalCost;
  const roi = ((netBenefit / totalCost) * 100);
  const paybackMonths = (inputs.implementationCost / (totalAnnualBenefit / 12));

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
      avgSessionDuration: 'Avg Session Duration (min)',
      customerSatisfactionScore: 'Customer Satisfaction Score (%)',
      repeatCustomerRate: 'Repeat Customer Rate (%)',
      implementationCost: 'Implementation Cost ($)',
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
  };

  const generatePresentation = () => {
    const logoUrl = 'https://images.ctfassets.net/jtqsy5pye0zd/6wNuQ2xMvbw134rccObi0q/bf61badc6d6d9780609e541713f0bba6/Contentful_Logo_2.5_Dark.svg';
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contentful Business Case</title>
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
      height: 32px;
      margin-bottom: 40px;
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
      height: 100%;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 40px;
      min-height: 100%;
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
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="eyebrow">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      <h1>Business Case<br>for Contentful</h1>
      <p class="subtitle">ROI Analysis & Value Assessment</p>
      
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
      
      <div class="slide-footer" style="margin-top: auto;">© 2025 Contentful</div>
    </div>

    <!-- Slide 2: Executive Summary -->
    <div class="slide" data-slide="1">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Executive Summary</div>
          <h2>Total Business Impact</h2>
          <p class="subtitle">3-year projected value from Contentful implementation</p>
          
          <div class="summary-grid">
            <div class="summary-card highlight">
              <div class="label">3-Year Total Benefit</div>
              <div class="value">${formatCurrency(threeYearBenefit)}</div>
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
              <div class="value">${paybackMonths.toFixed(1)} mo</div>
            </div>
          </div>
          
          <div class="driver-cards">
            <div class="driver-card green">
              <div class="icon">📈</div>
              <div class="name">Revenue</div>
              <div class="amount">${formatCurrency(revenue.totalLift)}</div>
            </div>
            <div class="driver-card blue">
              <div class="icon">⚡</div>
              <div class="name">Efficiency</div>
              <div class="amount">${formatCurrency(efficiency.totalSavings)}</div>
            </div>
            <div class="driver-card orange">
              <div class="icon">🛡️</div>
              <div class="name">Risk</div>
              <div class="amount">${formatCurrency(risk.totalRiskReduction)}</div>
            </div>
            <div class="driver-card yellow">
              <div class="icon">👥</div>
              <div class="name">CX</div>
              <div class="amount">${formatCurrency(cx.totalCXValue)}</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="stats-sidebar">
            <div class="stat-item">
              <div class="stat-value">${roi.toFixed(0)}%</div>
              <div class="stat-label">3-Year ROI</div>
              <div class="stat-desc">Return on total investment including implementation and licensing</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${paybackMonths.toFixed(0)}mo</div>
              <div class="stat-label">Payback Period</div>
              <div class="stat-desc">Time to recover initial implementation investment</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(netBenefit)}</div>
              <div class="stat-label">Net Benefit</div>
              <div class="stat-desc">Total 3-year benefit minus all costs</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer">© 2025 Contentful</div>
    </div>

    <!-- Slide 3: Revenue Growth -->
    <div class="slide" data-slide="2">
      <img src="${logoUrl}" alt="Contentful" class="logo">
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
              <li><strong>Kraft Heinz:</strong> 78% conversion rate increase</li>
              <li><strong>Ruggable:</strong> 25% higher conversions, 7x CTR</li>
              <li><strong>KFC:</strong> 43% digital sales growth</li>
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
      <div class="slide-footer">© 2025 Contentful</div>
    </div>

    <!-- Slide 4: Operational Efficiency -->
    <div class="slide" data-slide="3">
      <img src="${logoUrl}" alt="Contentful" class="logo">
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
              <li><strong>Audible:</strong> 80% decrease in content production time</li>
              <li><strong>Shiseido:</strong> 50% reduction in content costs</li>
              <li><strong>Costa Coffee:</strong> 15 sites built in 15 minutes each</li>
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
      <div class="slide-footer">© 2025 Contentful</div>
    </div>

    <!-- Slide 5: Risk Mitigation -->
    <div class="slide" data-slide="4">
      <img src="${logoUrl}" alt="Contentful" class="logo">
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
              <li><strong>Milwaukee Bucks:</strong> 2.9M app opens, zero downtime</li>
              <li><strong>TELUS:</strong> Consolidated 11 CMS platforms to one</li>
              <li><strong>Vodafone:</strong> 40% faster pages, zero outages</li>
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
      <div class="slide-footer">© 2025 Contentful</div>
    </div>

    <!-- Slide 6: Customer Experience -->
    <div class="slide" data-slide="5">
      <img src="${logoUrl}" alt="Contentful" class="logo">
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
              <li><strong>Kraft Heinz:</strong> 30% engagement increase</li>
              <li><strong>TELUS:</strong> 14% conversion uplift, 30% faster loads</li>
              <li><strong>BMW:</strong> 47% increase in test-drive bookings</li>
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
      <div class="slide-footer">© 2025 Contentful</div>
    </div>

    <!-- Slide 7: Investment & ROI -->
    <div class="slide" data-slide="6">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="slide-content">
        <div class="content-left">
          <div class="eyebrow">Investment Summary</div>
          <h2>Investment & ROI</h2>
          <p class="subtitle">Comprehensive 3-year financial analysis</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0;">
            <div class="breakdown-section">
              <h4 style="font-size: 16px; margin-bottom: 16px; color: var(--ctfl-dark);">Investment</h4>
              <div class="breakdown-row">
                <span class="label">Implementation</span>
                <span class="value">${formatCurrency(inputs.implementationCost)}</span>
              </div>
              <div class="breakdown-row">
                <span class="label">License (3 years)</span>
                <span class="value">${formatCurrency(inputs.annualLicenseCost * 3)}</span>
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
                <span class="label">3-Year Benefit</span>
                <span class="value">${formatCurrency(threeYearBenefit)}</span>
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
              <div class="stat-label">3-Year ROI</div>
              <div class="stat-desc">Return on total investment</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${formatCurrency(netBenefit)}</div>
              <div class="stat-label">Net Benefit</div>
              <div class="stat-desc">Total value minus costs</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${paybackMonths.toFixed(0)}mo</div>
              <div class="stat-label">Payback</div>
              <div class="stat-desc">Time to recover investment</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-footer">© 2025 Contentful</div>
    </div>

    <!-- Navigation Controls -->
    <div class="nav-wrapper" id="navWrapper">
      <div class="keyboard-hint" id="keyboardHint">Use ← → arrow keys or click to navigate</div>
      <div class="nav-controls" id="navControls">
        <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">←</button>
        <div class="slide-indicator" id="slideIndicator"></div>
        <span class="slide-counter" id="slideCounter">1 / 7</span>
        <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">→</button>
      </div>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const totalSlides = 7;
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

  const SliderInput = ({ label, value, onChange, min, max, step, prefix = '', suffix = '', helper, decimals }) => (
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

  const valueDrivers = [
    { id: 'revenue', name: 'Revenue Growth', icon: TrendingUp, color: 'green' },
    { id: 'efficiency', name: 'Operational Efficiency', icon: Zap, color: 'blue' },
    { id: 'risk', name: 'Risk Mitigation', icon: Shield, color: 'purple' },
    { id: 'cx', name: 'Customer Experience', icon: Users, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <style>{`.slider::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #3b82f6; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.2s; } .slider::-webkit-slider-thumb:hover { transform: scale(1.2); background: #2563eb; } .slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #3b82f6; cursor: pointer; border: none; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.2s; } .slider::-moz-range-thumb:hover { transform: scale(1.2); background: #2563eb; }`}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contentful Value ROI Calculator</h1>
          <p className="text-gray-600">Calculate business impact across four value drivers</p>
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
                  <SliderInput label="Current Conversion Rate" value={inputs.currentConversionRate} onChange={(val) => handleInputChange('currentConversionRate', val)} min={0.01} max={1} step={0.01} suffix="%" decimals={2} />
                  <SliderInput label="Avg Revenue per Conversion" value={inputs.avgRevenuePerConversion} onChange={(val) => handleInputChange('avgRevenuePerConversion', val)} min={500} max={20000} step={500} prefix="$" />
                  <SliderInput label="Campaign Launch Time (Days)" value={inputs.campaignLaunchTime} onChange={(val) => handleInputChange('campaignLaunchTime', val)} min={7} max={90} step={1} helper="Current time to launch" />
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
                  <SliderInput label="Avg Session Duration (min)" value={inputs.avgSessionDuration} onChange={(val) => handleInputChange('avgSessionDuration', val)} min={1} max={15} step={0.5} />
                  <SliderInput label="Customer Satisfaction Score" value={inputs.customerSatisfactionScore} onChange={(val) => handleInputChange('customerSatisfactionScore', val)} min={40} max={95} step={1} suffix="%" />
                  <SliderInput label="Repeat Customer Rate" value={inputs.repeatCustomerRate} onChange={(val) => handleInputChange('repeatCustomerRate', val)} min={10} max={70} step={1} suffix="%" />
                  <div className="border-t pt-4"><SliderInput label="Expected CX Improvement" value={inputs.cxImprovement} onChange={(val) => handleInputChange('cxImprovement', val)} min={15} max={50} step={5} suffix="%" helper="Engagement lift" /></div>
                </>
              )}

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Investment</h3>
                <div className="space-y-4">
                  <SliderInput label="Implementation Cost" value={inputs.implementationCost} onChange={(val) => handleInputChange('implementationCost', val)} min={50000} max={500000} step={10000} prefix="$" />
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
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">3-Year Benefit</div><div className="text-xl md:text-2xl font-bold">{formatCurrency(threeYearBenefit)}</div></div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">ROI (3 Years)</div><div className="text-xl md:text-2xl font-bold">{roi.toFixed(0)}%</div></div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4"><div className="text-xs md:text-sm opacity-90 mb-1">Payback Period</div><div className="text-xl md:text-2xl font-bold">{paybackMonths.toFixed(1)} mo</div></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Value Driver Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg"><div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-600" /><span className="font-medium text-gray-900">Revenue Growth</span></div><span className="text-lg font-bold text-green-600">{formatCurrency(revenue.totalLift)}</span></div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"><div className="flex items-center gap-2"><Zap className="w-5 h-5 text-blue-600" /><span className="font-medium text-gray-900">Efficiency</span></div><span className="text-lg font-bold text-blue-600">{formatCurrency(efficiency.totalSavings)}</span></div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg"><div className="flex items-center gap-2"><Shield className="w-5 h-5 text-purple-600" /><span className="font-medium text-gray-900">Risk Mitigation</span></div><span className="text-lg font-bold text-purple-600">{formatCurrency(risk.totalRiskReduction)}</span></div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg"><div className="flex items-center gap-2"><Users className="w-5 h-5 text-orange-600" /><span className="font-medium text-gray-900">Customer Experience</span></div><span className="text-lg font-bold text-orange-600">{formatCurrency(cx.totalCXValue)}</span></div>
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
          <button
            onClick={generatePresentation}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            <Presentation className="w-5 h-5" />
            Generate Business Case
          </button>
        </div>
      </div>
    </div>
  );
}
