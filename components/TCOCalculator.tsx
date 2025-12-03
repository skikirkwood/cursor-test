import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, MousePointer, Calculator } from 'lucide-react';

export default function App() {
  const [inputs, setInputs] = useState({
    monthlyVisitors: 50000,
    currentConversionRate: 2.5,
    avgRevenuePerConversion: 5000,
    implementationCost: 300000,
    annualMaintenanceCost: 100000,
    conversionRateIncrease: 5,
    engagementIncrease: 5,
    timeToValue: 6
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  // Calculations
  const annualVisitors = inputs.monthlyVisitors * 12;
  
  // Current state
  const currentConversions = annualVisitors * (inputs.currentConversionRate / 100);
  const currentRevenue = currentConversions * inputs.avgRevenuePerConversion;
  
  // With personalization
  const newConversionRate = inputs.currentConversionRate * (1 + inputs.conversionRateIncrease / 100);
  const newConversions = annualVisitors * (newConversionRate / 100);
  const newRevenue = newConversions * inputs.avgRevenuePerConversion;
  
  // Additional revenue from engagement (cross-sell, retention)
  const engagementRevenue = currentRevenue * (inputs.engagementIncrease / 100);
  const totalNewRevenue = newRevenue + engagementRevenue;
  
  // ROI calculations
  const annualRevenueLift = totalNewRevenue - currentRevenue;
  const threeYearRevenueLift = annualRevenueLift * 3;
  const totalCostThreeYears = inputs.implementationCost + (inputs.annualMaintenanceCost * 3);
  const netBenefit = threeYearRevenueLift - totalCostThreeYears;
  const roi = ((netBenefit / totalCostThreeYears) * 100);
  const paybackMonths = (inputs.implementationCost / (annualRevenueLift / 12));

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Word & Brown Personalization ROI Calculator
          </h1>
          <p className="text-gray-600">Calculate the revenue impact of website personalization</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Your Inputs
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Website Visitors
                </label>
                <input
                  type="number"
                  value={inputs.monthlyVisitors}
                  onChange={(e) => handleInputChange('monthlyVisitors', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Conversion Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.currentConversionRate}
                  onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Revenue per Conversion ($)
                </label>
                <input
                  type="number"
                  value={inputs.avgRevenuePerConversion}
                  onChange={(e) => handleInputChange('avgRevenuePerConversion', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="border-t pt-5 mt-5">
                <h3 className="font-semibold text-gray-900 mb-4">Investment Costs</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Implementation Cost ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.implementationCost}
                      onChange={(e) => handleInputChange('implementationCost', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Maintenance Cost ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.annualMaintenanceCost}
                      onChange={(e) => handleInputChange('annualMaintenanceCost', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-5 mt-5">
                <h3 className="font-semibold text-gray-900 mb-4">Expected Improvements</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conversion Rate Increase (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.conversionRateIncrease}
                      onChange={(e) => handleInputChange('conversionRateIncrease', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Industry avg: 20-50%</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Engagement Revenue Lift (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.engagementIncrease}
                      onChange={(e) => handleInputChange('engagementIncrease', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">From cross-sell, retention, etc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Revenue Impact</h2>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Annual Revenue Lift</div>
                  <div className="text-3xl font-bold">{formatCurrency(annualRevenueLift)}</div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">3-Year Revenue Increase</div>
                  <div className="text-3xl font-bold">{formatCurrency(threeYearRevenueLift)}</div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">ROI (3 Years)</div>
                  <div className="text-3xl font-bold">{roi.toFixed(0)}%</div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Payback Period</div>
                  <div className="text-3xl font-bold">{paybackMonths.toFixed(1)} months</div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Current Annual Revenue</span>
                    <span className="text-lg font-semibold text-gray-900">{formatCurrency(currentRevenue)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatNumber(currentConversions)} conversions at {inputs.currentConversionRate}% rate
                  </div>
                </div>

                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">New Annual Revenue</span>
                    <span className="text-lg font-semibold text-green-600">{formatCurrency(totalNewRevenue)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatNumber(newConversions)} conversions at {newConversionRate.toFixed(2)}% rate
                  </div>
                  <div className="text-sm text-gray-500">
                    + {formatCurrency(engagementRevenue)} from engagement lift
                  </div>
                </div>

                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Total 3-Year Investment</span>
                    <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalCostThreeYears)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(inputs.implementationCost)} implementation + {formatCurrency(inputs.annualMaintenanceCost * 3)} maintenance
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Net Benefit (3 Years)</span>
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(netBenefit)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MousePointer className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Higher Conversion Rates</div>
                    <div className="text-sm text-gray-600">Personalized experiences convert {inputs.conversionRateIncrease}% better</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Improved Customer Engagement</div>
                    <div className="text-sm text-gray-600">Better retention and cross-sell opportunities</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Competitive Advantage</div>
                    <div className="text-sm text-gray-600">Stand out in the insurance broker market</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Quick Payback</div>
                    <div className="text-sm text-gray-600">Investment pays for itself in {paybackMonths.toFixed(1)} months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About This Calculator</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            This TCO calculator demonstrates the financial impact of implementing website personalization for Word & Brown. 
            The calculations are based on industry benchmarks showing that personalized experiences typically increase conversion 
            rates by 20-50% and improve customer lifetime value through better engagement. Adjust the inputs above to model 
            different scenarios and see how personalization investment could impact your bottom line.
          </p>
        </div>
      </div>
    </div>
  );
}
