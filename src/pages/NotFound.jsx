/* 404.jsx */
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Please check the
        URL or return to the homepage.
      </p>
      <Link to="/" className="mt-6 text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
