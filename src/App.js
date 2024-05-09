/* MAIN */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* PAGES */
import "./global/global.scss";
import Home from "./pages/Home";
import Servers from "./pages/dashboard/Servers";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Error401 from "./pages/errors/Error401";

import ProtectedAuth from "./pages/auth/ProtectedAuth";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/error401" element={<Error401 />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedAuth>
              <Servers />
            </ProtectedAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
