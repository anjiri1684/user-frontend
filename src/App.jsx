import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Policy from "./components/Policy";
import RequestCustomBeat from "./components/RequestCustomBeat";
import PrivateRoute from "./pages/PrivateRoute";
import Cart from "./components/Cart";
import Success from "./pages/Success";
import Error from "./pages/Error";
import CheckoutForm from "./components/CheckoutForm";
import BeatList from "./components/BeatList";
import NotFound from "./pages/NotFound";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ContactUs from "./components/ContactUs";
import ForgotPassword from "./pages/Fogotpassword"; // Fix typo in import
import Dashboard from "./components/Dashboad"; // Fix typo in import

const stripePromise = loadStripe(
  "pk_live_51QPoZOP5drFjM1oPZ0cqu5883N4dmRGl0SBrm90S89SDWjsyJyYJhISB6L2LmP2x7PLWMuuOSDUaFhZylU6z3JbP00pHGg72Ko"
);

function App() {
  return (
    <Router>
      {/* Wrap everything in Router */}
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/dashboard" element={<Dashboard />} />{" "}
              {/* Ensure JSX wrapping */}
              <Route path="/policy" element={<Policy />} />
              <Route
                path="/browse-beat"
                element={
                  <PrivateRoute>
                    <BeatList />
                  </PrivateRoute>
                }
              />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route
                path="/custome-beat"
                element={
                  <PrivateRoute>
                    <RequestCustomBeat />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/error" element={<Error />} />
              <Route path="/browse-beat" element={<BeatList />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </CartProvider>
        </Elements>
      </AuthProvider>
    </Router>
  );
}

export default App;
