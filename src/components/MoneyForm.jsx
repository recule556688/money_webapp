import React from 'react';
import { FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatNumber = (number) => {
  if (typeof number !== 'number') return '0';
  return number.toLocaleString('en-US', { maximumFractionDigits: 2 }).replace(/,/g, ' ');
};

export function MoneyForm({ moneyInfo, onUpdate, totalExpenses, savings, darkMode }) {
  const handleChange = (field, value) => {
    onUpdate({
      ...moneyInfo,
      [field]: { percentage: parseFloat(value) || 0 }
    });
  };

  // Calculate monthly savings from expenses
  const monthlySavings = savings.isYearly ? savings.amount / 12 : savings.amount;
  const yearlySavings = monthlySavings * 12;
  const returnRate = moneyInfo.investment_return.percentage / 100;

  // Calculate 10-year projection with compound interest
  const years = Array.from({ length: 11 }, (_, i) => i);
  const projectedSavings = years.map(year => {
    return yearlySavings * (1 + returnRate) ** year;
  });

  const chartData = {
    labels: years,
    datasets: [{
      label: 'Projected Savings',
      data: projectedSavings,
      borderColor: '#4F46E5',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.parsed.y.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        },
        backgroundColor: darkMode ? '#4B5563' : '#ffffff',
        titleColor: darkMode ? '#ffffff' : '#000000',
        bodyColor: darkMode ? '#ffffff' : '#000000',
        borderColor: darkMode ? '#6B7280' : '#E5E7EB',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          color: darkMode ? '#E5E7EB' : '#374151'
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB'
        }
      },
      x: {
        ticks: {
          color: darkMode ? '#E5E7EB' : '#374151'
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB'
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:shadow-gray-900">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Investment Calculator</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <FaChartLine className="text-indigo-600 dark:text-indigo-400 text-xl" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Investment Return (%)</label>
              <div className="mt-1">
                <input
                  type="number"
                  value={moneyInfo.investment_return.percentage || ''}
                  onChange={(e) => handleChange('investment_return', e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="7"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Investment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between dark:text-gray-200">
              <span>Monthly Savings:</span>
              <span className="font-medium">${formatNumber(monthlySavings)}</span>
            </div>
            <div className="flex justify-between dark:text-gray-200">
              <span>Yearly Investment:</span>
              <span className="font-medium">${formatNumber(yearlySavings)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium pt-2 border-t dark:border-gray-600">
              <span className="dark:text-white">Expected Return Rate:</span>
              <span className="text-indigo-600 dark:text-indigo-400">{moneyInfo.investment_return.percentage}%</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 dark:text-white">10-Year Investment Projection</h3>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
} 