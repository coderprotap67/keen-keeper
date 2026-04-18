import {
  Trash,
  Archive,
  BellMinus,
  PhoneCall,
  MessageSquareMore,
  Video,
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
  const status = expectedFriend.status;

  const { currTimeLine, setCurrTimeLine } = useContext(TimelineContext);
  const { setCurrTab } = useContext(TabContext);
  useEffect(() => {
    setCurrTab("");
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-3 py-10 px-6 md:px-10 lg:px-20 bg-[#F8FAFC] gap-4">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-6">
          <img
            src={expectedFriend.picture}
            alt={expectedFriend.name}
            className="w-20 h-20 rounded-full mb-5"
          />
          <h2 className="text-[#1F2937] font-semibold text-lg lg:text-xl mb-1 text-center">
            {expectedFriend.name}
          </h2>
          <div
            className={`badge rounded-full ${status === "on-track" ? "bg-[#244D3F]" : status === "overdue" ? "bg-[#EF4444]" : "bg-[#EFAD44]"} font-medium text-xs text-white`}
          >
            {status.toUpperCase()}
          </div>
          <div className="flex flex-row md:flex-col lg:flex-row gap-2 md:gap-0 lg:gap-2 items-center justify-center">
            {expectedFriend.tags.map((tag, index) => (
              <div
                key={index}
                className="badge bg-[#CBFADB] text-[#244D3F] rounded-full font-medium text-xs mt-2 mb-3 md:mb-0 lg:mb-3"
              >
                {tag.toUpperCase()}
              </div>
            ))}
          </div>
          <p className="text-[#64748B] font-medium mt-3 italic text-center text-sm lg:text-base">
            "{expectedFriend.bio}"
          </p>
          <p className="text-[#64748B] text-sm mt-2 text-center">
            Email: {expectedFriend.email}
          </p>
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <button className="btn bg-white rounded-md">
            <BellMinus /> Snooze 2 weeks
          </button>
          <button className="btn bg-white rounded-md">
            <Archive /> Archive
          </button>
          <button className="btn btn-error text-white rounded-md">
            <Trash /> Delete
          </button>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 flex flex-col items-center justify-center rounded-lg gap-2 text-center">
            <h2 className="text-[#244D3F] font-semibold text-lg lg:text-[22px]">
              {expectedFriend.days_since_contact}
            </h2>
            <p className="text-[#64748B] text-sm lg:text-lg">
              Days Since Contact
            </p>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center rounded-lg gap-2 text-center">
            <h2 className="text-[#244D3F] font-semibold text-lg lg:text-[22px]">
              {expectedFriend.goal}
            </h2>
            <p className="text-[#64748B] text-sm lg:text-lg">Goal (Days)</p>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center rounded-lg gap-2 text-center">
            <h2 className="text-[#244D3F] font-semibold text-lg lg:text-[22px]">
              {expectedFriend.next_due_date}
            </h2>
            <p className="text-[#64748B] text-sm lg:text-lg">Next Due</p>
          </div>
        </div>
        <div className="bg-white rounded-md p-6 mb-6">
          <div className="flex justify-between">
            <h4 className="text-[#244D3F] font-medium text-xl">
              Relationship Goal
            </h4>
            <button className="btn">Edit</button>
          </div>
          <p className="text-[#64748B] mt-4">
            Connect every{" "}
            <span className="text-black font-bold">
              {expectedFriend.goal} days
            </span>
          </p>
        </div>
        <div className="bg-white rounded-md p-6">
          <h4 className="text-[#244D3F] font-medium text-xl">
            Quick Check-In
            <div className="grid grid-cols-3 gap-4 mt-4">
              <button
                className="btn bg-[#f8fafc] h-28 text-xl flex flex-col gap-2 p-4"
                onClick={handleCall}
              >
                <PhoneCall /> Call
              </button>
              <button
                className="btn bg-[#f8fafc] h-28 text-xl flex flex-col gap-2 p-4"
                onClick={handleText}
              >
                <MessageSquareMore /> Text
              </button>
              <button
                className="btn bg-[#f8fafc] h-28 text-xl flex flex-col gap-2 p-4"
                onClick={handleVideoCall}
              >
                <Video /> Video
              </button>
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
}
