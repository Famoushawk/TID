import { WhiteBackground } from '../../components/layout/Layout.styles';
import React, { useState, useEffect } from 'react';
import Parse from 'parse';

Parse.initialize('BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P', 'Tf7tdCcH6j3YCJkzRJp05VcLIddIzGtbAs6rGruN');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Budget = () => {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [form, setForm] = useState({ category: '', amount: '' });
  const [newCategory, setNewCategory] = useState('');
  const [manualBalance, setManualBalance] = useState('');
  const [error, setError] = useState(null); // State to handle errors or feedback

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categories = await fetchCategories();
        const currentBalance = await fetchBalance();
        const currentExpenses = await fetchExpenses();
        setExpenseCategories(categories);
        setBalance(currentBalance);
        setExpenses(currentExpenses);
      } catch (err) {
        setError('Failed to fetch initial data. Please try again.');
      }
    };
    fetchInitialData();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty.');
      return;
    }

    try {
      await addCategory(newCategory);
      setExpenseCategories([...expenseCategories, newCategory]);
      setNewCategory('');
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to add category. Please try again.');
    }
  };

  const handleUpdateBalance = async () => {
    if (isNaN(manualBalance) || manualBalance.trim() === '') {
      setError('Please enter a valid number for balance.');
      return;
    }

    try {
      await updateBalance(Number(manualBalance));
      setBalance(Number(manualBalance));
      setManualBalance('');
      setError(null);
    } catch (err) {
      setError('Failed to update balance. Please try again.');
    }
  };

  const handleAddExpense = async () => {
    if (!form.category || !form.amount || isNaN(form.amount)) {
      setError('Please fill in all fields with valid data.');
      return;
    }

    try {
      await addExpense(form.category, Number(form.amount));
      setExpenses([...expenses, { category: form.category, amount: Number(form.amount) }]);
      setForm({ category: '', amount: '' });
      setError(null);
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    }
  };

  return (
    <WhiteBackground>
      <h1>Budget Management</h1>

      {error && <div className="error-message">{error}</div>} {/* Display error messages */}

      <div>
        <h2>Balance: {balance}</h2>
        <input
          type="text"
          value={manualBalance}
          onChange={(e) => setManualBalance(e.target.value)}
          placeholder="Update balance"
        />
        <button onClick={handleUpdateBalance}>Update Balance</button>
      </div>

      <div>
        <h2>Add Expense</h2>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="text"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Amount"
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div>
        <h2>Add Category</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>{expense.category}: {expense.amount}</li>
          ))}
        </ul>
      </div>
    </WhiteBackground>
  );
};

export default Budget;
