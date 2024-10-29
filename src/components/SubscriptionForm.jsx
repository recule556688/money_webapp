import React, { useState } from 'react';
import { FaPlay, FaMusic, FaShoppingCart, FaDumbbell, FaEllipsisH, FaEdit, FaCheck, FaTimes, FaPlus, FaStream } from 'react-icons/fa';
import { AddSubscriptionModal } from './AddSubscriptionModal';

export function SubscriptionForm({ subscriptions, onUpdate, darkMode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedLabel, setEditedLabel] = useState('');

  const formatNumber = (number) => {
    if (typeof number !== 'number') return '0';
    return number.toLocaleString('en-US', { maximumFractionDigits: 2 }).replace(/,/g, ' ');
  };

  const handleChange = (category, value, isYearly) => {
    onUpdate({
      ...subscriptions,
      [category]: {
        ...subscriptions[category],
        amount: parseFloat(value) || 0,
        isYearly: isYearly
      }
    });
  };

  const getMonthlyAmount = (subscription) => {
    if (!subscription || typeof subscription.amount !== 'number') {
      return 0;
    }
    return subscription.isYearly ? subscription.amount / 12 : subscription.amount;
  };

  // Default services
  const defaultServices = [
    { id: 'streaming', label: 'Streaming Services (Netflix, etc.)', icon: FaPlay },
    { id: 'music', label: 'Music Services', icon: FaMusic },
    { id: 'shopping', label: 'Shopping Memberships', icon: FaShoppingCart },
    { id: 'gym', label: 'Gym Membership', icon: FaDumbbell },
    { id: 'other_subscriptions', label: 'Other Subscriptions', icon: FaEllipsisH },
  ];

  // Get all available icons
  const availableIcons = {
    FaStream: FaStream,
    FaMusic: FaMusic,
    FaShoppingCart: FaShoppingCart,
    FaDumbbell: FaDumbbell,
    // ... add all other icons here
  };

  // Combine default and custom subscriptions
  const allServices = [
    ...defaultServices,
    ...Object.entries(subscriptions)
      .filter(([id]) => !defaultServices.find(s => s.id === id))
      .map(([id, sub]) => ({
        id,
        label: sub.name,
        icon: availableIcons[sub.icon] || FaEllipsisH
      }))
  ];

  const handleAddSubscription = (newSubscription) => {
    const updatedSubscriptions = {
      ...subscriptions,
      [newSubscription.id]: {
        name: newSubscription.name,
        icon: newSubscription.icon,
        amount: parseFloat(newSubscription.amount),
        isYearly: newSubscription.isYearly
      }
    };
    onUpdate(updatedSubscriptions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Subscriptions</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="space-y-6">
        {allServices.map(({ id, label, icon: Icon }) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-4">
              <Icon className="text-indigo-600 dark:text-indigo-400 text-xl" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {subscriptions[id]?.name || label}
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={subscriptions[id]?.amount ? formatNumber(subscriptions[id].amount) : ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/[^\d]/g, '');
                        handleChange(id, value, subscriptions[id]?.isYearly || false);
                      }}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Monthly/Yearly buttons stay the same */}
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-10 text-sm text-gray-500 dark:text-gray-400">
              Monthly cost: ${formatNumber(getMonthlyAmount(subscriptions[id]))}
            </div>
          </div>
        ))}
      </div>

      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSubscription}
        darkMode={darkMode}
      />
    </div>
  );
} 