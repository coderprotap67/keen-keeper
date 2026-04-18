import { useContext, useRef, useState, useEffect } from "react";
import HistoryCard from "../components/unique/timelineComponents/historyCard";
import { TimelineContext } from "../context/TimeLineContext";
import { CircleX } from "lucide-react";
import { TabContext } from "../context/CurrentTabContext";

export default function TimeLine() {
  const { currTimeLine } = useContext(TimelineContext);
  const { setCurrTab } = useContext(TabContext);
  const [filter, setFilter] = useState("all");
  const [timeLineEntries, setTimeLineEntries] = useState(currTimeLine);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrTab("timeline");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = currTimeLine.filter((entry) =>
      entry[2].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTimeLineEntries(filtered);
  };

  const dropdownRef = useRef(null);
  const handleSelect = (value) => {
    setFilter(value);
    dropdownRef.current.removeAttribute("open");
  };

  return (
    <div className="py-10 px-6 md:px-20 bg-[#F8FAFC] flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
          Timeline
        </h1>
        <div className="flex gap-4">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="name"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary bg-green-800 text-white"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
        </div>
      </div>
      <details ref={dropdownRef} className="dropdown">
        <summary className="btn m-1">Filter Timeline</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li
            className={`${filter === "all" ? "bg-green-800 text-white" : ""}`}
          >
            <a onClick={() => handleSelect("all")}>All</a>
          </li>
          <li
            className={`${filter === "Call" ? "bg-green-800 text-white" : ""}`}
          >
            <a onClick={() => handleSelect("Call")}>Call</a>
          </li>
          <li
            className={`${filter === "Video" ? "bg-green-800 text-white" : ""}`}
          >
            <a onClick={() => handleSelect("Video")}>Video Call</a>
          </li>
          <li
            className={`${filter === "Text" ? "bg-green-800 text-white" : ""}`}
          >
            <a onClick={() => handleSelect("Text")}>Text</a>
          </li>
        </ul>
      </details>
      {timeLineEntries.length === 0 ? (
        <div className="hero bg-white p-10 rounded-md">
          <div className="hero-content text-center flex flex-col gap-4">
            <CircleX />
            <h1 className="text-3xl font-bold text-[#1F2937]">
              No Activities Yet
            </h1>
            <p className="text-[#64748B] max-w-xl">
              Interact with friends more to create memories
            </p>
          </div>
        </div>
      ) : (
        timeLineEntries.map(
          (message, index) =>
            (filter === "all" && (
              <HistoryCard key={index} message={message} />
            )) ||
            (filter === "Call" && message[0] === "Call" && (
              <HistoryCard key={index} message={message} />
            )) ||
            (filter === "Video" && message[0] === "Video" && (
              <HistoryCard key={index} message={message} />
            )) ||
            (filter === "Text" && message[0] === "Text" && (
              <HistoryCard key={index} message={message} />
            )),
        )
      )}
    </div>
  );
}
