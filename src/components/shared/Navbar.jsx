import { History, House, ChartSpline } from "lucide-react";
import { Link } from "react-router";
import { TabContext } from "../../context/CurrentTabContext";
import { useContext } from "react";

import Logo from "../../assets/logo.png"

export default function Navbar() {
  const { currTab, setCurrTab } = useContext(TabContext);

  return (
    <div className="navbar bg-white px-6 md:px-20 py-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
      <div>
        <Link to="/" onClick={() => setCurrTab("home")} className="text-2xl font-semibold text-[#244D3F]">
          <img src={Logo} alt="KeenKeeper Logo" />
        </Link>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setCurrTab("home")}>
          <Link
            to="/"
            className={`btn font-semibold shadow-none border-0 ${currTab === "home" ? "bg-green-800 text-white" : "bg-white text-[#64748B]"}`}
          >
            <House /> Home
          </Link>
        </button>

        <button onClick={() => setCurrTab("timeline")}>
          <Link
            to="/timeline"
            className={`btn font-semibold shadow-none border-0 ${currTab === "timeline" ? "bg-green-800 text-white" : "bg-white text-[#64748B]"}`}
          >
            <History /> Timeline
          </Link>
        </button>

        <button onClick={() => setCurrTab("stats")}>
          <Link
            to="/stats"
            className={`btn font-semibold shadow-none border-0 ${currTab === "stats" ? "bg-green-800 text-white" : "bg-white text-[#64748B]"}`}
          >
            <ChartSpline /> Stats
          </Link>
        </button>
      </div>
    </div>
  );
}