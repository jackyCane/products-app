import {Routes, Route} from "react-router-dom";
import {Main} from "./components/Main";
import {ProductPage} from "./components/ProductPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/products/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
