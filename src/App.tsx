import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PizzaForm from "./pages/PizzForm/pizzaForm";
import MainDisplay from "./pages/MainDisplay/MainDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaForm />} />
        <Route path="/order" element={<MainDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
