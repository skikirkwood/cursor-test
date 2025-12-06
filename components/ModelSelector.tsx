import React from 'react';
import { TrendingUp, Zap, Shield, Users, ShoppingCart, FileText, Megaphone } from 'lucide-react';

interface ModelSelectorProps {
  onSelectModel: (model: 'marketing' | 'ecommerce' | 'knowledge') => void;
}

const models = [
  {
    id: 'marketing' as const,
    name: 'Marketing Sites',
    description: 'Corporate websites, brand sites, and campaign landing pages focused on lead generation and brand awareness.',
    icon: Megaphone,
    drivers: ['Revenue Growth', 'Customer Experience'],
    driverIcons: [TrendingUp, Users],
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    lightBg: 'bg-green-50',
    examples: ['Corporate websites', 'Campaign pages', 'Brand portals']
  },
  {
    id: 'ecommerce' as const,
    name: 'Ecommerce Sites',
    description: 'Online stores and transactional platforms focused on conversions, uptime, and secure transactions.',
    icon: ShoppingCart,
    drivers: ['Revenue Growth', 'Risk Mitigation'],
    driverIcons: [TrendingUp, Shield],
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50',
    examples: ['Online stores', 'Marketplaces', 'Product catalogs']
  },
  {
    id: 'knowledge' as const,
    name: 'Knowledge Bases',
    description: 'Documentation, help centers, and support portals focused on operational efficiency and self-service.',
    icon: FileText,
    drivers: ['Operational Efficiency', 'Customer Experience'],
    driverIcons: [Zap, Users],
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    lightBg: 'bg-purple-50',
    examples: ['Help centers', 'Documentation', 'Support portals']
  }
];

export default function ModelSelector({ onSelectModel }: ModelSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contentful Value ROI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your use case to get a customized ROI analysis with relevant value drivers and industry-specific defaults.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => {
            const Icon = model.icon;
            const [DriverIcon1, DriverIcon2] = model.driverIcons;
            
            return (
              <button
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className="bg-white rounded-2xl shadow-lg p-6 text-left transition-all hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-blue-500 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{model.description}</p>
                
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Value Drivers</div>
                  <div className="flex gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 ${model.lightBg} rounded-full`}>
                      <DriverIcon1 className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-xs font-medium text-gray-700">{model.drivers[0]}</span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 ${model.lightBg} rounded-full`}>
                      <DriverIcon2 className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-xs font-medium text-gray-700">{model.drivers[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <span className="font-medium">Examples: </span>
                  {model.examples.join(' • ')}
                </div>

                <div className={`mt-4 text-sm font-semibold bg-gradient-to-r ${model.gradient} bg-clip-text text-transparent group-hover:underline`}>
                  Calculate ROI →
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Each model includes customized defaults and focuses on the most relevant value drivers for your use case.
          </p>
        </div>
      </div>
    </div>
  );
}

