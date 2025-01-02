import { WhiteBackground } from '../../components/layout/Layout.styles';
import React, { useState, useEffect } from 'react';
import Parse from 'parse';


Parse.initialize('BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P', 'Tf7tdCcH6j3YCJkzRJp05VcLIddIzGtbAs6rGruN');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Frame1 = () => {
  const [balance, setBalance] = useState(0); 
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [form, setForm] = useState({ category: '', amount: '' });
  const [newCategory, setNewCategory] = useState('');
  const [manualBalance, setManualBalance] = useState('');


  useEffect(() => {
    const fetchInitialData = async () => {
      const categories = await fetchCategories();
      const currentBalance = await fetchBalance();
      const currentExpenses = await fetchExpenses();
      setExpenseCategories(categories);
      setBalance(currentBalance);
      setExpenses(currentExpenses);
    };

    fetchInitialData();
  }, []);


  const fetchBalance = async () => {
    const query = new Parse.Query('Balance');
    const balanceObj = await query.first();
    return balanceObj ? balanceObj.get('amount') : 0;
  };


  const updateBalance = async (newBalance) => {
    const query = new Parse.Query('Balance');
    const balanceObj = await query.first();

    if (balanceObj) {
      balanceObj.set('amount', newBalance);
      await balanceObj.save();
    } else {
      const Balance = Parse.Object.extend('Balance');
      const newBalanceObj = new Balance();
      newBalanceObj.set('amount', newBalance);
      await newBalanceObj.save();
    }
  };


  const fetchExpenses = async () => {
    const query = new Parse.Query('Expense');
    const results = await query.find();
    return results.map(expense => ({
      category: expense.get('category'),
      amount: expense.get('amount'),
    }));
  };


  const addExpense = async (category, amount) => {
    const Expense = Parse.Object.extend('Expense');
    const expense = new Expense();
    expense.set('category', category);
    expense.set('amount', parseFloat(amount));
    await expense.save();
  };


  const fetchCategories = async () => {
    const query = new Parse.Query('ExpenseCategory');
    const results = await query.find();
    return results.map(category => category.get('name'));
  };


  const addCategory = async (newCategory) => {
    const query = new Parse.Query('ExpenseCategory');
    query.equalTo('name', newCategory);
    const existing = await query.first();

    if (!existing) {
      const ExpenseCategory = Parse.Object.extend('ExpenseCategory');
      const category = new ExpenseCategory();
      category.set('name', newCategory);
      await category.save();
    } else {
      alert('Kategorien eksisterer allerede.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setManualBalance(e.target.value);
  };


  const handleAddExpense = async (e) => {
    e.preventDefault();
    const { category, amount } = form;

    if (!category || !amount || isNaN(amount) || amount <= 0) {
      alert('Udfyld venligst alle felter korrekt.');
      return;
    }

    await addExpense(category, amount);
    const updatedBalance = balance - parseFloat(amount);
    await updateBalance(updatedBalance);

    setBalance(updatedBalance);
    setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
    setForm({ category: '', amount: '' });
  };


  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    const newBalance = parseFloat(manualBalance);

    if (!isNaN(newBalance) && newBalance >= 0) {
      await updateBalance(newBalance);
      setBalance(newBalance);
      setManualBalance('');
    } else {
      alert('Indtast venligst et gyldigt beløb.');
    }
  };


  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory && !expenseCategories.includes(newCategory)) {
      await addCategory(newCategory);
      setExpenseCategories([...expenseCategories, newCategory]);
      setNewCategory('');
    } else {
      alert('Kategorien eksisterer allerede eller er tom.');
    }
  };

  return (
    <WhiteBackground>
      <div style={{ padding: '20px' }}>
        <h1>Financial overview</h1>

        {}
        <div style={{
          marginBottom: '20px',
          padding: '10px',
          background: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Balance:</span>
          <span style={{ fontWeight: 'bold', color: '#28a745' }}>
            {balance.toFixed(2)} kr.
          </span>
        </div>

        {}
        <form onSubmit={handleUpdateBalance} style={{ marginBottom: '20px' }}>
          <h3>Update account balance</h3>
          <input
            type="number"
            value={manualBalance}
            onChange={handleBalanceChange}
            placeholder="New balance"
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <button type="submit" style={{
            padding: '10px',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}>
            Update balance
          </button>
        </form>

        {}
        <form onSubmit={handleAddExpense} style={{ marginBottom: '20px' }}>
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            >
              <option value="">Select category</option>
              {expenseCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="number"
              name="amount"
              value={form.amount}
              placeholder="Amount (kr.)"
              onChange={handleInputChange}
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" style={{
            padding: '10px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}>
            Add expense
          </button>
        </form>

        {}
        <form onSubmit={handleAddCategory} style={{ marginBottom: '20px' }}>
          <h3>Add new expense type</h3>
          <input
            type="text"
            value={newCategory}
            onChange={handleCategoryChange}
            placeholder="New category"
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <button type="submit" style={{
            padding: '10px',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}>
            Add category
          </button>
        </form>

        
        <div>
          <h2>Expenses</h2>
          {expenses.length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {expenses.map((expense, index) => (
                <li key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span>{expense.category}</span>
                  <span style={{ color: '#dc3545' }}>
                    - {expense.amount.toFixed(2)} kr.
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </WhiteBackground>
  );
};

export default Frame1;
