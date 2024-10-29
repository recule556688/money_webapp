import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export function Dashboard({ expenses, darkMode }) {
  const labels = Object.keys(expenses).map(key => 
    key.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
  
  const values = Object.values(expenses);
  const total = values.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: [
        '#4F46E5', // indigo-600
        '#7C3AED', // violet-600
        '#EC4899', // pink-600
        '#EF4444', // red-600
        '#F59E0B', // amber-600
        '#10B981', // emerald-600
        '#6366F1', // indigo-500
        '#8B5CF6', // violet-500
        '#F472B6', // pink-500
        '#F87171', // red-500
        '#FBBF24', // amber-500
        '#34D399'  // emerald-500
      ],
    }]
  };

  const barOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Expense Analysis</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 dark:text-white">Total Monthly Expenses</h3>
        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4 dark:text-white">Expense Distribution</h3>
          <div className="aspect-square max-w-[300px] mx-auto">
            <Doughnut 
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      color: darkMode ? '#9CA3AF' : '#374151'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 dark:text-white">Expense Breakdown</h3>
          <div className="h-[400px]">
            <Bar
              data={chartData}
              options={{
                ...barOptions,
                scales: {
                  x: {
                    ...barOptions.scales.x,
                    ticks: {
                      ...barOptions.scales.x.ticks,
                      color: darkMode ? '#9CA3AF' : '#374151'
                    },
                    grid: {
                      ...barOptions.scales.x.grid,
                      color: darkMode ? '#374151' : '#E5E7EB'
                    }
                  },
                  y: {
                    ...barOptions.scales.y,
                    ticks: {
                      ...barOptions.scales.y.ticks,
                      color: darkMode ? '#9CA3AF' : '#374151'
                    },
                    grid: {
                      ...barOptions.scales.y.grid,
                      color: darkMode ? '#374151' : '#E5E7EB'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 