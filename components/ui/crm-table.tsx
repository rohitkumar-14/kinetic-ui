'use client';

import * as React from 'react';
import { 
  Search, 
  MoreHorizontal, 
  ArrowUpDown, 
  Building2, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { usePlaygroundContext } from '@/components/creative/docs/playground-context';
import { MOCK_DATASETS, DatasetType, StylePresetType } from '@/lib/mock-datasets';

export interface CrmCustomer {
  id: string;
  company: string;
  domain: string;
  logoText: string;
  contactName: string;
  email: string;
  dealValue: number;
  stage: 'Lead' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Churned';
  owner: {
    name: string;
    avatar: string;
  };
  lastContact: string;
}

const STAGE_CONFIG: Record<CrmCustomer['stage'], { label: string; color: string; bg: string }> = {
  Lead: { label: 'New Lead', color: 'text-zinc-400', bg: 'bg-zinc-800/80 border-zinc-700' },
  Contacted: { label: 'Contacted', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' },
  Qualified: { label: 'Qualified', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
  Proposal: { label: 'In Proposal', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  Won: { label: 'Deal Won', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  Churned: { label: 'Lost', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
};

const DEFAULT_CUSTOMERS: CrmCustomer[] = [
  {
    id: 'crm-1',
    company: 'Stripe, Inc.',
    domain: 'stripe.com',
    logoText: 'S',
    contactName: 'Patrick Collison',
    email: 'p.collison@stripe.com',
    dealValue: 125000,
    stage: 'Won',
    owner: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    lastContact: '2 hours ago',
  },
  {
    id: 'crm-2',
    company: 'Vercel Labs',
    domain: 'vercel.com',
    logoText: 'V',
    contactName: 'Guillermo Rauch',
    email: 'rauchg@vercel.com',
    dealValue: 84000,
    stage: 'Proposal',
    owner: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    lastContact: '1 day ago',
  },
  {
    id: 'crm-3',
    company: 'Linear App',
    domain: 'linear.app',
    logoText: 'L',
    contactName: 'Karri Saarinen',
    email: 'karri@linear.app',
    dealValue: 46000,
    stage: 'Qualified',
    owner: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    lastContact: '3 days ago',
  },
  {
    id: 'crm-4',
    company: 'Figma Systems',
    domain: 'figma.com',
    logoText: 'F',
    contactName: 'Dylan Field',
    email: 'dylan@figma.com',
    dealValue: 210000,
    stage: 'Won',
    owner: { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    lastContact: '5 days ago',
  },
  {
    id: 'crm-5',
    company: 'Supabase Inc',
    domain: 'supabase.com',
    logoText: 'S',
    contactName: 'Paul Copplestone',
    email: 'paul@supabase.com',
    dealValue: 38500,
    stage: 'Contacted',
    owner: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    lastContact: 'Just now',
  },
  {
    id: 'crm-6',
    company: 'Resend Email',
    domain: 'resend.com',
    logoText: 'R',
    contactName: 'Zeno Rocha',
    email: 'zeno@resend.com',
    dealValue: 29000,
    stage: 'Lead',
    owner: { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    lastContact: '1 week ago',
  },
];

export function CrmTable({
  initialData = DEFAULT_CUSTOMERS,
  dataset: propDataset,
  stylePreset: propStylePreset,
  className
}: {
  initialData?: CrmCustomer[];
  dataset?: DatasetType;
  stylePreset?: StylePresetType;
  className?: string;
}) {
  const playgroundContext = usePlaygroundContext() || {};
  const activeDataset = propDataset || playgroundContext.dataset || 'saas';
  const activeStylePreset = propStylePreset || playgroundContext.stylePreset || 'glass';

  const [data, setData] = React.useState<CrmCustomer[]>(() => {
    if (activeDataset && MOCK_DATASETS[activeDataset]) {
      const ds = MOCK_DATASETS[activeDataset];
      return ds.records.map((r, i) => ({
        id: r.id,
        company: r.primary,
        domain: r.secondary.includes('@') ? r.secondary.split('@')[1] : r.secondary.replace(/^SKU:\s*/, ''),
        logoText: r.avatarText,
        contactName: r.secondary.includes('@') ? r.secondary.split('@')[0].replace('.', ' ') : r.secondary,
        email: r.secondary.includes('@') ? r.secondary : `order-${1000 + i}@store.com`,
        dealValue: r.metricNumber,
        stage: (r.badge.includes('Won') || r.badge.includes('Fulfilled') || r.badge.includes('Finalized') || r.badge.includes('Discharged')) ? 'Won' :
               (r.badge.includes('Proposal') || r.badge.includes('Processing') || r.badge.includes('Pending') || r.badge.includes('Review')) ? 'Proposal' :
               (r.badge.includes('Qualified') || r.badge.includes('Shipped') || r.badge.includes('Monitoring')) ? 'Qualified' :
               (r.badge.includes('Contacted') || r.badge.includes('In Cart') || r.badge.includes('Normal')) ? 'Contacted' : 'Lead',
        owner: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        lastContact: r.timestamp,
      }));
    }
    return initialData;
  });

  // Re-sync when dataset in studio changes
  React.useEffect(() => {
    if (activeDataset && MOCK_DATASETS[activeDataset]) {
      const ds = MOCK_DATASETS[activeDataset];
      const mapped: CrmCustomer[] = ds.records.map((r, i) => ({
        id: r.id,
        company: r.primary,
        domain: r.secondary.includes('@') ? r.secondary.split('@')[1] : r.secondary.replace(/^SKU:\s*/, ''),
        logoText: r.avatarText,
        contactName: r.secondary.includes('@') ? r.secondary.split('@')[0].replace('.', ' ') : r.secondary,
        email: r.secondary.includes('@') ? r.secondary : `order-${1000 + i}@store.com`,
        dealValue: r.metricNumber,
        stage: (r.badge.includes('Won') || r.badge.includes('Fulfilled') || r.badge.includes('Finalized') || r.badge.includes('Discharged')) ? 'Won' :
               (r.badge.includes('Proposal') || r.badge.includes('Processing') || r.badge.includes('Pending') || r.badge.includes('Review')) ? 'Proposal' :
               (r.badge.includes('Qualified') || r.badge.includes('Shipped') || r.badge.includes('Monitoring')) ? 'Qualified' :
               (r.badge.includes('Contacted') || r.badge.includes('In Cart') || r.badge.includes('Normal')) ? 'Contacted' : 'Lead',
        owner: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        lastContact: r.timestamp,
      }));
      setData(mapped);
    }
  }, [activeDataset]);

  const [search, setSearch] = React.useState('');
  const [selectedStage, setSelectedStage] = React.useState<string>('All');
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  // Filtered customers
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = 
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.contactName.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesStage = selectedStage === 'All' || item.stage === selectedStage;
      return matchesSearch && matchesStage;
    });
  }, [data, search, selectedStage]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredData.map(c => c.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const styleClasses = 
    activeStylePreset === 'neon' ? 'bg-[#08080f] border border-indigo-500/50 shadow-[0_0_35px_rgba(99,102,241,0.3)]' :
    activeStylePreset === 'flat' ? 'bg-zinc-900 border border-zinc-800 shadow-sm' :
    activeStylePreset === 'borderless' ? 'bg-transparent border-0 shadow-none' :
    'bg-card/70 backdrop-blur-xl border border-border shadow-xl';

  return (
    <div className={cn('w-full rounded-2xl transition-all duration-300 overflow-hidden', styleClasses, className)}>
      {/* Header controls bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 bg-muted/20">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search companies, leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-background/80 border-border/80 rounded-xl"
            />
          </div>

          {/* Quick Stage Filter Pills */}
          <div className="flex items-center gap-1 bg-background/50 p-1 border border-border/50 rounded-xl overflow-x-auto">
            {['All', 'Lead', 'Qualified', 'Proposal', 'Won'].map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer',
                  selectedStage === stage 
                    ? 'bg-foreground text-background shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Selected actions */}
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 pr-2 border-r border-border/50 text-xs text-muted-foreground font-medium">
              <span>{selectedIds.size} selected</span>
              <Button size="sm" variant="destructive" className="h-8 text-xs gap-1 rounded-lg">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          )}
          <Button size="sm" variant="outline" className="h-9 text-xs gap-1.5 rounded-xl border-border/80">
            <Download className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </Button>
          <Button size="sm" className="h-9 text-xs gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/25">
            <span>+ Add Deal</span>
          </Button>
        </div>
      </div>

      {/* Table view */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 w-10">
                <Checkbox 
                  checked={filteredData.length > 0 && selectedIds.size === filteredData.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th className="py-3.5 px-4">Company & Domain</th>
              <th className="py-3.5 px-4">Primary Contact</th>
              <th className="py-3.5 px-4">Deal Value</th>
              <th className="py-3.5 px-4">Pipeline Stage</th>
              <th className="py-3.5 px-4">Account Owner</th>
              <th className="py-3.5 px-4">Last Activity</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-normal">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-muted-foreground text-sm">
                  No matching leads or deals found.
                </td>
              </tr>
            ) : (
              filteredData.map((cust) => {
                const isSelected = selectedIds.has(cust.id);
                const stageInfo = STAGE_CONFIG[cust.stage];

                return (
                  <tr 
                    key={cust.id}
                    className={cn(
                      'hover:bg-muted/30 transition-colors group',
                      isSelected && 'bg-indigo-500/5 hover:bg-indigo-500/10'
                    )}
                  >
                    <td className="py-3.5 px-4">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectRow(cust.id)}
                        aria-label={`Select ${cust.company}`}
                      />
                    </td>
                    <td className="py-3.5 px-4 font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
                          {cust.logoText}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1">
                            {cust.company}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono">{cust.domain}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">{cust.contactName}</span>
                        <span className="text-[11px] text-muted-foreground">{cust.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-semibold text-foreground text-xs">
                        {formatCurrency(cust.dealValue)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border', stageInfo.bg, stageInfo.color)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {stageInfo.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <img 
                          src={cust.owner.avatar} 
                          alt={cust.owner.name} 
                          className="w-5 h-5 rounded-full object-cover border border-border" 
                        />
                        <span className="text-muted-foreground text-[11px]">{cust.owner.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground text-[11px] font-mono">
                      {cust.lastContact}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="p-4 border-t border-border/60 bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          Showing <span className="font-semibold text-foreground">{filteredData.length}</span> of <span className="font-semibold text-foreground">{data.length}</span> leads
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg border-border" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg border-border">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
