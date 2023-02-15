import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, Header, Capsules } from "./Components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/capsules" element={<Capsules />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
