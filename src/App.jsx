import React from "react";
import Navbar from "./Components/navbar";
import logo from "./logo.svg";
import "./App.css";
import Market from "./Components/Market";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container mt-5">
        <Market />
      </main>
    </React.Fragment>
  );
}

export default App;
