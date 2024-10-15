import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import { Fragment } from "react";
"";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
