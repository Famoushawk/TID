import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { scaleOrdinal } from 'd3-scale-chromatic';

const ExpensesDiagram = () => {
  const [expenseData, setExpenseData] = useState([
    { name: 'Rent', value: 15000 },
    { name: 'Groceries', value: 3300 },
    { name: 'Transportation', value: 400 },
    { name: 'Entertainment', value: 1000 },
  ]);

  const [formData, setFormData] = useState({ name: '', value: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [outerRadius, setOuterRadius] = useState(Math.min(window.innerWidth * 0.3, 200));

  const COLORS = scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const handleResize = () => {
      const dynamicOuterRadius = Math.min(window.innerWidth * 0.3, 200);
      setOuterRadius(dynamicOuterRadius);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExpense = () => {
    if (formData.name && formData.value) {
      const value = Number(formData.value);
      if (isNaN(value) || value <= 0) {
        setErrorMessage('Please enter a valid number for the expense value greater than 0.');
        setTimeout(() => {
          setFormData({ name: '', value: '' });
        }, 2000);
        return;
      }
      setExpenseData((prevExpenseData) => [
        ...prevExpenseData,
        { name: formData.name, value },
      ]);
      setFormData({ name: '', value: '' });
      setErrorMessage('');
    } else {
      setErrorMessage('Both fields are required.');
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
          <p>{`${name}: kr. ${value.toLocaleString('da-DK')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="value"
          placeholder="Expense Value"
          value={formData.value}
          onChange={handleInputChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <h2>Expense Distribution</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-in-out"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS(index % 10)} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesDiagram;
