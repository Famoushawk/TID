import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpensesDiagram = () => {

  const expenseData = [
    { name: 'Rent', value: 1000 },
    { name: 'Groceries', value: 400 },
    { name: 'Transportation', value: 200 },
    { name: 'Entertainment', value: 300 },
  ];

 
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h2>Expense Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={expenseData} 
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpensesDiagram;

