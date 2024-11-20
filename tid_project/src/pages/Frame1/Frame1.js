import { WhiteBackground } from '../../components/layout/Layout.styles';
import React, { useState } from 'react';

const Frame1 = () => {
  const [balance, setBalance] = useState(1000); // Startværdi for kontobalance
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState(['Mad', 'Transport', 'Underholdning', 'Andet']);
  const [form, setForm] = useState({ category: '', amount: '' });
  const [newCategory, setNewCategory] = useState('');

  // Håndter ændringer i input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Håndter ændringer i input for ny kategori
  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Tilføj en udgift
  const addExpense = (e) => {
    e.preventDefault();
    const { category, amount } = form;

    if (!category || !amount || isNaN(amount) || amount <= 0) {
      alert('Udfyld venligst alle felter korrekt.');
      return;
    }

    const newExpense = { category, amount: parseFloat(amount) };
    setExpenses([...expenses, newExpense]);
    setBalance(balance - parseFloat(amount)); // Opdater balancen
    setForm({ category: '', amount: '' }); // Nulstil formular
  };

  // Tilføj ny udgiftstype
  const addCategory = (e) => {
    e.preventDefault();
    if (newCategory && !expenseCategories.includes(newCategory)) {
      setExpenseCategories([...expenseCategories, newCategory]);
      setNewCategory('');
    } else {
      alert('Kategorien eksisterer allerede eller er tom.');
    }
  };

  return (
    <WhiteBackground>
      <div style={{ padding: '20px' }}>
        <h1>Økonomisk Overblik</h1>

        {/* Kontobalance */}
        <div style={{
          marginBottom: '20px',
          padding: '10px',
          background: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Kontobalance:</span>
          <span style={{ fontWeight: 'bold', color: '#28a745' }}>
            {balance.toFixed(2)} kr.
          </span>
        </div>

        {/* Tilføj udgift */}
        <form onSubmit={addExpense} style={{ marginBottom: '20px' }}>
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            >
              <option value="">Vælg kategori</option>
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
              placeholder="Beløb (kr.)"
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
            Tilføj Udgift
          </button>
        </form>

        {/* Tilføj ny kategori */}
        <form onSubmit={addCategory} style={{ marginBottom: '20px' }}>
          <h3>Tilføj ny udgiftstype</h3>
          <input
            type="text"
            value={newCategory}
            onChange={handleCategoryChange}
            placeholder="Ny kategori"
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
            Tilføj Kategori
          </button>
        </form>

        {/* Udgiftsoversigt */}
        <div>
          <h2>Udgifter</h2>
          {expenses.length === 0 ? (
            <p>Ingen udgifter endnu.</p>
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
