import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CompleteDetailsPage from "./pages/completeDetailsPage";
import DetailsPage from "./pages/detailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DetailsPage />} />
        <Route path="/details" element={<CompleteDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
