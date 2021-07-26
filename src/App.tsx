import React from 'react';
import logo from './logo.svg';
import './App.css';
import WhatToEat from "./components/WhatToEat";

function App() {
  return (
    <div className='App'>
      {/* <div className='bg-green-400 hover:bg-red-400 px-10 py-20 max-w-sm mx-auto text-white text-lg rounded-xl shadow-lg cursor-pointer'>
        Tailwind
      </div>

      <button className='bg-blue-600 hover:bg-blue-700 px-10 py-5 my-5 text-gray-100 rounded-full'>
        Tailwind
      </button> */}
      <WhatToEat />
    </div>
  );
}

export default App;
