import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, Header, Capsules, Rockets } from "./Components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/capsules" element={<Capsules />} />
          <Route path="/rockets" element={<Rockets />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
