'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  // Prepare data for the Donut Chart (Expenses by Category)
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      // Normalize category strings for better grouping
      const cat = curr.category.trim();
      acc[cat] = (acc[cat] || 0) + curr.amount;
      return acc;
    }, {});

  const chartData = Object.keys(expensesByCategory)
    .map(category => ({
      name: category,
      value: expensesByCategory[category]
    }))
    .sort((a, b) => b.value - a.value);

  // A beautiful emerald/teal color palette for the chart
  const COLORS = ['#10b981', '#059669', '#34d399', '#047857', '#6ee7b7', '#064e3b', '#a7f3d0'];

  const clearData = () => {
    if (window.confirm("Are you sure you want to delete all transactions? This cannot be undone.")) {
      localStorage.removeItem('transactions');
      setTransactions([]);
    }
  };

  const exportCSV = () => {
    if (transactions.length === 0) return;
    
    const headers = ['Date', 'Category', 'Type', 'Amount'];
    const csvRows = transactions.map(t => {
      // Ensure category doesn't break CSV if it contains commas
      const safeCategory = `"${t.category.replace(/"/g, '""')}"`;
      return `${new Date(t.date).toLocaleDateString()},${safeCategory},${t.type},${t.amount}`;
    });
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'fini_transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 pt-28 pb-20 relative">
      {/* Background ambient light */}
      <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 tracking-tight mb-2">Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back! Here's your financial overview.</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4">
            <Button 
              onClick={exportCSV} 
              disabled={transactions.length === 0}
              className="bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-full shadow-sm transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Export CSV
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={clearData} 
              disabled={transactions.length === 0}
              className="bg-white/80 backdrop-blur-sm border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 rounded-full shadow-sm transition-all flex items-center gap-2"
            >
              <Trash2 size={16} />
              Clear Data
            </Button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="bg-white/70 backdrop-blur-md border-white/60 shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-light text-gray-800">₹{balance.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/60 shadow-xl shadow-green-900/5 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-light text-emerald-600">+₹{income.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-md border-white/60 shadow-xl shadow-rose-900/5 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-orange-400"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-light text-rose-500">-₹{expense.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics & Charts */}
        {chartData.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Breakdown</h2>
            <Card className="bg-white/70 backdrop-blur-md border-white/60 shadow-xl shadow-emerald-900/5 rounded-3xl p-6">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `₹${value.toFixed(2)}`}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>

        {transactions.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-sm border border-white rounded-3xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
            <p className="text-xl text-gray-600 font-medium">No transactions yet.</p>
            <p className="text-gray-400 mt-2">Add your first income or expense to get started.</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-lg shadow-emerald-900/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-5 text-gray-500 font-semibold">Date</th>
                    <th className="px-8 py-5 text-gray-500 font-semibold">Category</th>
                    <th className="px-8 py-5 text-gray-500 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.slice().reverse().map((t, index) => (
                    <tr key={index} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-8 py-5 text-gray-600 font-medium">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="px-8 py-5 text-gray-600">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 shadow-sm">
                          {t.category}
                        </span>
                      </td>
                      <td className={`px-8 py-5 font-bold text-right text-lg ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
