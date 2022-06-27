import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Clock from './Clock';

function App() {
  return (
    <div className="App">
      <header>
        <BrowserRouter>
          <Routes>
            <Route exact path='*' element={<Clock />}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
    );
}

export default App;
