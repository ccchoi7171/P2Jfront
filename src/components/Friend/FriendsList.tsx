import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSidebar from "../LeftSidebar/LeftSidebar";

interface Friend {
  id: number;
  name: string;
  status: string;
  profileImage: string; // 프로필 이미지 URL 추가
}

interface User {
  profileImage?: string;
  nickname: string;
  email: string;
}

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("/api/friends", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Failed to fetch friends", error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="flex">
      <LeftSidebar
        user={user!}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        setUser={setUser}
      />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">My Friends</h1>
        <ul className="bg-white shadow rounded-lg p-4">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className={`flex items-center p-2 hover:bg-gray-100 rounded ${
                friend.status === "online" ? "text-green-500" : "text-red-500"
              }`}
            >
              {friend.profileImage && (
                <img
                  src={friend.profileImage}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
              )}
              <span>
                {friend.name} - {friend.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
