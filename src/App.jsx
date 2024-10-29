import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ExpenseForm } from './components/ExpenseForm';
import { SubscriptionForm } from './components/SubscriptionForm';
import { Dashboard } from './components/Dashboard';
import { MoneyForm } from './components/MoneyForm';
import { PredictionsForm } from './components/PredictionsForm';
import { IncomeForm } from './components/IncomeForm';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState('expenses');
  
  // Initialize state with data from localStorage if it exists
  const [expenses, setExpenses] = useState({
    housing: { amount: 0, isYearly: false },
    transportation: { amount: 0, isYearly: false },
    food: { amount: 0, isYearly: false },
    utilities: { amount: 0, isYearly: false },
    healthcare: { amount: 0, isYearly: false },
    entertainment: { amount: 0, isYearly: false },
    savings: { amount: 0, isYearly: false }
  });
  
  const [subscriptions, setSubscriptions] = useState({
    streaming: { amount: 0, isYearly: false },
    music: { amount: 0, isYearly: false },
    shopping: { amount: 0, isYearly: false },
    gym: { amount: 0, isYearly: false },
    other_subscriptions: { amount: 0, isYearly: false }
  });

  const [moneyInfo, setMoneyInfo] = useState({
    income: { amount: 0, isYearly: false },
    savings: { amount: 0 },
    investment_return: { percentage: 7 }
  });

  const [incomes, setIncomes] = useState({
    salary: { amount: 0, isYearly: true },
    investments: { amount: 0, isYearly: false },
    sidehustle: { amount: 0, isYearly: false },
    other: { amount: 0, isYearly: false }
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Save to localStorage whenever expenses or subscriptions change
  useEffect(() => {
    const saveData = async () => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/data/user123`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            expenses,
            subscriptions,
            moneyInfo,
            incomes
          })
        });
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [expenses, subscriptions, moneyInfo, incomes]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Convert expenses to monthly values for the dashboard
  const monthlyExpenses = Object.entries(expenses).reduce((acc, [key, value]) => {
    acc[key] = value.isYearly ? value.amount / 12 : value.amount;
    return acc;
  }, {});

  // Convert subscriptions to monthly values for the dashboard
  const monthlySubscriptions = Object.entries(subscriptions).reduce((acc, [key, value]) => {
    acc[key] = value.isYearly ? value.amount / 12 : value.amount;
    return acc;
  }, {});

  // Combine monthly expenses and subscriptions for the dashboard
  const allExpenses = {
    ...monthlyExpenses,
    ...monthlySubscriptions
  };

  // Add a function to clear all data
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      setExpenses({
        housing: { amount: 0, isYearly: false },
        transportation: { amount: 0, isYearly: false },
        food: { amount: 0, isYearly: false },
        utilities: { amount: 0, isYearly: false },
        healthcare: { amount: 0, isYearly: false },
        entertainment: { amount: 0, isYearly: false },
        savings: { amount: 0, isYearly: false }
      });
      setSubscriptions({
        streaming: { amount: 0, isYearly: false },
        music: { amount: 0, isYearly: false },
        shopping: { amount: 0, isYearly: false },
        gym: { amount: 0, isYearly: false },
        other_subscriptions: { amount: 0, isYearly: false }
      });
      localStorage.removeItem('expenses');
      localStorage.removeItem('subscriptions');
      setMoneyInfo({
        income: { amount: 0, isYearly: false },
        savings: { amount: 0 },
        investment_return: { percentage: 7 }
      });
      localStorage.removeItem('moneyInfo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex justify-between">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('expenses')}
                className={`${
                  activeTab === 'expenses'
                    ? 'border-indigo-500 text-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Regular Expenses
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`${
                  activeTab === 'subscriptions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => setActiveTab('investments')}
                className={`${
                  activeTab === 'investments'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Investments
              </button>
              <button
                onClick={() => setActiveTab('incomes')}
                className={`${
                  activeTab === 'incomes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Incomes
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`${
                  activeTab === 'predictions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Money Predictions
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-500 w-5 h-5" />
                ) : (
                  <FaMoon className="text-gray-500 w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleReset}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
              >
                Reset All Data
              </button>
            </div>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {activeTab === 'expenses' ? (
              <ExpenseForm expenses={expenses} onUpdate={setExpenses} />
            ) : activeTab === 'subscriptions' ? (
              <SubscriptionForm 
                subscriptions={subscriptions} 
                onUpdate={setSubscriptions}
                darkMode={darkMode}
              />
            ) : activeTab === 'investments' ? (
              <MoneyForm 
                moneyInfo={moneyInfo} 
                onUpdate={setMoneyInfo}
                totalExpenses={Object.values(allExpenses).reduce((a, b) => a + b, 0)}
                savings={expenses.savings}
              />
            ) : activeTab === 'incomes' ? (
              <IncomeForm incomes={incomes} onUpdate={setIncomes} />
            ) : (
              <PredictionsForm 
                moneyInfo={moneyInfo}
                totalExpenses={Object.values(allExpenses).reduce((a, b) => a + b, 0)}
                darkMode={darkMode}
                incomes={incomes}
              />
            )}
          </div>
          <Dashboard expenses={allExpenses} darkMode={darkMode} />
        </div>
      </main>
    </div>
  );
}

export default App; 