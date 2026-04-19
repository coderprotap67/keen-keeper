import {
  Trash,
  Archive,
  BellMinus,
  PhoneCall,
  MessageSquareMore,
  Video,
  Edit2,
} from "lucide-react";
import { use, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { TimelineContext } from "../context/TimeLineContext";
import { TabContext } from "../context/CurrentTabContext";
import { toast } from "react-toastify";

const friendsPromise = fetch("/friends.json").then((res) => res.json());

export default function FriendDetails() {
  const friends = use(friendsPromise);
  const { id } = useParams();

  const expectedFriend = friends.find((friend) => friend.id == id);
  const status = expectedFriend.status.toLowerCase();

  const { currTimeLine, setCurrTimeLine } = useContext(TimelineContext);
  const { setCurrTab } = useContext(TabContext);

  useEffect(() => {
    setCurrTab("");
  }, [setCurrTab]);

  const getFormattedDate = () => {
    const now = new Date();
    return now
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
  };

  const handleCall = () => {
    const date = getFormattedDate();
    const newMessage = ["Call", date, expectedFriend.name];
    toast.success(`Call with ${expectedFriend.name}`);
    setCurrTimeLine([...currTimeLine, newMessage]);
  };

  const handleText = () => {
    const date = getFormattedDate();
    const newMessage = ["Text", date, expectedFriend.name];
    toast.success(`Text with ${expectedFriend.name}`);
    setCurrTimeLine([...currTimeLine, newMessage]);
  };

  const handleVideoCall = () => {
    const date = getFormattedDate();
    const newMessage = ["Video", date, expectedFriend.name];
    toast.success(`Video with ${expectedFriend.name}`);
    setCurrTimeLine([...currTimeLine, newMessage]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-10 px-6 md:px-10 lg:px-20 bg-[#F8FAFC] gap-6 min-h-screen">
      {/* বাম পাশের প্রোফাইল সেকশন */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 p-8 shadow-none">
          <img
            src={expectedFriend.picture}
            alt={expectedFriend.name}
            className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-slate-50"
          />
          <h2 className="text-[#1F2937] font-bold text-xl mb-1 text-center">
            {expectedFriend.name}
          </h2>
          
          <div className={`badge rounded-full border-0 px-4 py-1 text-[10px] font-bold text-white mb-3 ${
            status === "on-track" ? "bg-[#244D3F]" : status === "overdue" ? "bg-[#EF4444]" : "bg-[#EFAD44]"
          }`}>
            {status.toUpperCase()}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {expectedFriend.tags.map((tag, index) => (
              <div key={index} className="badge bg-[#CBFADB] text-[#244D3F] border-0 rounded-full font-medium text-[10px] px-3">
                {tag.toUpperCase()}
              </div>
            ))}
          </div>

          <p className="text-[#64748B] font-medium mt-4 italic text-center text-sm">
            "{expectedFriend.bio}"
          </p>
          <p className="text-[#94A3B8] text-xs mt-3 text-center">
            Email: {expectedFriend.email}
          </p>
        </div>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col gap-2">
          <button className="btn bg-white border border-slate-200 shadow-none hover:bg-slate-50 normal-case font-medium text-slate-600">
            <BellMinus size={18} /> Snooze 2 weeks
          </button>
          <button className="btn bg-white border border-slate-200 shadow-none hover:bg-slate-50 normal-case font-medium text-slate-600">
            <Archive size={18} /> Archive
          </button>
          <button className="btn bg-[#FFF1F2] border border-rose-100 shadow-none hover:bg-rose-100 normal-case font-bold text-rose-600">
            <Trash size={18} /> Delete
          </button>
        </div>
      </div>

      {/* ডান পাশের স্ট্যাটস এবং কুইক চেক-ইন */}
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 flex flex-col items-center justify-center rounded-xl border border-slate-200 shadow-none text-center">
            <h2 className="text-[#244D3F] font-bold text-3xl">
              {expectedFriend.days_since_contact}
            </h2>
            <p className="text-[#64748B] text-sm mt-1">Days Since Contact</p>
          </div>
          <div className="bg-white p-6 flex flex-col items-center justify-center rounded-xl border border-slate-200 shadow-none text-center">
            <h2 className="text-[#244D3F] font-bold text-3xl">
              {expectedFriend.goal}
            </h2>
            <p className="text-[#64748B] text-sm mt-1">Goal (Days)</p>
          </div>
          <div className="bg-white p-6 flex flex-col items-center justify-center rounded-xl border border-slate-200 shadow-none text-center">
            <h2 className="text-[#244D3F] font-bold text-2xl">
              {expectedFriend.next_due_date}
            </h2>
            <p className="text-[#64748B] text-sm mt-1">Next Due</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6 shadow-none relative">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[#244D3F] font-bold text-xl">Relationship Goal</h4>
            <button className="btn btn-ghost btn-sm bg-slate-50 border border-slate-200 hover:bg-slate-100">
              <Edit2 size={14} className="text-slate-600" />
            </button>
          </div>
          <p className="text-[#64748B]">
            Connect every <span className="text-slate-900 font-bold">{expectedFriend.goal} days</span>
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-none">
          <h4 className="text-[#244D3F] font-bold text-xl mb-6">Quick Check-In</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              className="btn bg-[#F8FAFC] border border-slate-100 h-32 flex flex-col gap-3 p-4 hover:bg-slate-100 transition-all normal-case font-semibold text-slate-600 shadow-none"
              onClick={handleCall}
            >
              <PhoneCall size={28} /> Call
            </button>
            <button
              className="btn bg-[#F8FAFC] border border-slate-100 h-32 flex flex-col gap-3 p-4 hover:bg-slate-100 transition-all normal-case font-semibold text-slate-600 shadow-none"
              onClick={handleText}
            >
              <MessageSquareMore size={28} /> Text
            </button>
            <button
              className="btn bg-[#F8FAFC] border border-slate-100 h-32 flex flex-col gap-3 p-4 hover:bg-slate-100 transition-all normal-case font-semibold text-slate-600 shadow-none"
              onClick={handleVideoCall}
            >
              <Video size={28} /> Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}