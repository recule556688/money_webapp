import React from 'react';
import { FaChartLine } from 'react-icons/fa';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2">
          <FaChartLine className="text-2xl" />
          <h1 className="text-2xl font-bold">Life Cost Simulator</h1>
        </div>
      </div>
    </header>
  );
} 