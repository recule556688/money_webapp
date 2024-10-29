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

export function PredictionsForm({ moneyInfo, totalExpenses, darkMode, incomes }) {
  // Calculate total monthly income from all sources
  const monthlyIncome = Object.values(incomes).reduce((total, income) => {
    return total + (income.isYearly ? income.amount / 12 : income.amount);
  }, 0);

  const monthlySavings = monthlyIncome - totalExpenses;
  const yearlySavings = monthlySavings * 12;

  // Calculate 5-year projection
  const years = Array.from({ length: 6 }, (_, i) => i);
  const projectedSavings = years.map(year => {
    return yearlySavings * year;
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
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          color: darkMode ? '#9CA3AF' : '#374151'
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB'
        }
      },
      x: {
        ticks: {
          color: darkMode ? '#9CA3AF' : '#374151'
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB'
        }
      }
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Money Predictions
      </h2>
      
      {/* Monthly Summary section */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4 mb-6`}>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Monthly Summary
        </h3>
        <div className="space-y-2">
          <div className={`flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Monthly Income:</span>
            <span className="font-medium">${formatNumber(monthlyIncome)}</span>
          </div>
          <div className={`flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Monthly Expenses:</span>
            <span className="font-medium">${formatNumber(totalExpenses)}</span>
          </div>
          <div className={`flex justify-between text-lg font-medium pt-2 border-t ${
            darkMode ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Monthly Savings:</span>
            <span className={monthlySavings >= 0 
              ? (darkMode ? 'text-green-400' : 'text-green-600')
              : (darkMode ? 'text-red-400' : 'text-red-600')
            }>
              ${formatNumber(monthlySavings)}
            </span>
          </div>
        </div>
      </div>

      {/* 5-Year Projection section */}
      <div>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          5-Year Savings Projection
        </h3>
        <div className={`h-[300px] ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
          <Line data={chartData} options={{
            ...chartOptions,
            scales: {
              ...chartOptions.scales,
              y: {
                ...chartOptions.scales.y,
                grid: {
                  color: darkMode ? '#374151' : '#E5E7EB'
                },
                ticks: {
                  ...chartOptions.scales.y.ticks,
                  color: darkMode ? '#9CA3AF' : '#374151'
                }
              },
              x: {
                ...chartOptions.scales.x,
                grid: {
                  color: darkMode ? '#374151' : '#E5E7EB'
                },
                ticks: {
                  ...chartOptions.scales.x.ticks,
                  color: darkMode ? '#9CA3AF' : '#374151'
                }
              }
            }
          }} />
        </div>
      </div>

      {/* Yearly Milestones section */}
      <div className={`mt-8 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Yearly Milestones
        </h3>
        <div className="space-y-2">
          {years.slice(1).map(year => (
            <div key={year} className={`flex justify-between ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span>Year {year}:</span>
              <span className="font-medium">
                ${projectedSavings[year].toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 