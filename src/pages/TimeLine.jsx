import { useContext, useRef, useState, useEffect } from "react";
import HistoryCard from "../components/unique/timelineComponents/historyCard";
import { TimelineContext } from "../context/TimeLineContext";
import { CircleX, Filter } from "lucide-react";
import { TabContext } from "../context/CurrentTabContext";

export default function TimeLine() {
  const { currTimeLine } = useContext(TimelineContext);
  const { setCurrTab } = useContext(TabContext);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setCurrTab("timeline");
  }, [setCurrTab]);
  const filteredEntries = currTimeLine.filter((entry) => {
    return filter === "all" || entry[0] === filter;
  });

  const dropdownRef = useRef(null);
  const handleSelect = (value) => {
    setFilter(value);
    dropdownRef.current.removeAttribute("open");
  };

  return (
    <div className="py-10 px-6 md:px-20 bg-[#F8FAFC] flex flex-col gap-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
          Timeline
        </h1>
        

        <details ref={dropdownRef} className="dropdown dropdown-end">
          <summary className="btn bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 normal-case shadow-none rounded-lg gap-2">

            <Filter size={16} /> Filter: {filter === 'all' ? 'All Activities' : filter}
          </summary>

          <ul className="menu dropdown-content bg-white rounded-xl z-10 w-52 p-2 mt-2 border border-slate-100 shadow-xl text-slate-600">

            <li><a className={filter === "all" ? "bg-green-50 text-green-800 font-bold" : ""} onClick={() => handleSelect("all")}>All Activities</a></li>

            <li><a className={filter === "Call" ? "bg-green-50 text-green-800 font-bold" : ""} onClick={() => handleSelect("Call")}>Calls</a></li>

            <li><a className={filter === "Video" ? "bg-green-50 text-green-800 font-bold" : ""} onClick={() => handleSelect("Video")}>Video Calls</a></li>

            <li><a className={filter === "Text" ? "bg-green-50 text-green-800 font-bold" : ""} onClick={() => handleSelect("Text")}>Texts</a></li>
          </ul>
        </details>
      </div>


      <div className="flex flex-col gap-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-white p-16 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-none">

            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <CircleX size={48} className="text-slate-300" />
            </div>

            <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
              No Activities Found
            </h2>

            <p className="text-[#64748B]">
              You haven't made any memories with your friends yet.
            </p>
          </div>

        ) : (
          filteredEntries.map((message, index) => (
            <HistoryCard key={index} message={message} />
          ))
        )}
      </div>
    </div>
  );
}