import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Parse from 'parse';
import DashboardLayout from './components/layout/DashboardLayout';
import Frame1 from './pages/Frame1';
import Frame2 from './pages/Frame2';
import Frame3 from './pages/Frame3/Frame3';
import Frame4 from './pages/Frame4';
import Login from './pages/Login';
import './App.css';

function App() {
  // State hooks for loading, error, and result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Function to create a new Person 
  async function createPerson() {
    setLoading(true);
    setError(null);
    
    try {
      const PersonObject = Parse.Object.extend("Person");
      const personObject = new PersonObject();
      
      personObject.set("name", "Back4App User");
      
      const result = await personObject.save();
      setResult(`Object created with ID: ${result.id}`);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  // Function to fetch people
  async function fetchPeople() {
    setLoading(true);
    setError(null);
    
    try {
      const PersonObject = Parse.Object.extend("Person");
      const query = new Parse.Query(PersonObject);
  
      const results = await query.find();
      const names = results.map(result => ({
        objectId: result.id,
        name: result.get("name"),
      }));
      
      setResult(`Fetched names: ${JSON.stringify(names, null, 2)}`);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Parse test UI */}
      <h1>Parse Test</h1>
      <button onClick={createPerson} disabled={loading}>Create Person</button>
      <button onClick={fetchPeople} disabled={loading}>Fetch People</button>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && <pre>{result}</pre>}
      
      {/* Routing setup */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="frame1" element={<Frame1 />} />
            <Route path="frame2" element={<Frame2 />} />
            <Route path="frame3" element={<Frame3 />} />
            <Route path="frame4" element={<Frame4 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
