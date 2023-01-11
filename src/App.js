import React from 'react';
import { getCategories } from './services/api';

function App() {
  getCategories().then((response) => console.log(response));

  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
