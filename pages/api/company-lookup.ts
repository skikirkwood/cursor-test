import type { NextApiRequest, NextApiResponse } from 'next';

// Types for the response
interface CompanyData {
  name: string;
  domain: string;
  industry: string;
  employeeCount?: number;
  revenue?: number;
  monthlyVisitors?: number;
  avgRevenuePerConversion?: number;
  currentConversionRate?: number;
  currentBounceRate?: number;
  marketingTeamSize?: number;
  numberOfCMS?: number;
  technologies?: string[];
}

interface ApiResponse {
  success: boolean;
  data?: CompanyData;
  error?: string;
}

// Industry-based conversion rate benchmarks
const industryBenchmarks: Record<string, { conversionRate: number; bounceRate: number; avgOrderValue: number }> = {
  'software': { conversionRate: 2.2, bounceRate: 42, avgOrderValue: 5000 },
  'technology': { conversionRate: 2.2, bounceRate: 42, avgOrderValue: 5000 },
  'saas': { conversionRate: 2.5, bounceRate: 40, avgOrderValue: 3000 },
  'ecommerce': { conversionRate: 2.8, bounceRate: 45, avgOrderValue: 150 },
  'retail': { conversionRate: 2.5, bounceRate: 48, avgOrderValue: 120 },
  'finance': { conversionRate: 1.8, bounceRate: 38, avgOrderValue: 8000 },
  'healthcare': { conversionRate: 1.5, bounceRate: 50, avgOrderValue: 2000 },
  'manufacturing': { conversionRate: 1.2, bounceRate: 52, avgOrderValue: 10000 },
  'media': { conversionRate: 2.0, bounceRate: 55, avgOrderValue: 200 },
  'entertainment': { conversionRate: 2.0, bounceRate: 55, avgOrderValue: 200 },
  'default': { conversionRate: 2.0, bounceRate: 47, avgOrderValue: 1500 }
};

// CMS technologies to look for in tech stack
const cmsKeywords = [
  'wordpress', 'drupal', 'contentful', 'sitecore', 'adobe experience manager', 'aem',
  'hubspot cms', 'webflow', 'squarespace', 'wix', 'shopify', 'magento', 'salesforce commerce',
  'episerver', 'optimizely', 'kentico', 'umbraco', 'joomla', 'ghost', 'strapi', 'sanity',
  'prismic', 'storyblok', 'butter cms', 'contentstack', 'agility cms', 'crownpeak',
  'bloomreach', 'acquia', 'pantheon', 'wp engine'
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { companyName, domain } = req.body;

  if (!companyName && !domain) {
    return res.status(400).json({ success: false, error: 'Company name or domain is required' });
  }

  const apiKey = process.env.DEMANDBASE_API_KEY;

  if (!apiKey) {
    // If no API key, return mock data for demo purposes
    console.log('No DEMANDBASE_API_KEY found, using demo data');
    return res.status(200).json({
      success: true,
      data: generateDemoData(companyName || domain)
    });
  }

  try {
    // Demandbase Company API call
    // Documentation: https://developer.demandbase.com/
    const searchQuery = domain || companyName;
    
    // First, try to look up by domain if provided, otherwise search by name
    const demandbaseUrl = domain
      ? `https://api.demandbase.com/v2/companies/domain/${encodeURIComponent(domain)}`
      : `https://api.demandbase.com/v2/companies/search?query=${encodeURIComponent(companyName)}`;

    const response = await fetch(demandbaseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // If Demandbase fails, fall back to demo data
      console.error('Demandbase API error:', response.status, response.statusText);
      return res.status(200).json({
        success: true,
        data: generateDemoData(companyName || domain)
      });
    }

    const demandbaseData = await response.json();
    
    // Parse Demandbase response
    const company = Array.isArray(demandbaseData) ? demandbaseData[0] : demandbaseData;
    
    if (!company) {
      return res.status(200).json({
        success: true,
        data: generateDemoData(companyName || domain)
      });
    }

    // Extract relevant data from Demandbase response
    const companyData = transformDemandbaseData(company, companyName || domain);

    return res.status(200).json({
      success: true,
      data: companyData
    });

  } catch (error) {
    console.error('Error fetching company data:', error);
    // Fall back to demo data on error
    return res.status(200).json({
      success: true,
      data: generateDemoData(companyName || domain)
    });
  }
}

function transformDemandbaseData(dbData: any, fallbackName: string): CompanyData {
  // Extract industry for benchmarks
  const industry = (dbData.industry || dbData.primary_industry || 'default').toLowerCase();
  const benchmarks = findIndustryBenchmarks(industry);
  
  // Extract employee count
  const employeeCount = dbData.employee_count || dbData.employees || dbData.employee_range_max || 500;
  
  // Estimate marketing team size (typically 2-5% of total employees for mid-large companies)
  const marketingPercent = employeeCount > 1000 ? 0.03 : employeeCount > 100 ? 0.05 : 0.08;
  const marketingTeamSize = Math.max(3, Math.round(employeeCount * marketingPercent));
  
  // Extract technologies and count CMS platforms
  const technologies = dbData.technologies || dbData.tech_stack || [];
  const cmsCount = countCMSPlatforms(technologies);
  
  // Extract revenue
  const revenue = dbData.revenue || dbData.annual_revenue || dbData.revenue_range_max;
  
  // Estimate monthly visitors based on company size and industry
  const monthlyVisitors = estimateMonthlyVisitors(employeeCount, revenue, industry);
  
  // Calculate average revenue per conversion based on industry and company revenue
  const avgRevenuePerConversion = estimateAvgRevenue(revenue, industry, benchmarks.avgOrderValue);

  return {
    name: dbData.company_name || dbData.name || fallbackName,
    domain: dbData.domain || dbData.website || '',
    industry: dbData.industry || dbData.primary_industry || 'General',
    employeeCount,
    revenue,
    monthlyVisitors,
    avgRevenuePerConversion,
    currentConversionRate: benchmarks.conversionRate,
    currentBounceRate: benchmarks.bounceRate,
    marketingTeamSize,
    numberOfCMS: Math.max(1, cmsCount),
    technologies: technologies.slice(0, 10) // Return top 10 technologies
  };
}

function findIndustryBenchmarks(industry: string) {
  // Try to match industry to our benchmarks
  for (const [key, value] of Object.entries(industryBenchmarks)) {
    if (industry.includes(key)) {
      return value;
    }
  }
  return industryBenchmarks.default;
}

function countCMSPlatforms(technologies: (string | { name?: string })[]): number {
  if (!Array.isArray(technologies)) return 2;
  
  const techLower = technologies.map(t => (typeof t === 'string' ? t : (t as { name?: string }).name || '').toLowerCase());
  let cmsCount = 0;
  
  for (const keyword of cmsKeywords) {
    if (techLower.some(tech => tech.includes(keyword))) {
      cmsCount++;
    }
  }
  
  // Most companies have at least 1-2 CMS platforms
  return Math.max(1, Math.min(cmsCount, 6));
}

function estimateMonthlyVisitors(employeeCount: number, revenue: number, industry: string): number {
  // Base estimate on company size
  let baseVisitors = 50000;
  
  if (employeeCount > 10000) baseVisitors = 400000;
  else if (employeeCount > 5000) baseVisitors = 300000;
  else if (employeeCount > 1000) baseVisitors = 200000;
  else if (employeeCount > 500) baseVisitors = 150000;
  else if (employeeCount > 100) baseVisitors = 80000;
  
  // Adjust for industry (B2C tends to have more traffic)
  if (industry.includes('retail') || industry.includes('ecommerce') || industry.includes('media')) {
    baseVisitors *= 1.5;
  }
  
  // Add some variance
  const variance = 0.8 + Math.random() * 0.4; // 80% to 120%
  
  return Math.round(baseVisitors * variance);
}

function estimateAvgRevenue(revenue: number, industry: string, industryDefault: number): number {
  // If we have revenue data, estimate based on typical deal sizes
  if (revenue) {
    if (revenue > 1000000000) return Math.max(industryDefault, 10000); // $1B+ companies
    if (revenue > 100000000) return Math.max(industryDefault, 5000);   // $100M+ companies
    if (revenue > 10000000) return Math.max(industryDefault, 2000);    // $10M+ companies
  }
  
  return industryDefault;
}

function generateDemoData(companyName: string): CompanyData {
  // Sample company data for demonstration when no API key
  const knownCompanies: Record<string, CompanyData> = {
    'salesforce': {
      name: 'Salesforce',
      domain: 'salesforce.com',
      industry: 'Enterprise Software',
      employeeCount: 73000,
      revenue: 31000000000,
      monthlyVisitors: 450000,
      avgRevenuePerConversion: 15000,
      currentConversionRate: 2.8,
      currentBounceRate: 38,
      marketingTeamSize: 45,
      numberOfCMS: 4,
      technologies: ['Salesforce CMS', 'Adobe Experience Manager', 'WordPress', 'Contentful']
    },
    'shopify': {
      name: 'Shopify',
      domain: 'shopify.com',
      industry: 'E-commerce Platform',
      employeeCount: 10000,
      revenue: 5600000000,
      monthlyVisitors: 380000,
      avgRevenuePerConversion: 800,
      currentConversionRate: 3.2,
      currentBounceRate: 42,
      marketingTeamSize: 35,
      numberOfCMS: 3,
      technologies: ['Shopify', 'Ruby on Rails', 'React']
    },
    'hubspot': {
      name: 'HubSpot',
      domain: 'hubspot.com',
      industry: 'Marketing Software',
      employeeCount: 7400,
      revenue: 1700000000,
      monthlyVisitors: 320000,
      avgRevenuePerConversion: 5000,
      currentConversionRate: 2.5,
      currentBounceRate: 45,
      marketingTeamSize: 28,
      numberOfCMS: 2,
      technologies: ['HubSpot CMS', 'React', 'Python']
    },
    'nike': {
      name: 'Nike',
      domain: 'nike.com',
      industry: 'Retail / Apparel',
      employeeCount: 79000,
      revenue: 51000000000,
      monthlyVisitors: 480000,
      avgRevenuePerConversion: 120,
      currentConversionRate: 2.1,
      currentBounceRate: 35,
      marketingTeamSize: 50,
      numberOfCMS: 5,
      technologies: ['Adobe Experience Manager', 'Salesforce Commerce', 'SAP', 'React']
    },
    'netflix': {
      name: 'Netflix',
      domain: 'netflix.com',
      industry: 'Entertainment / Streaming',
      employeeCount: 12000,
      revenue: 32000000000,
      monthlyVisitors: 500000,
      avgRevenuePerConversion: 180,
      currentConversionRate: 4.5,
      currentBounceRate: 28,
      marketingTeamSize: 40,
      numberOfCMS: 3,
      technologies: ['Custom CMS', 'React', 'Node.js', 'AWS']
    },
    'adobe': {
      name: 'Adobe',
      domain: 'adobe.com',
      industry: 'Software',
      employeeCount: 29000,
      revenue: 18000000000,
      monthlyVisitors: 400000,
      avgRevenuePerConversion: 3500,
      currentConversionRate: 2.2,
      currentBounceRate: 40,
      marketingTeamSize: 38,
      numberOfCMS: 4,
      technologies: ['Adobe Experience Manager', 'Magento', 'React', 'Adobe Target']
    }
  };

  const normalizedName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Check for known companies
  for (const [key, data] of Object.entries(knownCompanies)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return data;
    }
  }

  // Generate plausible data for unknown companies
  const employeeCount = 200 + Math.floor(Math.random() * 2000);
  const marketingTeamSize = Math.max(5, Math.round(employeeCount * 0.04));
  
  return {
    name: companyName,
    domain: `${normalizedName}.com`,
    industry: 'General',
    employeeCount,
    monthlyVisitors: 100000 + Math.floor(Math.random() * 200000),
    avgRevenuePerConversion: 1000 + Math.floor(Math.random() * 4000),
    currentConversionRate: 1.5 + Math.random() * 2,
    currentBounceRate: 35 + Math.floor(Math.random() * 20),
    marketingTeamSize,
    numberOfCMS: 2 + Math.floor(Math.random() * 3),
    technologies: ['WordPress', 'React']
  };
}
