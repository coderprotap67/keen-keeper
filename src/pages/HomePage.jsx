import { useContext, useEffect, useState } from "react";
import FriendsContainer from "../components/unique/homeComponents/FriendsContainer";
import Hero from "../components/unique/homeComponents/Hero";
import StatusContainer from "../components/unique/homeComponents/StatusContainer";
import { TabContext } from "../context/CurrentTabContext";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  const { setCurrTab } = useContext(TabContext);

  useEffect(() => {
    setCurrTab("home");

    const loadFriends = async () => {
      try {
        const res = await fetch("/friends.json");
        const data = await res.json();
        setFriends(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadFriends();
  }, []);

  let total = 0, ontrack = 0, attention = 0, thisMonth = 0;

  friends.forEach((friend) => {
    total++;

    if (friend.status === "on-track") {
      ontrack++;
    } else if (friend.status === "almost due" || friend.status === "overdue") {
      attention++;
    }

    if (Number(friend.days_since_contact) < 31) {
      thisMonth++;
    }
  });

  return (
    <main className="py-20 md:py-32 px-6 md:px-20 bg-[#F8FAFC]">
      <Hero></Hero>
      <StatusContainer
        total={total}
        ontrack={ontrack}
        attention={attention}
        thisMonth={thisMonth}
      ></StatusContainer>
      <div className="divider my-10"></div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <FriendsContainer friends={friends}></FriendsContainer>
      )}
    </main>
  );
}
