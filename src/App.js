import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Capsules, Rockets } from "./Components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Capsules />} />
          <Route path="/rockets" element={<Rockets />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
