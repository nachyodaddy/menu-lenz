'use client';
import React, { useState } from 'react';
import { MOCK_INVENTORY, MOCK_WALLET } from '@/lib/store/mock-db';
import { InventoryItem, HouseholdWallet, LenzListItem } from '@/lib/types/schema';
import { ShoppingBag, Wallet, ShoppingCart, ListChecks, DollarSign, Store, TrendingUp, Receipt, Plus, CheckCircle2 } from 'lucide-react';

export const LenzEcosystemDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LIST' | 'SHOP' | 'CART' | 'WALLET'>('LIST');
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [wallet, setWallet] = useState<HouseholdWallet>(MOCK_WALLET);

  // Generate automated LENZ List items based on 30-day meal plan ingredients & inventory
  const [shoppingList, setShoppingList] = useState<LenzListItem[]>([
    {
      id: 'LST-1',
      name: 'Boneless Skinless Chicken Breast',
      required_qty: 25,
      unit: 'lbs',
      category: 'MEAT',
      in_stock_qty: 14,
      to_buy_qty: 11,
      estimated_cost: 38.39,
      store: 'ALDI Food Market',
      checked: false
    },
    {
      id: 'LST-2',
      name: 'Organic Carrots & Sweet Potatoes',
      required_qty: 30,
      unit: 'lbs',
      category: 'PRODUCE',
      in_stock_qty: 18,
      to_buy_qty: 12,
      estimated_cost: 22.68,
      store: 'Kroger Fresh',
      checked: false
    },
    {
      id: 'LST-3',
      name: 'Almond Milk Unsweetened',
      required_qty: 15,
      unit: 'cartons',
      category: 'DAIRY',
      in_stock_qty: 8,
      to_buy_qty: 7,
      estimated_cost: 16.03,
      store: 'ALDI Food Market',
      checked: true
    },
    {
      id: 'LST-4',
      name: 'Atlantic Salmon Portions',
      required_qty: 20,
      unit: 'portions',
      category: 'MEAT',
      in_stock_qty: 10,
      to_buy_qty: 10,
      estimated_cost: 49.90,
      store: 'Local Farm Fresh',
      checked: false
    }
  ]);

  const toggleCheckItem = (id: string) => {
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const totalShoppingEst = shoppingList.reduce((acc, item) => acc + item.estimated_cost, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Navigation */}
      <div className="bg-dark-card border border-dark-border p-4 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            LENZ Shopping & Budget Ecosystem
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-500 border border-brand-500/30">
              Integrated Household Suite
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Automated ingredient consolidation, live inventory tracking, receipt logging, and wallet oversight
          </p>
        </div>

        {/* Extension Module Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-dark-border">
          {[
            { id: 'LIST', label: 'LENZ List', icon: ListChecks },
            { id: 'SHOP', label: 'LENZ Shop', icon: Store },
            { id: 'CART', label: 'LENZ Cart & Pantry', icon: ShoppingCart },
            { id: 'WALLET', label: 'LENZ Wallet', icon: Wallet }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-brand-500 text-dark-base shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MODULE 1: LENZ List */}
      {activeTab === 'LIST' && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-brand-500" />
                Automated Consolidated Shopping List
              </h3>
              <p className="text-xs text-slate-400">Auto-generated from 30-day menu plan minus active pantry inventory</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Projected Shopping Total:</span>
              <div className="text-lg font-mono font-bold text-brand-400">${totalShoppingEst.toFixed(2)}</div>
            </div>
          </div>

          <div className="space-y-2">
            {shoppingList.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheckItem(item.id)}
                className={`p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                  item.checked
                    ? 'bg-slate-950/60 border-dark-border/40 opacity-60'
                    : 'bg-slate-900 border-dark-border hover:border-brand-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    item.checked ? 'bg-brand-500 border-brand-400 text-dark-base' : 'border-slate-600'
                  }`}>
                    {item.checked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${item.checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.name}
                    </span>
                    <div className="text-[11px] text-slate-400 space-x-2 font-mono">
                      <span>Need: {item.required_qty} {item.unit}</span>
                      <span>• In Stock: {item.in_stock_qty} {item.unit}</span>
                      <span className="text-brand-500 font-bold">• Buy: {item.to_buy_qty} {item.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-200">${item.estimated_cost.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 block">{item.store}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 2: LENZ Shop */}
      {activeTab === 'SHOP' && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <div className="pb-3 border-b border-dark-border">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Store className="w-4 h-4 text-accent-cyan" />
              Comparative Household Vendor Pricing
            </h3>
            <p className="text-xs text-slate-400">Real-time local grocery price comparative for household budget optimization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { store: 'ALDI Food Market', estTotal: 126.40, status: 'BEST VALUE', savings: 'Save $24.50', color: 'border-brand-500' },
              { store: 'Walmart Supercenter', estTotal: 138.80, status: 'STANDARD', savings: 'Save $12.10', color: 'border-accent-cyan' },
              { store: 'Kroger Fresh Market', estTotal: 150.90, status: 'PREMIUM', savings: 'Standard Rate', color: 'border-slate-700' }
            ].map((vendor, i) => (
              <div key={i} className={`bg-slate-900 border ${vendor.color} p-4 rounded-xl space-y-3 relative`}>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-500 uppercase tracking-wider">
                  {vendor.status}
                </span>
                <h4 className="text-base font-bold text-slate-100">{vendor.store}</h4>
                <div className="text-2xl font-bold font-mono text-slate-100">${vendor.estTotal.toFixed(2)}</div>
                <p className="text-xs text-slate-400">{vendor.savings}</p>
                <button className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors">
                  Select Preferred Vendor
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 3: LENZ Cart & Pantry Inventory */}
      {activeTab === 'CART' && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-accent-amber" />
                Real-Time Pantry & Fridge Inventory Tracking
              </h3>
              <p className="text-xs text-slate-400">Live quantity balances with reorder threshold alerts</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-brand-500 text-dark-base text-xs font-bold flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              Add Inventory Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inventory.map((inv) => (
              <div key={inv.item_id} className="bg-slate-900 border border-dark-border p-3 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{inv.name}</h4>
                  <div className="text-[11px] text-slate-400 space-x-2 font-mono">
                    <span>Source: {inv.store_source}</span>
                    <span>• Exp: {inv.expiration_date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-brand-400">{inv.quantity} {inv.unit}</span>
                  <span className="text-[10px] text-slate-500 block">${inv.unit_price} / unit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: LENZ Wallet */}
      {activeTab === 'WALLET' && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-brand-500" />
                Household Grocery Budget & Receipt Oversight
              </h3>
              <p className="text-xs text-slate-400">Monthly allowance tracking for Woodlane Residential Management</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-slate-300">
              Ref: {wallet.wallet_id}
            </span>
          </div>

          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-dark-border p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Monthly Budget</span>
              <div className="text-2xl font-bold font-mono text-slate-100 mt-1">${wallet.monthly_budget.toFixed(2)}</div>
            </div>

            <div className="bg-slate-900 border border-brand-500/30 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Current Balance</span>
              <div className="text-2xl font-bold font-mono text-brand-400 mt-1">${wallet.current_balance.toFixed(2)}</div>
            </div>

            <div className="bg-slate-900 border border-dark-border p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Spent This Month</span>
              <div className="text-2xl font-bold font-mono text-accent-rose mt-1">${wallet.spent_this_month.toFixed(2)}</div>
            </div>

            <div className="bg-slate-900 border border-dark-border p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Projected 30-Day Cost</span>
              <div className="text-2xl font-bold font-mono text-accent-amber mt-1">${wallet.projected_cost_30day.toFixed(2)}</div>
            </div>
          </div>

          {/* Scanned Receipt History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-brand-500" />
              Scanned Grocery Receipts
            </h4>
            <div className="space-y-2">
              {wallet.recent_receipts.map((rcp) => (
                <div key={rcp.receipt_id} className="bg-slate-900 border border-dark-border p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-slate-800 text-slate-300">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">{rcp.store}</h5>
                      <span className="text-[11px] text-slate-400 font-mono">{rcp.date} • {rcp.items_count} items</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-slate-100">${rcp.total.toFixed(2)}</span>
                    <span className="text-[10px] text-brand-500 block">Verified Log</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
