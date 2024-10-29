import React, { useState } from 'react';
import { FaHome, FaCar, FaUtensils, FaBolt, FaMedkit, FaGamepad, FaPiggyBank, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export function ExpenseForm({ expenses, onUpdate }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedLabel, setEditedLabel] = useState('');

  const handleChange = (category, value, isYearly) => {
    onUpdate({
      ...expenses,
      [category]: {
        amount: parseFloat(value) || 0,
        isYearly: isYearly
      }
    });
  };

  const categories = [
    { id: 'housing', label: 'Housing', icon: FaHome },
    { id: 'transportation', label: 'Transportation', icon: FaCar },
    { id: 'food', label: 'Food & Groceries', icon: FaUtensils },
    { id: 'utilities', label: 'Utilities', icon: FaBolt },
    { id: 'healthcare', label: 'Healthcare', icon: FaMedkit },
    { id: 'entertainment', label: 'Entertainment', icon: FaGamepad },
    { id: 'savings', label: 'Savings', icon: FaPiggyBank },
  ];

  // Helper function to calculate monthly amount
  const getMonthlyAmount = (expense) => {
    if (!expense || typeof expense.amount !== 'number') {
      return 0; // Default to 0 if expense is undefined or amount is not a number
    }
    return expense.isYearly ? expense.amount / 12 : expense.amount;
  };

  const handleEditStart = (category) => {
    setEditingCategory(category.id);
    setEditedLabel(category.label);
  };

  const handleEditSave = (categoryId) => {
    // Instead of modifying the categories array directly,
    // we can update the expenses object with the new label
    onUpdate({
      ...expenses,
      [categoryId]: {
        ...expenses[categoryId],
        label: editedLabel
      }
    });
    setEditingCategory(null);
  };

  const handleEditCancel = () => {
    setEditingCategory(null);
    setEditedLabel('');
  };

  const formatNumber = (number) => {
    if (typeof number !== 'number') return '0';
    return number.toLocaleString('en-US', { maximumFractionDigits: 2 }).replace(/,/g, ' ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:shadow-gray-900">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Expenses</h2>
      <div className="space-y-6">
        {categories.map(({ id, label, icon: Icon }) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-4">
              <Icon className="text-indigo-600 text-xl" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  {editingCategory === id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editedLabel}
                        onChange={(e) => setEditedLabel(e.target.value)}
                        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleEditSave(id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                      <button
                        onClick={() => handleEditStart({ id, label })}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={expenses[id]?.amount ? formatNumber(expenses[id].amount) : ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/[^\d]/g, '');
                        handleChange(id, value, expenses[id]?.isYearly || false);
                      }}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleChange(id, expenses[id]?.amount || 0, false)}
                      className={`px-3 py-1 rounded-l-md border ${
                        !expenses[id]?.isYearly
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange(id, expenses[id]?.amount || 0, true)}
                      className={`px-3 py-1 rounded-r-md border ${
                        expenses[id]?.isYearly
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-10 text-sm text-gray-500 dark:text-gray-400">
              Monthly cost: ${formatNumber(getMonthlyAmount(expenses[id]))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 