import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* PAGES */
import "./global/global.scss";

// Lazy load all the pages
const Home = lazy(() => import("./pages/Home"));
const Servers = lazy(() => import("./pages/dashboard/Servers"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

const Login = lazy(() => import("./pages/auth/Login"));
const Logout = lazy(() => import("./pages/auth/Logout"));
const Error401 = lazy(() => import("./pages/errors/Error401"));
const Error403 = lazy(() => import("./pages/errors/Error403"));
const Error404 = lazy(() => import("./pages/errors/Error404"));
const ProtectedPermissions = lazy(() =>
  import("./pages/auth/ProtectedPermissions")
);
const ProtectedAuth = lazy(() => import("./pages/auth/ProtectedAuth"));

const Profile = lazy(() => import("./pages/profile/Profile"));

const PersonalBotLogin = lazy(() =>
  import("./pages/dashboard/general/personal-bot/PersonalBotLogin")
);
const PersonalBot = lazy(() =>
  import("./pages/dashboard/general/personal-bot/PersonalBot")
);

const ChatManagment = lazy(() =>
  import("./pages/dashboard/managment/ChatManagment")
);
const Administration = lazy(() =>
  import("./pages/dashboard/managment/Administration")
);
const WelcomeGoodbye = lazy(() =>
  import("./pages/dashboard/managment/WelcomeGoodbye")
);

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route
            path="/profile"
            element={
              <ProtectedAuth>
                <Profile />
              </ProtectedAuth>
            }
          />

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
            path="/dashboard/:id/personal-bot/login"
            element={
              <ProtectedAuth>
                <PersonalBotLogin />
              </ProtectedAuth>
            }
          />

          <Route
            path="/dashboard/:id/personal-bot"
            element={
              <ProtectedAuth>
                <PersonalBot />
              </ProtectedAuth>
            }
          />

          <Route
            path="/dashboard/:id/chat-management"
            element={
              <ProtectedAuth>
                <ProtectedPermissions>
                  <ChatManagment />
                </ProtectedPermissions>
              </ProtectedAuth>
            }
          />
          <Route
            path="/dashboard/:id/administration"
            element={
              <ProtectedAuth>
                <ProtectedPermissions>
                  <Administration />
                </ProtectedPermissions>
              </ProtectedAuth>
            }
          />

          <Route
            path="/dashboard/:id/welcome-message"
            element={
              <ProtectedAuth>
                <ProtectedPermissions>
                  <WelcomeGoodbye />
                </ProtectedPermissions>
              </ProtectedAuth>
            }
          />

          <Route path="/error/401" element={<Error401 />} />
          <Route path="/error/403" element={<Error403 />} />
          <Route path="/error/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
