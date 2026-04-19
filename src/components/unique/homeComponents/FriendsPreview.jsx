import { useContext } from "react";
import { Link } from "react-router";
import { TabContext } from "../../../context/CurrentTabContext"

export default function FriendsPreview({ friend }) 
{
  const status = friend.status.toLowerCase();
  const { setCurrTab } = useContext(TabContext)

  return (
    <Link 
      to={`/friend/${friend.id}`} 
      onClick={() => setCurrTab("none")} 

      className="card bg-white shadow-none border border-slate-100 px-2 py-6 hover:cursor-pointer transition-colors hover:bg-slate-50"
    >
      <figure>
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-20 h-20 rounded-full object-cover"
        />
      </figure>
      <div className="card-body flex flex-col items-center justify-center text-center p-4">

        <h2 className="text-[#1F2937] font-semibold text-xl">{friend.name}</h2>

        <p className="text-[#64748B] text-xs font-medium">{friend.days_since_contact}d</p>
        
        <div className="flex flex-col gap-2 mt-2">

            <div className="badge bg-[#CBFADB] text-[#244D3F] border-0 rounded-full font-medium text-[10px] px-3 py-2">
              {friend.tags[0].toUpperCase()}
            </div>
            
            <div
              className={`badge rounded-full border-0 font-medium text-[10px] px-3 py-2 text-white ${
                status === "on-track" ? "bg-[#244D3F]" : 
                status === "overdue" ? "bg-[#EF4444]" : 
                "bg-[#EFAD44]"
              }`}
            >
              {status.toUpperCase()}
            </div>
        </div>
      </div>
    </Link>
  );
}