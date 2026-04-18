import StatusCard from "./StatusCard";

export default function StatusContainer({
  total,
  ontrack,
  attention,
  thisMonth,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <StatusCard number={total} text="Total Friends"></StatusCard>
      <StatusCard number={ontrack} text="On Track"></StatusCard>
      <StatusCard number={attention} text="Needed Attention"></StatusCard>
      <StatusCard
        number={thisMonth}
        text="Interactions This Month"
      ></StatusCard>
    </div>
  );
}
