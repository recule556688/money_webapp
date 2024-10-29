import { useState } from 'react';
import { 
  FaStream, FaMusic, FaShoppingCart, FaDumbbell, FaEllipsisH, 
  FaGamepad, FaTv, FaBook, FaGraduationCap, FaCloud, FaNewspaper,
  FaPlane, FaWifi, FaCoffee, FaFilm
} from 'react-icons/fa';

export function AddSubscriptionModal({ isOpen, onClose, onAdd, darkMode }) {
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    icon: 'FaStream',
    amount: '',
    isYearly: false
  });

  const availableIcons = {
    FaStream: FaStream,
    FaMusic: FaMusic,
    FaShoppingCart: FaShoppingCart,
    FaDumbbell: FaDumbbell,
    FaGamepad: FaGamepad,
    FaTv: FaTv,
    FaBook: FaBook,
    FaGraduationCap: FaGraduationCap,
    FaCloud: FaCloud,
    FaNewspaper: FaNewspaper,
    FaPlane: FaPlane,
    FaWifi: FaWifi,
    FaCoffee: FaCoffee,
    FaFilm: FaFilm,
    FaEllipsisH: FaEllipsisH,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subscriptionId = newSubscription.name.toLowerCase().replace(/\s+/g, '_');
    onAdd({
      id: subscriptionId,
      name: newSubscription.name,
      icon: newSubscription.icon,
      amount: parseFloat(newSubscription.amount),
      isYearly: newSubscription.isYearly
    });
    setNewSubscription({ name: '', icon: 'FaStream', amount: '', isYearly: false });
    onClose();
  };

  if (!isOpen) return null;

  const SelectedIcon = availableIcons[newSubscription.icon];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full p-6`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Add New Subscription
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Service Name
            </label>
            <input
              type="text"
              value={newSubscription.name}
              onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Icon
            </label>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {Object.entries(availableIcons).map(([iconName, Icon]) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setNewSubscription({ ...newSubscription, icon: iconName })}
                  className={`p-2 rounded-md flex items-center justify-center ${
                    newSubscription.icon === iconName
                      ? 'bg-indigo-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Amount
            </label>
            <input
              type="text"
              value={newSubscription.amount}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '').replace(/[^\d.]/g, '');
                setNewSubscription({ ...newSubscription, amount: value });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isYearly"
              checked={newSubscription.isYearly}
              onChange={(e) => setNewSubscription({ ...newSubscription, isYearly: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isYearly" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Yearly billing
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 