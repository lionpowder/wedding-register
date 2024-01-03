import * as React from "react";

import { pages } from "./utils/pageUtil";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import ConfirmScreen from "./confirmScreen";
import MainApp from "./mainApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />}>
          {pages.map((page) => (
            <Route key={page.title} path={page.path} element={page.content} />
          ))}
        </Route>
        <Route path="/confirm" element={<ConfirmScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
