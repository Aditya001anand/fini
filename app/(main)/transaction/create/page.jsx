'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CreateTransactionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem('transactions');
    const transactions = stored ? JSON.parse(stored) : [];
    
    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 pt-32 pb-20 relative flex items-center justify-center">
      {/* Background ambient light */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
      </div>

      <div className="w-full max-w-lg px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white p-10 rounded-3xl shadow-xl shadow-emerald-900/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>
          
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 tracking-tight mb-8 text-center">
            New Transaction
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  required 
                  min="0.01" 
                  step="0.01"
                  className="w-full bg-white/50 border border-green-100 rounded-2xl py-4 pl-8 pr-4 text-gray-800 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Type</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  className="w-full bg-white/50 border border-green-100 rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner cursor-pointer"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required
                  className="w-full bg-white/50 border border-green-100 rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
                placeholder="e.g. Groceries, Rent, Salary..."
                className="w-full bg-white/50 border border-green-100 rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 text-lg rounded-2xl shadow-lg border-none hover:scale-[1.02] transition-all">
                Save Transaction
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
