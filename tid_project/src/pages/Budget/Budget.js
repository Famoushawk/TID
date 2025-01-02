import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Parse from 'parse';

Parse.initialize('BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P', 'Tf7tdCcH6j3YCJkzRJp05VcLIddIzGtbAs6rGruN');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 16px;
`;

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

  const fetchCategories = async () => {
    const Category = Parse.Object.extend('ExpenseCategory');
    const query = new Parse.Query(Category);
    try {
      const results = await query.find();
      return results.map((category) => category.get('name'));
    } catch (error) {
      throw error;
    }
  };

  const fetchBalance = async () => {
    const query = new Parse.Query('Balance');
    try {
      const balanceObj = await query.first();
      return balanceObj ? balanceObj.get('amount') : 0;
    } catch (error) {
      throw error;
    }
  };

  const fetchExpenses = async () => {
    const Expense = Parse.Object.extend('Expense');
    const query = new Parse.Query(Expense);
    try {
      const results = await query.find();
      return results.map((expense) => ({
        category: expense.get('category'),
        amount: expense.get('amount'),
      }));
    } catch (error) {
      throw error;
    }
  };

  const addCategory = async (categoryName) => {
    const Category = Parse.Object.extend('ExpenseCategory');
    const newCategory = new Category();
    try {
      newCategory.set('name', categoryName);
      await newCategory.save();
    } catch (error) {
      throw error;
    }
  };

  const updateBalance = async (newBalance) => {
    const query = new Parse.Query('Balance');
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const addExpense = async (category, amount) => {
    const Expense = Parse.Object.extend('Expense');
    const newExpense = new Expense();
    try {
      newExpense.set('category', category);
      newExpense.set('amount', amount);
      await newExpense.save();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container>
      <Title>Budget Management</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Section>
        <Label>Current Balance: {balance}</Label>
        <Input
          type="text"
          value={manualBalance}
          onChange={(e) => setManualBalance(e.target.value)}
          placeholder="Update balance"
        />
        <Button onClick={() => updateBalance(Number(manualBalance))}>Update Balance</Button>
      </Section>

      <Section>
        <Label>Add Expense</Label>
        <Input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
        />
        <Input
          type="text"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Amount"
        />
        <Button onClick={() => addExpense(form.category, Number(form.amount))}>Add Expense</Button>
      </Section>

      <Section>
        <Label>Add Category</Label>
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
        />
        <Button onClick={() => addCategory(newCategory)}>Add Category</Button>
      </Section>

      <Section>
        <Label>Expenses</Label>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>{expense.category}: {expense.amount}</li>
          ))}
        </ul>
      </Section>
    </Container>
  );
};

export default Budget;
