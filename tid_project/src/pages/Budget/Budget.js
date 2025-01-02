import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import styled from 'styled-components';

Parse.initialize('BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P', 'Tf7tdCcH6j3YCJkzRJp05VcLIddIzGtbAs6rGruN');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 16px;
`;

const Section = styled.section`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #444;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #d9534f;
  margin-bottom: 16px;
  font-size: 1rem;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
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
      return results.map((category) => ({
        id: category.id,
        name: category.get('name'),
      }));
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
      const savedCategory = await newCategory.save();
      setExpenseCategories((prev) => [...prev, { id: savedCategory.id, name: savedCategory.get('name') }]);
    } catch (error) {
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    const Category = Parse.Object.extend('ExpenseCategory');
    const query = new Parse.Query(Category);
    try {
      const category = await query.get(categoryId);
      await category.destroy();
      setExpenseCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      setError('Failed to delete category. Please try again.');
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
    <Wrapper>
      <Title>Budget Management</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Section>
        <SectionTitle>Balance</SectionTitle>
        <FormGroup>
          <Input
            type="text"
            value={manualBalance}
            onChange={(e) => setManualBalance(e.target.value)}
            placeholder="Update balance"
          />
          <Button onClick={() => updateBalance(Number(manualBalance))}>Update Balance</Button>
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Add Expense</SectionTitle>
        <FormGroup>
          <Select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </Select>
          <Input
            type="text"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
          />
          <Button onClick={() => addExpense(form.category, Number(form.amount))}>Add Expense</Button>
        </FormGroup>
      </Section>

      <Section>
        <SectionTitle>Add Category</SectionTitle>
        <FormGroup>
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
          />
          <Button onClick={() => addCategory(newCategory)}>Add Category</Button>
        </FormGroup>
        <CategoryList>
          {expenseCategories.map((category) => (
            <CategoryItem key={category.id}>
              {category.name}
              <DeleteButton onClick={() => deleteCategory(category.id)}>Delete</DeleteButton>
            </CategoryItem>
          ))}
        </CategoryList>
      </Section>

      <Section>
        <SectionTitle>Expenses</SectionTitle>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>{expense.category}: {expense.amount}</li>
          ))}
        </ul>
      </Section>
    </Wrapper>
  );
};

export default Budget;
