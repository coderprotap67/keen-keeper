import { useContext } from "react";
import { Link } from "react-router";
import { TabContext } from "../../../context/CurrentTabContext"

export default function FriendsPreview({ friend }) {
  const status = friend.status;
  const { setCurrTab } = useContext(TabContext)

  return (
    <Link to={`/friend/${friend.id}`} onClick={() => setCurrTab("none")} className="card bg-base-100 shadow-sm px-2 py-6 hover:cursor-pointer">
      <figure>
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-20 h-20 rounded-full"
        />
      </figure>
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h2 className="text-[#1F2937] font-semibold text-xl">{friend.name}</h2>
        <p className="text-[#64748B] text-xs">{friend.days_since_contact}d</p>
        <div className="badge bg-[#CBFADB] text-[#244D3F] rounded-full font-medium text-xs">
          {friend.tags[0].toUpperCase()}
        </div>
        <div
          className={`badge rounded-full ${status === "on-track" ? "bg-[#244D3F]" : status === "overdue" ? "bg-[#EF4444]" : "bg-[#EFAD44]"} font-medium text-xs text-white`}
        >
          {status.toUpperCase()}
        </div>
      </div>
    </Link>
  );
}
