import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Role = 'ae' | 'manager' | 'vp';

interface RoleConfig {
  name: string;
  personalQuota: number;
  teamQuota: number;
  personalSaleCommission: number;
  personalMrrCommission: number;
  teamSaleOverride: number;
  teamMrrOverride: number;
  teamSize: number;
}

const roles: Record<Role, RoleConfig> = {
  ae: {
    name: 'SaaS Account Executive',
    personalQuota: 60,
    teamQuota: 0,
    personalSaleCommission: 300,
    personalMrrCommission: 50,
    teamSaleOverride: 0,
    teamMrrOverride: 0,
    teamSize: 0
  },
  manager: {
    name: 'SaaS Sales Manager',
    personalQuota: 5,
    teamQuota: 600,
    personalSaleCommission: 400,
    personalMrrCommission: 65,
    teamSaleOverride: 50,
    teamMrrOverride: 15,
    teamSize: 10
  },
  vp: {
    name: 'VP of Sales',
    personalQuota: 0,
    teamQuota: 6000,
    personalSaleCommission: 400,
    personalMrrCommission: 65,
    teamSaleOverride: 25,
    teamMrrOverride: 10,
    teamSize: 100
  }
};

export default function CommissionGuide() {
  const [selectedRole, setSelectedRole] = useState<Role>('ae');
  const [personalDeals, setPersonalDeals] = useState(roles.ae.personalQuota);
  const [teamDeals, setTeamDeals] = useState(roles.ae.teamQuota);

  const config = roles[selectedRole];

  // Update deals when role changes to match quota
  React.useEffect(() => {
    setPersonalDeals(config.personalQuota);
    setTeamDeals(config.teamQuota);
  }, [selectedRole, config.personalQuota, config.teamQuota]);

  const monthlyData = useMemo(() => {
    const data = [];

    for (let month = 1; month <= 12; month++) {
      // Sales commission is the same each month
      const personalSalesCommission = personalDeals * config.personalSaleCommission;
      const teamSalesCommission = teamDeals * config.teamSaleOverride;
      
      // MRR grows cumulatively (month * monthly amount)
      const cumulativeMrrPersonal = month * personalDeals * config.personalMrrCommission;
      const cumulativeMrrTeam = month * teamDeals * config.teamMrrOverride;

      data.push({
        month: `Month ${month}`,
        personalSales: personalSalesCommission,
        personalMrr: cumulativeMrrPersonal,
        teamSales: teamSalesCommission,
        teamMrr: cumulativeMrrTeam,
        totalSales: personalSalesCommission + teamSalesCommission,
        totalMrr: cumulativeMrrPersonal + cumulativeMrrTeam,
        total: personalSalesCommission + teamSalesCommission + cumulativeMrrPersonal + cumulativeMrrTeam
      });
    }
    return data;
  }, [personalDeals, teamDeals, config]);

  const annualTotals = useMemo(() => {
    const lastMonth = monthlyData[11];
    return {
      personalSales: lastMonth.personalSales * 12,
      personalMrr: lastMonth.personalMrr,
      teamSales: lastMonth.teamSales * 12,
      teamMrr: lastMonth.teamMrr,
      totalSales: lastMonth.totalSales * 12,
      totalMrr: lastMonth.totalMrr,
      grandTotal: (lastMonth.totalSales * 12) + lastMonth.totalMrr
    };
  }, [monthlyData]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Commission Structure Guide</h1>
        <p className="text-xl text-gray-300">
          Comprehensive commission breakdown for our sales organization
        </p>
      </div>

      {/* Product Pricing */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Product Pricing</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-blue-400">Monthly Subscription</h3>
            <p className="text-2xl font-bold text-blue-600">$599</p>
            <p className="text-sm text-gray-300">per month</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-blue-400">Setup Fee</h3>
            <p className="text-2xl font-bold text-blue-600">$499</p>
            <p className="text-sm text-gray-300">one-time</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-blue-400">Overage</h3>
            <p className="text-2xl font-bold text-blue-600">$0.30</p>
            <p className="text-sm text-gray-300">per minute over 300</p>
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Commission Structure</h2>
        
        <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
          <h3 className="font-semibold text-yellow-400 mb-2">Two Types of Commission</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-yellow-300">1. Initial Sale Commission</h4>
              <p className="text-sm text-yellow-200">One-time payment when deal closes</p>
            </div>
            <div>
              <h4 className="font-medium text-yellow-300">2. MRR Commission</h4>
              <p className="text-sm text-yellow-200">Monthly recurring payment for active clients</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* SaaS AE */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">SaaS Account Executive</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Personal Quota & Commission</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Personal Quota: <span className="font-semibold">60 deals/month</span></li>
                  <li>• Initial Sale: <span className="font-semibold text-green-600">$350 per sale</span></li>
                  <li>• MRR: <span className="font-semibold text-blue-400">$50/month per active client</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Team Structure</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Team Size: Individual contributor</li>
                  <li>• Team Override: None</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Manager */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">SaaS Sales Manager</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Personal Quota & Commission</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Personal Quota: <span className="font-semibold">5 deals/month</span></li>
                  <li>• Initial Sale: <span className="font-semibold text-green-400">$400 per sale</span></li>
                  <li>• MRR: <span className="font-semibold text-blue-400">$65/month per active client</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Team Structure & Overrides</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Team Size: <span className="font-semibold">10 AEs</span></li>
                  <li>• Team Quota: <span className="font-semibold">600 deals/month</span></li>
                  <li>• Team Sale Override: <span className="font-semibold text-green-400">$50 per team sale</span></li>
                  <li>• Team MRR Override: <span className="font-semibold text-blue-400">$15/month per team client</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* VP */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">VP of Sales</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Personal Quota & Commission</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Personal Quota: <span className="font-semibold">0 deals/month</span></li>
                  <li>• No personal sales commission</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-300 mb-2">Team Structure & Overrides</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Team Size: <span className="font-semibold">100 AEs (10 Managers)</span></li>
                  <li>• Team Quota: <span className="font-semibold">6,000 deals/month</span></li>
                  <li>• Team Sale Override: <span className="font-semibold text-green-400">$25 per team sale</span></li>
                  <li>• Team MRR Override: <span className="font-semibold text-blue-400">$10/month per team client</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Calculator */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Commission Calculator</h2>
        
        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Your Role</label>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value as Role)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ae">SaaS Account Executive</option>
            <option value="manager">SaaS Sales Manager</option>
            <option value="vp">VP of Sales</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {config.personalQuota > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Personal Deals per Month
              </label>
              <input
                type="number"
                value={personalDeals}
                onChange={(e) => setPersonalDeals(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Target: ${config.personalQuota}`}
              />
            </div>
          )}
          
          {config.teamQuota > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Team Deals per Month
              </label>
              <input
                type="number"
                value={teamDeals}
                onChange={(e) => setTeamDeals(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#1a5a1a] focus:border-[#1a5a1a]"
                placeholder={`Target: ${config.teamQuota}`}
              />
            </div>
          )}
        </div>

        {/* Annual Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-3">Initial Sale Commission (One-Time)</h3>
            <div className="space-y-2">
              {config.personalQuota > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-300">Personal Sales:</span>
                  <span className="font-semibold text-green-400">
                    ${(personalDeals * config.personalSaleCommission * 12).toLocaleString()}
                  </span>
                </div>
              )}
              {config.teamQuota > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-300">Team Override:</span>
                  <span className="font-semibold text-green-400">
                    ${(teamDeals * config.teamSaleOverride * 12).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="border-t border-green-500/30 pt-2 flex justify-between">
                <span className="font-semibold text-green-300">Annual Sales Total:</span>
                <span className="font-bold text-green-200">
                  ${annualTotals.totalSales.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">MRR Commission (Monthly Recurring)</h3>
            <div className="space-y-2">
              {config.personalQuota > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-300">Personal MRR (Year-end):</span>
                  <span className="font-semibold text-blue-400">
                    ${annualTotals.personalMrr.toLocaleString()}
                  </span>
                </div>
              )}
              {config.teamQuota > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-300">Team MRR Override (Year-end):</span>
                  <span className="font-semibold text-blue-400">
                    ${annualTotals.teamMrr.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="border-t border-blue-500/30 pt-2 flex justify-between">
                <span className="font-semibold text-blue-300">Annual MRR Total:</span>
                <span className="font-bold text-blue-200">
                  ${annualTotals.totalMrr.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Total Annual Earnings</h3>
          <p className="text-4xl font-bold">${annualTotals.grandTotal.toLocaleString()}</p>
          <p className="text-gray-300 mt-2">Sales Commission + MRR Commission</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-200">Month 1 Earnings:</p>
              <p className="font-bold text-xl">${monthlyData[0].total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-200">Month 12 Earnings:</p>
              <p className="font-bold text-xl">${monthlyData[11].total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Monthly Earnings Progression</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`, 
                  name === 'totalSales' ? 'Sales Commission' :
                  name === 'totalMrr' ? 'MRR Commission' : 
                  name === 'total' ? 'Total Earnings' : name
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend 
                wrapperStyle={{ color: '#F9FAFB' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="totalSales" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Monthly Sales Commission"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="totalMrr" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Cumulative MRR Commission"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#6366f1" 
                strokeWidth={4}
                name="Total Monthly Earnings"
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-green-600/20 p-3 rounded-lg border border-green-600/30">
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
            <p className="text-sm font-medium text-green-400">Sales Commission</p>
            <p className="text-xs text-green-300">Same each month</p>
          </div>
          <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-600/30">
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
            <p className="text-sm font-medium text-blue-400">MRR Commission</p>
            <p className="text-xs text-blue-300">Grows cumulatively</p>
          </div>
          <div className="bg-indigo-600/20 p-3 rounded-lg border border-indigo-600/30">
            <div className="w-4 h-4 bg-indigo-500 rounded-full mx-auto mb-1"></div>
            <p className="text-sm font-medium text-indigo-400">Total Earnings</p>
            <p className="text-xs text-indigo-300">Combined monthly income</p>
          </div>
        </div>
      </div>

      {/* Performance Scenarios */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Performance Scenarios at Quota</h2>
        <div className="grid gap-6">
          {Object.entries(roles).map(([roleKey, roleConfig]) => {
            const personalSalesAnnual = roleConfig.personalQuota * roleConfig.personalSaleCommission * 12;
            const personalMrrYear12 = roleConfig.personalQuota * roleConfig.personalMrrCommission * 12;
            const teamSalesAnnual = roleConfig.teamQuota * roleConfig.teamSaleOverride * 12;
            const teamMrrYear12 = roleConfig.teamQuota * roleConfig.teamMrrOverride * 12;
            const totalAnnual = personalSalesAnnual + personalMrrYear12 + teamSalesAnnual + teamMrrYear12;

            return (
              <div key={roleKey} className="border border-gray-600 rounded-lg p-4 bg-gray-700/30">
                <h3 className="text-lg font-semibold text-white mb-3">{roleConfig.name}</h3>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  {roleConfig.personalQuota > 0 && (
                    <>
                      <div className="bg-green-600/20 p-3 rounded border border-green-600/30">
                        <p className="text-sm text-green-300">Personal Sales</p>
                        <p className="font-bold text-green-400">${personalSalesAnnual.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-600/20 p-3 rounded border border-blue-600/30">
                        <p className="text-sm text-blue-300">Personal MRR</p>
                        <p className="font-bold text-blue-400">${personalMrrYear12.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                  {roleConfig.teamQuota > 0 && (
                    <>
                      <div className="bg-green-600/30 p-3 rounded border border-green-600/40">
                        <p className="text-sm text-green-300">Team Sales Override</p>
                        <p className="font-bold text-green-400">${teamSalesAnnual.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-600/30 p-3 rounded border border-blue-600/40">
                        <p className="text-sm text-blue-300">Team MRR Override</p>
                        <p className="font-bold text-blue-400">${teamMrrYear12.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded md:col-span-1">
                    <p className="text-sm text-gray-300">Total Annual</p>
                    <p className="font-bold text-white">${totalAnnual.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}