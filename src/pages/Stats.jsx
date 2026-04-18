import { useContext } from "react";
import { TabContext } from "../context/CurrentTabContext";
import { Pie, PieChart, Tooltip } from "recharts";
import { TimelineContext } from "../context/TimeLineContext";
import { useEffect } from "react";
import { CircleX } from "lucide-react";

export default function Status() {
  const { setCurrTab } = useContext(TabContext);
  const { currTimeLine } = useContext(TimelineContext);

  useEffect(() => {
    setCurrTab("stats");
  }, []);

  let call = 0,
    text = 0,
    video = 0;
  currTimeLine.forEach((action) => {
    if (action[0] === "Call") {
      call++;
    } else if (action[0] === "Video") {
      video++;
    } else if (action[0] === "Text") {
      text++;
    }
  });

  const data = [
    { name: "Call", value: call, fill: "#244D3F" },
    { name: "Text", value: text, fill: "#7E35E1" },
    { name: "Video", value: video, fill: "#37A163" },
  ];

  return (
    <div className="py-10 px-6 md:px-20 bg-[#F8FAFC] flex flex-col gap-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
        Friendship Analytics
      </h1>
      <div className="bg-white p-8 rounded-md">
        <p className="font-medium text-xl text-[#244D3F] mb-6">
          By Interaction Type
        </p>
        {call === 0 && video === 0 && text === 0 ? (
          <div className="hero bg-white p-10 rounded-md">
            <div className="hero-content text-center flex flex-col gap-4">
              <CircleX />
              <h1 className="text-3xl font-bold text-[#1F2937]">
                No Stats Yet
              </h1>
              <p className="text-[#64748B] max-w-xl">
                Interact with friends more to create memories
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <PieChart
              style={{
                width: "100%",
                maxWidth: "357px",
                maxHeight: "252px",
                aspectRatio: 1,
              }}
            >
              <Pie
                data={data}
                innerRadius="60%"
                outerRadius="100%"
                cornerRadius="10%"
                paddingAngle={6}
                dataKey="value"
                isAnimationActive={true}
              />
              <Tooltip />
            </PieChart>
          </div>
        )}

        <div className="flex items-center justify-center gap-6 mt-6">
          <span className="flex items-center gap-2 text-[#244D3F] text-sm">
            <span className="w-3 h-3 rounded-full bg-[#7E35E1]"></span>
            Text
          </span>
          <span className="flex items-center gap-2 text-[#244D3F] text-sm">
            <span className="w-3 h-3 rounded-full bg-[#37A163]"></span>
            Video
          </span>
          <span className="flex items-center gap-2 text-[#244D3F] text-sm">
            <span className="w-3 h-3 rounded-full bg-[#244D3F]"></span>
            Call
          </span>
        </div>
      </div>
    </div>
  );
}
