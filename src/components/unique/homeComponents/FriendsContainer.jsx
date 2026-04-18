import FriendsPreview from "./FriendsPreview";

export default function FriendsContainer({ friends }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-[#1F2937] mb-4">
        Your Friends
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {friends.map((friend) => (
          <FriendsPreview key={friend.id} friend={friend}></FriendsPreview>
        ))}
      </div>
    </div>
  );
}
