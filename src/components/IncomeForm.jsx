import React from 'react';
import { FaMoneyBillWave, FaBriefcase, FaChartLine, FaEllipsisH } from 'react-icons/fa';

export function IncomeForm({ incomes, onUpdate }) {
  const formatNumber = (number) => {
    if (typeof number !== 'number') return '0';
    return number.toLocaleString('en-US', { maximumFractionDigits: 2 }).replace(/,/g, ' ');
  };

  const handleChange = (category, value, isYearly) => {
    onUpdate({
      ...incomes,
      [category]: {
        amount: parseFloat(value) || 0,
        isYearly: isYearly
      }
    });
  };

  const categories = [
    { id: 'salary', label: 'Salary', icon: FaBriefcase },
    { id: 'investments', label: 'Investment Income', icon: FaChartLine },
    { id: 'sidehustle', label: 'Side Hustle', icon: FaMoneyBillWave },
    { id: 'other', label: 'Other Income', icon: FaEllipsisH },
  ];

  const getMonthlyAmount = (income) => {
    if (!income || typeof income.amount !== 'number') {
      return 0;
    }
    return income.isYearly ? income.amount / 12 : income.amount;
  };

  const totalMonthlyIncome = Object.values(incomes).reduce((total, income) => 
    total + getMonthlyAmount(income), 0
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:shadow-gray-900">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Income Sources</h2>
      <div className="space-y-6">
        {categories.map(({ id, label, icon: Icon }) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-4">
              <Icon className="text-indigo-600 dark:text-indigo-400 text-xl" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={incomes[id]?.amount ? formatNumber(incomes[id].amount) : ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/[^\d]/g, '');
                        handleChange(id, value, incomes[id]?.isYearly || false);
                      }}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleChange(id, incomes[id].amount, false)}
                      className={`px-3 py-1 rounded-l-md border ${
                        !incomes[id].isYearly
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange(id, incomes[id].amount, true)}
                      className={`px-3 py-1 rounded-r-md border ${
                        incomes[id].isYearly
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-10 text-sm text-gray-500 dark:text-gray-400">
              Monthly amount: ${formatNumber(getMonthlyAmount(incomes[id]))}
            </div>
          </div>
        ))}
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Total Monthly Income</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            ${formatNumber(totalMonthlyIncome)}
          </p>
        </div>
      </div>
    </div>
  );
} 