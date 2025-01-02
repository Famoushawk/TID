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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        console.log('Fetching initial data...');
        const categories = await fetchCategories();
        const currentBalance = await fetchBalance();
        const currentExpenses = await fetchExpenses();
        setExpenseCategories(categories);
        setBalance(currentBalance);
        setExpenses(currentExpenses);
        console.log('Initial data fetched successfully.');
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to fetch initial data. Please try again.');
      }
    };

    fetchInitialData();
  }, []);

  const fetchCategories = async () => {
    const Category = Parse.Object.extend('ExpenseCategory');
    const query = new Parse.Query(Category);
    try {
      const results = await query.find();
      console.log('Fetched categories:', results);
      return results.map((category) => category.get('name'));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  };

  const fetchBalance = async () => {
    const query = new Parse.Query('Balance');
    try {
      const balanceObj = await query.first();
      console.log('Fetched balance:', balanceObj);
      return balanceObj ? balanceObj.get('amount') : 0;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      throw error;
    }
  };

  const fetchExpenses = async () => {
    const Expense = Parse.Object.extend('Expense');
    const query = new Parse.Query(Expense);
    try {
      const results = await query.find();
      console.log('Fetched expenses:', results);
      return results.map((expense) => ({
        category: expense.get('category'),
        amount: expense.get('amount'),
      }));
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      throw error;
    }
  };

  const addCategory = async (categoryName) => {
    const Category = Parse.Object.extend('ExpenseCategory');
    const newCategory = new Category();
    try {
      newCategory.set('name', categoryName);
      const savedCategory = await newCategory.save();
      console.log('Category added:', savedCategory);
    } catch (error) {
      console.error('Failed to add category:', error);
      throw error;
    }
  };

  const updateBalance = async (newBalance) => {
    const query = new Parse.Query('Balance');
    try {
      const balanceObj = await query.first();
      if (balanceObj) {
        balanceObj.set('amount', newBalance);
        const updatedBalance = await balanceObj.save();
        console.log('Balance updated:', updatedBalance);
      } else {
        const Balance = Parse.Object.extend('Balance');
        const newBalanceObj = new Balance();
        newBalanceObj.set('amount', newBalance);
        const createdBalance = await newBalanceObj.save();
        console.log('New balance created:', createdBalance);
      }
    } catch (error) {
      console.error('Failed to update balance:', error);
      throw error;
    }
  };

  const addExpense = async (category, amount) => {
    const Expense = Parse.Object.extend('Expense');
    const newExpense = new Expense();
    try {
      newExpense.set('category', category);
      newExpense.set('amount', amount);
      const savedExpense = await newExpense.save();
      console.log('Expense added:', savedExpense);
    } catch (error) {
      console.error('Failed to add expense:', error);
      throw error;
    }
  };

  return (
    <WhiteBackground>
      <h1>Budget Management</h1>

      {error && <div className="error-message">{error}</div>}

      <div>
        <h2>Balance: {balance}</h2>
        <input
          type="text"
          value={manualBalance}
          onChange={(e) => setManualBalance(e.target.value)}
          placeholder="Update balance"
        />
        <button onClick={() => updateBalance(Number(manualBalance))}>Update Balance</button>
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
        <button onClick={() => addExpense(form.category, Number(form.amount))}>Add Expense</button>
      </div>

      <div>
        <h2>Add Category</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
        />
        <button onClick={() => addCategory(newCategory)}>Add Category</button>
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
