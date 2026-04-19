import { MoveLeft } from "lucide-react";
import { Link } from "react-router";

export default function Error() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold">404 Not Found!</h1>
          <p className="text-[#64748B] max-w-xl pt-2 pb-6">
            The page you looking for doesn't exists. Please check the url or go
            to home
          </p>
          <Link to="/">
            <button className="btn btn-primary text-base font-semibold bg-green-800 text-white mt-4">
              <MoveLeft /> Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
