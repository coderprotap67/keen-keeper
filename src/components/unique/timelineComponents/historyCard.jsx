import Call from "../../../assets/call.png"
import Text from "../../../assets/text.png"
import Video from "../../../assets/video.png"

export default function HistoryCard({ message }) {
  const [task, date, name] = message;

  return (
    <div className="bg-white p-4 rounded-md flex items-center gap-4">
      <img src={task === "Call" ? Call : task === "Text" ? Text : Video} alt={task === "Call" ? "Call Icon" : task === "Text" ? "Text Icon ": "Video Icon"} />
      <div>
        <p className="text-lg text-[#64748B]">
          <span className="font-bold text-black">{task}</span> with {name}
        </p>
        <p className="text-[#64748B] font-medium">{date}</p>
      </div>
    </div>
  );
}
