/**
 * Kinetic UI - Mock Datasets and Visual Style Presets for Interactive Studio
 */

export type DatasetType = 'saas' | 'ecommerce' | 'crypto' | 'healthcare';
export type StylePresetType = 'glass' | 'neon' | 'flat' | 'borderless';

export interface MockRecord {
  id: string;
  primary: string;
  secondary: string;
  badge: string;
  badgeType: 'success' | 'warning' | 'info' | 'neutral' | 'danger';
  value: string;
  metricNumber: number;
  avatarText: string;
  timestamp: string;
}

export interface MockMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  period: string;
  sparkline: number[];
}

export interface DatasetDef {
  id: DatasetType;
  label: string;
  iconName: string;
  description: string;
  metrics: MockMetric[];
  records: MockRecord[];
}

export const MOCK_DATASETS: Record<DatasetType, DatasetDef> = {
  saas: {
    id: 'saas',
    label: 'B2B SaaS',
    iconName: 'Building2',
    description: 'Enterprise subscriptions, CRM lead pipelines, ARR & churn',
    metrics: [
      { title: 'Total Pipeline', value: '$532,900', change: '+24.6%', trend: 'up', period: 'vs last quarter', sparkline: [30, 42, 38, 55, 62, 70, 85] },
      { title: 'Active Accounts', value: '1,429', change: '+12.2%', trend: 'up', period: 'vs last month', sparkline: [40, 45, 48, 52, 58, 64, 72] },
      { title: 'Avg. Contract Value', value: '$18,450', change: '+6.8%', trend: 'up', period: 'vs target', sparkline: [15, 14, 16, 17, 16, 18, 19] },
      { title: 'Churn Rate', value: '1.2%', change: '-0.4%', trend: 'up', period: 'net negative churn', sparkline: [2.1, 1.9, 1.8, 1.6, 1.5, 1.3, 1.2] },
    ],
    records: [
      { id: 'saas-1', primary: 'Stripe, Inc.', secondary: 'patrick@stripe.com', badge: 'Deal Won', badgeType: 'success', value: '$125,000', metricNumber: 125000, avatarText: 'S', timestamp: '2h ago' },
      { id: 'saas-2', primary: 'Vercel Labs', secondary: 'alex@vercel.com', badge: 'Proposal', badgeType: 'warning', value: '$84,000', metricNumber: 84000, avatarText: 'V', timestamp: '1d ago' },
      { id: 'saas-3', primary: 'Linear App', secondary: 'karri@linear.app', badge: 'Qualified', badgeType: 'info', value: '$46,000', metricNumber: 46000, avatarText: 'L', timestamp: '3d ago' },
      { id: 'saas-4', primary: 'Figma Systems', secondary: 'dylan@figma.com', badge: 'Deal Won', badgeType: 'success', value: '$210,000', metricNumber: 210000, avatarText: 'F', timestamp: '5d ago' },
      { id: 'saas-5', primary: 'Supabase Inc', secondary: 'paul@supabase.io', badge: 'Contacted', badgeType: 'neutral', value: '$68,000', metricNumber: 68000, avatarText: 'SB', timestamp: '1w ago' },
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'E-Commerce',
    iconName: 'ShoppingCart',
    description: 'Retail products, orders, GMV, fulfillment & checkout rate',
    metrics: [
      { title: 'Gross Revenue (GMV)', value: '$184,250', change: '+31.5%', trend: 'up', period: 'vs last week', sparkline: [110, 125, 140, 138, 155, 170, 184] },
      { title: 'Total Orders', value: '3,892', change: '+14.8%', trend: 'up', period: 'units processed', sparkline: [280, 310, 340, 320, 360, 375, 389] },
      { title: 'Avg. Cart Size', value: '$142.80', change: '+8.1%', trend: 'up', period: 'per transaction', sparkline: [120, 124, 128, 130, 136, 139, 142] },
      { title: 'Cart Abandonment', value: '22.4%', change: '-3.2%', trend: 'up', period: 'conversion improved', sparkline: [29, 28, 26, 25, 24, 23, 22.4] },
    ],
    records: [
      { id: 'ecom-1', primary: 'Lumina Wireless Audio Pro', secondary: 'SKU: LUM-770 • Electronics', badge: 'Fulfilled', badgeType: 'success', value: '$349.00', metricNumber: 349, avatarText: '🎧', timestamp: '12m ago' },
      { id: 'ecom-2', primary: 'Apex Carbon Trail Runners', secondary: 'SKU: APX-901 • Footwear', badge: 'Processing', badgeType: 'warning', value: '$185.00', metricNumber: 185, avatarText: '👟', timestamp: '45m ago' },
      { id: 'ecom-3', primary: 'Cyber Chrono Titanium Watch', secondary: 'SKU: CYB-004 • Luxury', badge: 'Shipped', badgeType: 'info', value: '$420.00', metricNumber: 420, avatarText: '⌚', timestamp: '2h ago' },
      { id: 'ecom-4', primary: 'Velvet Heavyweight Hoodie', secondary: 'SKU: VLV-210 • Apparel', badge: 'Fulfilled', badgeType: 'success', value: '$95.00', metricNumber: 95, avatarText: '🧥', timestamp: '4h ago' },
      { id: 'ecom-5', primary: 'Obsidian Mechanical Keyboard', secondary: 'SKU: OBS-880 • Accessories', badge: 'In Cart', badgeType: 'neutral', value: '$165.00', metricNumber: 165, avatarText: '⌨️', timestamp: '6h ago' },
    ]
  },
  crypto: {
    id: 'crypto',
    label: 'Crypto / Web3',
    iconName: 'Coins',
    description: 'DeFi protocols, staking TVL, gas metrics & token volumes',
    metrics: [
      { title: 'Total Value Locked (TVL)', value: '$14.8M', change: '+42.1%', trend: 'up', period: 'across smart contracts', sparkline: [9.2, 10.4, 11.8, 12.5, 13.2, 14.1, 14.8] },
      { title: 'Active Wallets', value: '28,410', change: '+26.9%', trend: 'up', period: '24h unique senders', sparkline: [18, 20, 22, 24, 25, 27, 28.4] },
      { title: '24h DEX Volume', value: '$3.92M', change: '+19.4%', trend: 'up', period: 'automated market makers', sparkline: [2.1, 2.5, 2.8, 3.2, 3.4, 3.7, 3.9] },
      { title: 'Avg. Gas Fee', value: '12 Gwei', change: '-15.2%', trend: 'up', period: 'network congestion low', sparkline: [24, 22, 19, 17, 15, 13, 12] },
    ],
    records: [
      { id: 'cry-1', primary: 'Ethereum Staking Vault', secondary: '0x71C...a84f • Protocol Staking', badge: 'Finalized', badgeType: 'success', value: '450.0 ETH', metricNumber: 1350000, avatarText: 'Ξ', timestamp: '3 blks ago' },
      { id: 'cry-2', primary: 'Solana High-Yield Liquidity', secondary: '9xQe...3vTp • AMM Pool', badge: 'Pending', badgeType: 'warning', value: '8,420 SOL', metricNumber: 1263000, avatarText: '◎', timestamp: '12 blks ago' },
      { id: 'cry-3', primary: 'Uniswap V4 Flash Arbitrage', secondary: '0x32A...f902 • Swap Route', badge: 'Executed', badgeType: 'success', value: '$540,000', metricNumber: 540000, avatarText: '🦄', timestamp: '24 blks ago' },
      { id: 'cry-4', primary: 'Chainlink Data Feeds Node', secondary: '0x88F...b11c • Oracle Node', badge: 'Syncing', badgeType: 'info', value: '12,500 LINK', metricNumber: 225000, avatarText: '⬡', timestamp: '45 blks ago' },
      { id: 'cry-5', primary: 'Arbitrum Rollup Settlement', secondary: '0x44D...cc91 • Layer 2', badge: 'Queued', badgeType: 'neutral', value: '$290,000', metricNumber: 290000, avatarText: '🔵', timestamp: '1h ago' },
    ]
  },
  healthcare: {
    id: 'healthcare',
    label: 'Healthcare',
    iconName: 'Activity',
    description: 'Clinical vitals, patient triage, recovery index & diagnostics',
    metrics: [
      { title: 'Active Inpatients', value: '842', change: '+5.3%', trend: 'up', period: 'hospital census', sparkline: [780, 800, 810, 815, 830, 835, 842] },
      { title: 'Avg. Triage Response', value: '11.4 min', change: '-28.4%', trend: 'up', period: 'emergency intake', sparkline: [18, 16, 15, 14, 13, 12, 11.4] },
      { title: 'Lab Diagnostic Accuracy', value: '99.4%', change: '+1.8%', trend: 'up', period: 'ISO verified', sparkline: [97, 97.5, 98, 98.6, 99, 99.2, 99.4] },
      { title: 'Recovery Velocity Index', value: '94.2%', change: '+4.8%', trend: 'up', period: 'post-op discharge', sparkline: [88, 89, 90, 91, 92, 93, 94.2] },
    ],
    records: [
      { id: 'med-1', primary: 'Mayo Clinical Diagnostics', secondary: 'Patient #8841 • Oncology Wing', badge: 'Discharged', badgeType: 'success', value: 'Stable (98%)', metricNumber: 98, avatarText: '🩺', timestamp: '25m ago' },
      { id: 'med-2', primary: 'Mount Sinai Genomic Scan', secondary: 'Patient #4102 • Neurology Lab', badge: 'In Review', badgeType: 'warning', value: 'Evaluating', metricNumber: 74, avatarText: '🧬', timestamp: '1h ago' },
      { id: 'med-3', primary: 'Johns Hopkins Pediatric ICU', secondary: 'Patient #9931 • Ward 4B', badge: 'Monitoring', badgeType: 'info', value: 'BPM: 74', metricNumber: 82, avatarText: '👶', timestamp: '2h ago' },
      { id: 'med-4', primary: 'BioPulse Cardio Diagnostics', secondary: 'Patient #2041 • Outpatient', badge: 'Normal', badgeType: 'success', value: 'BPM: 68', metricNumber: 68, avatarText: '❤️', timestamp: '4h ago' },
      { id: 'med-5', primary: 'Apex Automated Blood Triage', secondary: 'Batch #A-992 • Automated', badge: 'Screened', badgeType: 'neutral', value: '99.8% Match', metricNumber: 99, avatarText: '🔬', timestamp: '5h ago' },
    ]
  }
};

export interface StylePresetDef {
  id: StylePresetType;
  label: string;
  classes: string;
  cardClasses: string;
  description: string;
}

export const STYLE_PRESETS: Record<StylePresetType, StylePresetDef> = {
  glass: {
    id: 'glass',
    label: 'Glassmorphism',
    classes: 'backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ring-1 ring-white/5',
    cardClasses: 'backdrop-blur-xl bg-white/[0.05] border border-white/10 shadow-xl',
    description: 'Translucent frosted glass with diffused specular borders'
  },
  neon: {
    id: 'neon',
    label: 'Neon Glow',
    classes: 'bg-[#09090f] border border-indigo-500/50 shadow-[0_0_35px_rgba(99,102,241,0.35)] ring-1 ring-indigo-500/25',
    cardClasses: 'bg-zinc-950/90 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.25)]',
    description: 'Saturated cyberpunk glow with reactive indigo neon borders'
  },
  flat: {
    id: 'flat',
    label: 'Flat Clean',
    classes: 'bg-zinc-900 border border-zinc-800 shadow-sm',
    cardClasses: 'bg-zinc-900/90 border border-zinc-800',
    description: 'Minimalist, crisp utilitarian background with clean line contrast'
  },
  borderless: {
    id: 'borderless',
    label: 'Borderless',
    classes: 'bg-transparent border-0 shadow-none',
    cardClasses: 'bg-transparent border-0 shadow-none',
    description: 'Open canvas without borders or drop shadows'
  }
};

export interface ColorAccentDef {
  id: string;
  label: string;
  hex: string;
  twText: string;
  twBg: string;
  twBorder: string;
  twShadow: string;
}

export const COLOR_ACCENTS: ColorAccentDef[] = [
  { id: 'indigo', label: 'Indigo', hex: '#6366f1', twText: 'text-indigo-400', twBg: 'bg-indigo-500', twBorder: 'border-indigo-500', twShadow: 'shadow-indigo-500/25' },
  { id: 'emerald', label: 'Emerald', hex: '#10b981', twText: 'text-emerald-400', twBg: 'bg-emerald-500', twBorder: 'border-emerald-500', twShadow: 'shadow-emerald-500/25' },
  { id: 'violet', label: 'Violet', hex: '#8b5cf6', twText: 'text-violet-400', twBg: 'bg-violet-500', twBorder: 'border-violet-500', twShadow: 'shadow-violet-500/25' },
  { id: 'amber', label: 'Amber', hex: '#f59e0b', twText: 'text-amber-400', twBg: 'bg-amber-500', twBorder: 'border-amber-500', twShadow: 'shadow-amber-500/25' },
  { id: 'rose', label: 'Rose', hex: '#f43f5e', twText: 'text-rose-400', twBg: 'bg-rose-500', twBorder: 'border-rose-500', twShadow: 'shadow-rose-500/25' },
  { id: 'cyan', label: 'Cyan', hex: '#06b6d4', twText: 'text-cyan-400', twBg: 'bg-cyan-500', twBorder: 'border-cyan-500', twShadow: 'shadow-cyan-500/25' },
];
