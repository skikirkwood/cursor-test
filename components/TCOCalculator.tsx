import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Shield, Zap, Calculator } from 'lucide-react';

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
      </div>
    </div>
  );
}
