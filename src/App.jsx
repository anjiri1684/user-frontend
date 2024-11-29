import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import Error from "./pages/Error";
import Policy from "./components/Policy";
import RequestCustomBeat from "./components/RequestCustomBeat";
import PrivateRoute from "./pages/PrivateRoute"; // import PrivateRoute
import BeatList from "./components/BeatList";

const stripePromise = loadStripe(
  "pk_test_51QLKzfJCJvofUhZ4AlEJEzPyEK1NZoUfSflOvHhnsnWimWbLC9oOHQiO6Nca3Fa8EdOhAVFz5vGQst9geRGRKeq500PJpHERxp"
);

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <PrivateRoute path="/dashboard" element={<Dashboard />} />{" "} */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Protect Dashboard */}
          <Route path="/policy" element={<Policy />} />
          <Route path="/custom-beat-request" element={<RequestCustomBeat />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
          <Route path="/browse-beat" element={<BeatList />} />
        </Routes>
        <Footer />
      </Elements>
    </Router>
  );
}

export default App;
