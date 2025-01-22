import "./App.css";
import Builderpage from "./pages/Builderpage";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/main" element={<Mainpage />} />
          <Route path="/builder/:id" element={<Builderpage/>}/>
          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
