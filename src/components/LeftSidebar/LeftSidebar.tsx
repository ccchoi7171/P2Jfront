import React from "react";
import SidebarTab from "./SidebarTab";
import CategoryList from "./CategoryList";
import SidebarFooter from "./SidebarFooter";
import CategoryCheckbox from "./CategoryCheckbox";
import { X, Menu, PlusCircle, Sparkles, Star, Archive, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MemberUpdate from "../Modal/MemberUpdate";

interface Props {
  user: { profileImage?: string; nickname: string; email: string };
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const LeftSidebar: React.FC<Props> = ({ user, isCollapsed, setIsCollapsed }) => {
  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false); // 모달 상태 추가
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState([
    { id: 1, label: "Red", color: "#FF4D49", checked: true },
    { id: 2, label: "Orange", color: "#FFA100", checked: true },
    { id: 3, label: "Yellow", color: "#FFE000", checked: true },
    { id: 4, label: "Green", color: "#00DE2E", checked: true },
    { id: 5, label: "Blue", color: "#0099FF", checked: true },
    { id: 6, label: "Purple", color: "#E769FF", checked: true },
    { id: 7, label: "Gray", color: "#929297", checked: true },
  ]);

  const toggleCategory = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/members/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        alert("로그아웃 되었습니다."); // 팝업 알림 추가
        navigate("/");
        window.location.reload(); // 세션 초기화용
      } else {
        console.error("로그아웃 실패 - 상태코드:", res.status);
        alert("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("오류가 발생했습니다.");
    }
  };
  

  // 접혔을 경우
  if (isCollapsed) {
    return (
      <>
        <aside className="w-[80px] h-screen bg-white shadow-lg rounded-tr-[30px] flex flex-col items-center relative transition-[width] duration-300 origin-left pt-4 pb-6">
          <button
            onClick={toggleCollapse}
            className="w-12 h-6 flex items-center justify-center mb-4"
          >
            <Menu className="w-6 h-6 text-[#444]" />
          </button>

          <hr className="border-gray-300 w-[48px] mb-4" />

          <div className="flex flex-col gap-1 items-center mb-20">
            <SidebarTab
              icon={<PlusCircle size={18} />}
              label="New Event"
              active={activeTab === "new"}
              isCollapsed
              onClick={() => {
                setActiveTab("new");
                console.log("일정 생성 모달 열기");
              }}
            />
            <SidebarTab
              icon={<Star size={18} />}
              label="Important"
              active={activeTab === "important"}
              isCollapsed
              onClick={() => {
                setActiveTab("important");
                console.log("중요 이벤트 보기");
              }}
            />
            <SidebarTab
              icon={<Sparkles size={18} />}
              label="AI Suggestion"
              active={activeTab === "ai"}
              isCollapsed
              onClick={() => {
                setActiveTab("ai");
                console.log("AI 추천 보기");
              }}
            />
            <SidebarTab
              icon={<Archive size={18} />}
              label="Archive"
              active={activeTab === "archive"}
              isCollapsed
              onClick={() => {
                setActiveTab("archive");
                console.log("보관함 보기");
              }}
            />
            <SidebarTab
              icon={<Users size={18} />}
              label="Friends"
              active={activeTab === "friends"}
              isCollapsed
              onClick={() => {
                setActiveTab("friends");
                console.log("친구 관리");
              }}
            />
          </div>

          <hr className="border-gray-300 w-[48px] mb-6" />

          <div className="flex flex-col items-center gap-2 mb-3">
            {categories.map((cat) => (
              <CategoryCheckbox
                key={cat.id}
                label=""
                color={cat.color}
                checked={cat.checked}
                onChange={() => toggleCategory(cat.id)}
              />
            ))}
          </div>
          <hr className="border-gray-300 w-[48px] mb-4" />

          <div className="mt-auto mb-0">
            {user?.profileImage && (
              <img
                src={user.profileImage}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                onClick={() => setIsEditModalOpen(true)} // 클릭 시 모달 오픈
              />
            )}
          </div>
        </aside>

        {isEditModalOpen && (
          <MemberUpdate
            user={user}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <aside className="fixed top-0 left-0 z-50 w-[320px] h-screen bg-white flex flex-col border-r border-gray-300 shadow-md rounded-tr-[20px] overflow-hidden transition-[width] duration-300 origin-left">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/P2J.png" alt="logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-[#C26767] drop-shadow">P2J</span>
          </div>
          <X className="w-6 h-6 text-gray-500 cursor-pointer" onClick={toggleCollapse} />
        </div>

        <hr className="border-gray-300 mx-4" />

        <div className="flex flex-col px-4 py-2 gap-1">
          <SidebarTab
            icon={<PlusCircle size={18} />}
            label="New Event"
            active={activeTab === "new"}
            isCollapsed={false}
            onClick={() => {
              setActiveTab("new");
              console.log("일정 생성 모달 열기");
            }}
          />
          <SidebarTab
            icon={<Star size={18} />}
            label="Important"
            active={activeTab === "important"}
            isCollapsed={false}
            onClick={() => {
              setActiveTab("important");
              console.log("중요 이벤트 보기");
            }}
          />
          <SidebarTab
            icon={<Sparkles size={18} />}
            label="AI Suggestion"
            active={activeTab === "ai"}
            isCollapsed={false}
            onClick={() => {
              setActiveTab("ai");
              console.log("AI 추천 보기");
            }}
          />
          <SidebarTab
            icon={<Archive size={18} />}
            label="Archive"
            active={activeTab === "archive"}
            isCollapsed={false}
            onClick={() => {
              setActiveTab("archive");
              console.log("보관함 보기");
            }}
          />
          <SidebarTab
            icon={<Users size={18} />}
            label="Friends"
            active={activeTab === "friends"}
            isCollapsed={false}
            onClick={() => {
              setActiveTab("friends");
              console.log("친구 관리 보기");
            }}
          />
        </div>

        <hr className="border-gray-300 mx-4 mt-14 mb-1" />

        <div className="px-4">
          <div className="flex items-center text-gray-600 text-sm font-medium gap-1 mb-1">
            <span className="material-icons text-[16px]">category</span>
          </div>
          <CategoryList categories={categories} onToggle={toggleCategory} />
        </div>

        <hr className="border-gray-300 mx-4 mt-1 mb-2" />

        <div className="mt-auto px-4 pb-4">
          <div className="flex items-center justify-between">
            <SidebarFooter
              profileImage={user?.profileImage}
              nickname={user?.nickname}
              email={user?.email}
              onProfileClick={() => setIsEditModalOpen(true)} // 클릭 전달
            />
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="text-[13px] text-[#888] underline hover:text-[#555]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isEditModalOpen && (
        <MemberUpdate
          user={user}
          onClose={() => setIsEditModalOpen(false)}
       />
      )}
    </>
  );
};

export default LeftSidebar;