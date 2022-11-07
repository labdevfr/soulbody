import React, {useState} from "react";
import './App.css';
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
        <AppRouter/>
    </div>
  );
}

export default App;
