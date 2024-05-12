/* MAIN */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* PAGES */
import "./global/global.scss";
import Home from "./pages/Home";
import Servers from "./pages/dashboard/Servers";
import Dashboard from "./pages/dashboard/Dashboard";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Error401 from "./pages/errors/Error401";
import Error403 from "./pages/errors/Error403";
import Error404 from "./pages/errors/Error404";

import ProtectedAuth from "./pages/auth/ProtectedAuth";
import ProtectedPermissions from "./pages/auth/ProtectedPermissions";

import PersonalBot from "./pages/dashboard/PersonalBot";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedAuth>
              <Servers />
            </ProtectedAuth>
          }
        />
        <Route
          path="/dashboard/:id"
          element={
            <ProtectedAuth>
              <ProtectedPermissions>
                <Dashboard />
              </ProtectedPermissions>
            </ProtectedAuth>
          }
        />
        <Route
          path="/dashboard/:id/personal-bot"
          element={
            <ProtectedAuth>
              <ProtectedPermissions>
                <PersonalBot />
              </ProtectedPermissions>
            </ProtectedAuth>
          }
        />

        <Route path="/error/401" element={<Error401 />} />
        <Route path="/error/403" element={<Error403 />} />
        <Route path="/error/404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
