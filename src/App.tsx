import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Nav from "./components/Nav";
import FooterPlay from "./components/FooterPlay";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AppRouter />
      <FooterPlay />
    </BrowserRouter>
  );
}

export default App;
