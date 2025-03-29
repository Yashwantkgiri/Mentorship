import React, { useState, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// Common Components
import NavBar from "./components/home/NavBar";
import Footer from "./components/home/Footer";
import Home from "./components/home/Home";
import LoginRegistration from "./components/login/LoginRegistration";

// Lazy-loaded Pages
const LazyAbout = React.lazy(() => import("./components/about/About"));
const LazyBlog = React.lazy(() => import("./components/blog/Blog"));
const LazyMyAccount = React.lazy(() => import("./components/account/MyAccount"));
const LazyMentors = React.lazy(() => import("./components/mentorspage/Mentors"));
const MentorDashboard = React.lazy(() => import("./components/dashboard/MentorDashboard"));
const MenteeDashboard = React.lazy(() => import("./components/dashboard/MenteeDashboard"));

// Loader Component
const Loader = () => (
  <div className="ui segment">
    <div className="ui active loader"></div>
    <h2>Hang in there...</h2>
  </div>
);

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLogin(true);
    navigate("/login");
  };

  const handleLoginForm = () => {
    setLogin(false);
    navigate("/");
  };

  return (
    <>
      <NavBar handleClick={handleLoginClick} />
      <hr />
      <Routes>
        <Route path="/" element={<Home handleClick={handleLoginClick} />} />

        <Route path="/login" element={<LoginRegistration handleLoginForm={handleLoginForm} />} />

        <Route
          path="/about"
          element={
            <Suspense fallback={<Loader />}>
              <LazyAbout />
            </Suspense>
          }
        />

        <Route
          path="/blog"
          element={
            <Suspense fallback={<Loader />}>
              <LazyBlog />
            </Suspense>
          }
        />

        <Route
          path="/mentors"
          element={
            <Suspense fallback={<Loader />}>
              <LazyMentors handleLoginClick={handleLoginClick} />
            </Suspense>
          }
        />

        <Route
          path="/account"
          element={
            <Suspense fallback={<Loader />}>
              <LazyMyAccount />
            </Suspense>
          }
        />

        <Route
          path="/mentor-dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <MentorDashboard />
            </Suspense>
          }
        />

        <Route
          path="/mentee-dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <MenteeDashboard />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
