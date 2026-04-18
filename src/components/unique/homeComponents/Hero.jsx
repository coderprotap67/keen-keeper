import { Plus } from "lucide-react";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content text-center flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1F2937]">
          Friends to keep close in your life
        </h1>
        <p className="text-[#64748B] max-w-xl">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <button className="btn btn-primary text-base font-semibold bg-green-800 text-white mt-4">
          <Plus /> Add a friend
        </button>
      </div>
    </div>
  );
}
