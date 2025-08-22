import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Pricing from "./pages/Pricing";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import AllReviewsPage from "./pages/AllReviewsPage";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Main single-page with section scrolling */}
        <Route
          path="/"
          element={
            <main className="container">
              <Home />
              <About />
              <Services />
              <Projects />
              <Pricing />
              <Reviews />
              <Contact />
            </main>
          }
        />
        {/* Separate pages for auth and user areas */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-reviews" element={<AllReviewsPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
