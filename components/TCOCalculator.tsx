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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body {
      height: 100%;
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0f172a;
      color: #1e293b;
      line-height: 1.6;
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
      padding: 60px 80px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s ease, visibility 0.5s ease;
      background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
      overflow-y: auto;
    }
    
    .slide.active {
      opacity: 1;
      visibility: visible;
    }
    
    .logo {
      position: absolute;
      top: 40px;
      left: 60px;
      height: 36px;
      z-index: 10;
    }
    
    .title-slide {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
      color: white;
    }
    
    .title-slide .logo { filter: brightness(0) invert(1); }
    
    .title-slide h1 {
      font-size: 56px;
      font-weight: 800;
      margin-bottom: 24px;
      background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .title-slide .subtitle {
      font-size: 24px;
      opacity: 0.9;
      max-width: 600px;
    }
    
    .title-slide .date {
      margin-top: 60px;
      font-size: 16px;
      opacity: 0.7;
    }
    
    h2 {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 40px;
      color: #0f172a;
    }
    
    h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #334155;
    }
    
    .content-area {
      margin-top: 80px;
      max-width: 1200px;
    }
    
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }
    
    .metric-card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .metric-card.highlight {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
    }
    
    .metric-label {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.7;
      margin-bottom: 8px;
    }
    
    .metric-value {
      font-size: 36px;
      font-weight: 700;
    }
    
    .breakdown-list {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .breakdown-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .breakdown-item:last-child { border-bottom: none; }
    
    .breakdown-item .label { color: #64748b; }
    .breakdown-item .value { font-weight: 600; color: #0f172a; }
    
    .proof-points {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 0 12px 12px 0;
      padding: 24px 32px;
      margin-top: 32px;
    }
    
    .proof-points h4 {
      color: #1e40af;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .proof-points ul {
      list-style: none;
      color: #1e3a8a;
    }
    
    .proof-points li {
      padding: 6px 0;
    }
    
    .proof-points li::before {
      content: "✓ ";
      color: #10b981;
      font-weight: bold;
    }
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .summary-card {
      text-align: center;
      padding: 24px;
      border-radius: 12px;
    }
    
    .summary-card.green { background: linear-gradient(135deg, #dcfce7, #bbf7d0); }
    .summary-card.blue { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
    .summary-card.purple { background: linear-gradient(135deg, #f3e8ff, #e9d5ff); }
    .summary-card.orange { background: linear-gradient(135deg, #ffedd5, #fed7aa); }
    
    .summary-card .icon { font-size: 32px; margin-bottom: 12px; }
    .summary-card .name { font-size: 14px; color: #64748b; margin-bottom: 4px; }
    .summary-card .amount { font-size: 24px; font-weight: 700; }
    
    .summary-card.green .amount { color: #059669; }
    .summary-card.blue .amount { color: #2563eb; }
    .summary-card.purple .amount { color: #7c3aed; }
    .summary-card.orange .amount { color: #ea580c; }
    
    .investment-table {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .investment-row {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .investment-row.total {
      border-bottom: none;
      border-top: 2px solid #0f172a;
      margin-top: 8px;
      padding-top: 24px;
      font-weight: 700;
      font-size: 20px;
    }
    
    .cta-section {
      text-align: center;
      margin-top: 40px;
      padding: 40px;
      background: linear-gradient(135deg, #0f172a, #1e3a5f);
      border-radius: 20px;
      color: white;
    }
    
    .cta-section h3 {
      color: white;
      font-size: 28px;
    }
    
    .cta-section p {
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* Navigation Controls */
    .nav-controls {
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 20px;
      z-index: 100;
      background: rgba(15, 23, 42, 0.9);
      padding: 12px 24px;
      border-radius: 50px;
      backdrop-filter: blur(10px);
    }
    
    .nav-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: #3b82f6;
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .nav-btn:hover:not(:disabled) {
      background: #2563eb;
      transform: scale(1.1);
    }
    
    .nav-btn:disabled {
      background: #475569;
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .slide-indicator {
      display: flex;
      gap: 8px;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #475569;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .dot.active {
      background: #3b82f6;
      transform: scale(1.2);
    }
    
    .dot:hover {
      background: #64748b;
    }
    
    .slide-counter {
      color: white;
      font-size: 14px;
      font-weight: 500;
      min-width: 60px;
      text-align: center;
    }
    
    .keyboard-hint {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.5);
      font-size: 12px;
      z-index: 100;
    }
    
    .title-slide .nav-controls {
      background: rgba(255,255,255,0.1);
    }
  </style>
</head>
<body>
  <div class="slideshow">
    <!-- Slide 1: Title -->
    <div class="slide title-slide active" data-slide="0">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <h1>Business Case for Contentful</h1>
      <p class="subtitle">A comprehensive ROI analysis demonstrating the value of migrating to a modern, composable content platform</p>
      <p class="date">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>

    <!-- Slide 2: Executive Summary -->
    <div class="slide" data-slide="1">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="content-area">
        <h2>Executive Summary</h2>
        <div class="metric-grid">
          <div class="metric-card highlight">
            <div class="metric-label">3-Year Total Benefit</div>
            <div class="metric-value">${formatCurrency(threeYearBenefit)}</div>
          </div>
          <div class="metric-card highlight">
            <div class="metric-label">Return on Investment</div>
            <div class="metric-value">${roi.toFixed(0)}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Annual Benefit</div>
            <div class="metric-value">${formatCurrency(totalAnnualBenefit)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Payback Period</div>
            <div class="metric-value">${paybackMonths.toFixed(1)} months</div>
          </div>
        </div>
        <div class="summary-grid">
          <div class="summary-card green">
            <div class="icon">📈</div>
            <div class="name">Revenue Growth</div>
            <div class="amount">${formatCurrency(revenue.totalLift)}</div>
          </div>
          <div class="summary-card blue">
            <div class="icon">⚡</div>
            <div class="name">Efficiency</div>
            <div class="amount">${formatCurrency(efficiency.totalSavings)}</div>
          </div>
          <div class="summary-card purple">
            <div class="icon">🛡️</div>
            <div class="name">Risk Mitigation</div>
            <div class="amount">${formatCurrency(risk.totalRiskReduction)}</div>
          </div>
          <div class="summary-card orange">
            <div class="icon">👥</div>
            <div class="name">Customer Experience</div>
            <div class="amount">${formatCurrency(cx.totalCXValue)}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 3: Revenue Growth -->
    <div class="slide" data-slide="2">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="content-area">
        <h2>Revenue Growth</h2>
        <h3>Accelerating Business Performance</h3>
        <p style="color: #64748b; margin-bottom: 32px; max-width: 800px;">
          Disconnected content systems and reliance on IT stall campaign launches and make personalization hard. 
          Contentful brings all content into an API-first hub and gives marketers self-serve tools to build, test, and tailor experiences quickly.
        </p>
        <div class="metric-grid">
          <div class="metric-card highlight">
            <div class="metric-label">Total Revenue Impact</div>
            <div class="metric-value">${formatCurrency(revenue.totalLift)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Time-to-Market Reduction</div>
            <div class="metric-value">${inputs.timeToMarketReduction}%</div>
          </div>
        </div>
        <div class="breakdown-list">
          <h3 style="margin-bottom: 16px;">Value Breakdown</h3>
          <div class="breakdown-item">
            <span class="label">Conversion Rate Lift</span>
            <span class="value">${formatCurrency(revenue.conversionLift)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Time-to-Market Value</span>
            <span class="value">${formatCurrency(revenue.timeToMarketValue)}</span>
          </div>
        </div>
        <div class="proof-points">
          <h4>Customer Success Stories</h4>
          <ul>
            <li><strong>Kraft Heinz:</strong> 78% conversion rate increase</li>
            <li><strong>Ruggable:</strong> 25% higher conversions, 7x click-through rate</li>
            <li><strong>KFC:</strong> 43% digital sales growth</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Slide 4: Operational Efficiency -->
    <div class="slide" data-slide="3">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="content-area">
        <h2>Operational Efficiency</h2>
        <h3>Doing More with Less</h3>
        <p style="color: #64748b; margin-bottom: 32px; max-width: 800px;">
          Manual workflows, multiple CMSs, and developer ticket backlogs slow releases and inflate content costs. 
          A single structured platform with a visual editor lets marketers publish independently while developers focus on higher-value work.
        </p>
        <div class="metric-grid">
          <div class="metric-card highlight">
            <div class="metric-label">Total Annual Savings</div>
            <div class="metric-value">${formatCurrency(efficiency.totalSavings)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Developer Efficiency Gain</div>
            <div class="metric-value">${inputs.devEfficiencyGain}%</div>
          </div>
        </div>
        <div class="breakdown-list">
          <h3 style="margin-bottom: 16px;">Savings Breakdown</h3>
          <div class="breakdown-item">
            <span class="label">Developer Cost Savings</span>
            <span class="value">${formatCurrency(efficiency.devCostSavings)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">CMS Consolidation Savings</span>
            <span class="value">${formatCurrency(efficiency.cmsConsolidationSavings)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Marketing Productivity Gain</span>
            <span class="value">${formatCurrency(efficiency.marketingProductivityGain)}</span>
          </div>
        </div>
        <div class="proof-points">
          <h4>Customer Success Stories</h4>
          <ul>
            <li><strong>Audible:</strong> 80% decrease in content production time</li>
            <li><strong>Shiseido:</strong> 50% reduction in content costs</li>
            <li><strong>Costa Coffee:</strong> 15 sites built in 15 minutes each</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Slide 5: Risk Mitigation -->
    <div class="slide" data-slide="4">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="content-area">
        <h2>Risk Mitigation</h2>
        <h3>Reducing Business & Technical Risk</h3>
        <p style="color: #64748b; margin-bottom: 32px; max-width: 800px;">
          Legacy stacks expose businesses to outages, traffic-spike failures, and security or compliance gaps. 
          Contentful's cloud-native architecture delivers high availability, rapid rollback, and strong governance controls.
        </p>
        <div class="metric-grid">
          <div class="metric-card highlight">
            <div class="metric-label">Total Risk Reduction Value</div>
            <div class="metric-value">${formatCurrency(risk.totalRiskReduction)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Downtime Reduction</div>
            <div class="metric-value">${inputs.downtimeReduction}%</div>
          </div>
        </div>
        <div class="breakdown-list">
          <h3 style="margin-bottom: 16px;">Risk Reduction Breakdown</h3>
          <div class="breakdown-item">
            <span class="label">Downtime Cost Savings</span>
            <span class="value">${formatCurrency(risk.downtimeSavings)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Security Incident Savings</span>
            <span class="value">${formatCurrency(risk.securitySavings)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Compliance Efficiency</span>
            <span class="value">${formatCurrency(risk.complianceEfficiency)}</span>
          </div>
        </div>
        <div class="proof-points">
          <h4>Enterprise-Grade Reliability</h4>
          <ul>
            <li><strong>Milwaukee Bucks:</strong> 2.9M app opens, zero downtime</li>
            <li><strong>TELUS:</strong> Consolidated 11 CMS platforms to one</li>
            <li><strong>Vodafone:</strong> 40% faster pages, zero outages</li>
            <li>99.99% uptime SLA • ISO 27001 & SOC 2 Type II certified</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Slide 6: Customer Experience -->
    <div class="slide" data-slide="5">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="content-area">
        <h2>Customer Experience</h2>
        <h3>Elevating Engagement & Loyalty</h3>
        <p style="color: #64748b; margin-bottom: 32px; max-width: 800px;">
          Siloed channels, limited personalization, and sluggish pages erode engagement and push visitors away. 
          Composable delivery, reusable components, and native personalization create fast, consistent, and relevant journeys across every touchpoint.
        </p>
        <div class="metric-grid">
          <div class="metric-card highlight">
            <div class="metric-label">Total CX Value</div>
            <div class="metric-value">${formatCurrency(cx.totalCXValue)}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Expected CX Improvement</div>
            <div class="metric-value">${inputs.cxImprovement}%</div>
          </div>
        </div>
        <div class="breakdown-list">
          <h3 style="margin-bottom: 16px;">CX Value Breakdown</h3>
          <div class="breakdown-item">
            <span class="label">Bounce Rate Reduction Impact</span>
            <span class="value">${formatCurrency(cx.bounceImpact)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Engagement Lift Value</span>
            <span class="value">${formatCurrency(cx.engagementLift)}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Repeat Customer Value</span>
            <span class="value">${formatCurrency(cx.repeatCustomerLift)}</span>
          </div>
        </div>
        <div class="proof-points">
          <h4>Customer Success Stories</h4>
          <ul>
            <li><strong>Kraft Heinz:</strong> 30% engagement increase</li>
            <li><strong>TELUS:</strong> 14% conversion uplift, 30% faster page loads</li>
            <li><strong>BMW:</strong> 47% increase in test-drive bookings</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Slide 7: Investment & ROI -->
    <div class="slide" data-slide="6">
      <img src="${logoUrl}" alt="Contentful" class="logo">
      <div class="content-area">
        <h2>Investment & ROI Summary</h2>
        <div class="metric-grid">
          <div class="metric-card highlight">
            <div class="metric-label">3-Year Net Benefit</div>
            <div class="metric-value">${formatCurrency(netBenefit)}</div>
          </div>
          <div class="metric-card highlight">
            <div class="metric-label">Return on Investment</div>
            <div class="metric-value">${roi.toFixed(0)}%</div>
          </div>
        </div>
        <div class="investment-table">
          <h3 style="margin-bottom: 24px;">Investment Details</h3>
          <div class="investment-row">
            <span>Implementation Cost</span>
            <span>${formatCurrency(inputs.implementationCost)}</span>
          </div>
          <div class="investment-row">
            <span>Annual License Cost (x3 years)</span>
            <span>${formatCurrency(inputs.annualLicenseCost * 3)}</span>
          </div>
          <div class="investment-row total">
            <span>Total 3-Year Investment</span>
            <span>${formatCurrency(totalCost)}</span>
          </div>
        </div>
        <div style="margin-top: 32px;">
          <div class="investment-table">
            <h3 style="margin-bottom: 24px;">Benefits Summary</h3>
            <div class="investment-row">
              <span>Annual Total Benefit</span>
              <span>${formatCurrency(totalAnnualBenefit)}</span>
            </div>
            <div class="investment-row">
              <span>3-Year Total Benefit</span>
              <span>${formatCurrency(threeYearBenefit)}</span>
            </div>
            <div class="investment-row total" style="color: #059669;">
              <span>3-Year Net Benefit</span>
              <span>${formatCurrency(netBenefit)}</span>
            </div>
          </div>
        </div>
        <div class="cta-section">
          <h3>Ready to Transform Your Content Operations?</h3>
          <p>Contact Contentful to discuss how we can help you achieve these results for your organization.</p>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div class="nav-controls">
      <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">←</button>
      <div class="slide-indicator" id="slideIndicator"></div>
      <span class="slide-counter" id="slideCounter">1 / 7</span>
      <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">→</button>
    </div>
    <div class="keyboard-hint">Use ← → arrow keys or click to navigate</div>
  </div>

  <script>
    let currentSlide = 0;
    const totalSlides = 7;
    
    function initSlideshow() {
      const indicator = document.getElementById('slideIndicator');
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        indicator.appendChild(dot);
      }
      updateNav();
    }
    
    function changeSlide(direction) {
      const newSlide = currentSlide + direction;
      if (newSlide >= 0 && newSlide < totalSlides) {
        goToSlide(newSlide);
      }
    }
    
    function goToSlide(index) {
      document.querySelectorAll('.slide').forEach(slide => slide.classList.remove('active'));
      document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
      
      currentSlide = index;
      document.querySelector('[data-slide="' + index + '"]').classList.add('active');
      document.querySelectorAll('.dot')[index].classList.add('active');
      
      updateNav();
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
