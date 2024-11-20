import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Parse from 'parse';

Parse.initialize("BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P", "Tf7tdCcH6j3YCJkzRJp05VcLIddIzGtbAs6rGruN");
Parse.serverURL = 'https://parseapi.back4app.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);