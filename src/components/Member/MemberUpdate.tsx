import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileUploadButton from "../buttons/FileUploadButton";

interface Props {
  user: {
    profileImage?: string;
    nickname: string;
    email: string;
  };
  onClose: () => void;
}

const MemberUpdateModal: React.FC<Props> = ({ user, onClose }) => {
  const navigate = useNavigate();
  const [nickname] = useState(user.nickname);
  const [email] = useState(user.email);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const [currentProfileImageURL, setCurrentProfileImageURL] = useState(
    user.profileImage || ""
  );

  useEffect(() => {
    return () => {
      if (previewImageURL) URL.revokeObjectURL(previewImageURL);
    };
  }, [previewImageURL]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("email", email);
    if (profileImageFile) formData.append("profileImage", profileImageFile);

    try {
      const res = await axios.put(
        "http://localhost:8080/api/members",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.profileImage)
        setCurrentProfileImageURL(res.data.profileImage);
      alert("회원 정보가 수정되었습니다.");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      alert("회원 정보 수정에 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말로 회원탈퇴 하시겠습니까? 😥");
    if (!confirmed) return;

    try {
      await axios.delete("http://localhost:8080/api/members", {
        withCredentials: true,
      });

      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("회원탈퇴 실패:", err);
      alert("회원탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[520px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            회원 정보 수정
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              닉네임
            </label>
            <p className="w-full px-4 py-2 border rounded-md bg-gray-50">
              {nickname}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <p className="w-full px-4 py-2 border rounded-md bg-gray-50">
              {email}
            </p>
          </div>

          {currentProfileImageURL && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                현재 프로필 사진
              </p>
              <img
                src={currentProfileImageURL}
                alt="Profile"
                className="w-48 h-48 object-cover rounded-xl border"
              />
            </div>
          )}

          <FileUploadButton
            setProfileImageFile={setProfileImageFile}
            setPreviewImageURL={setPreviewImageURL}
          />

          {previewImageURL && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">미리보기</p>
              <img
                src={previewImageURL}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl border"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          {/* 왼쪽 - 정보 수정 버튼 */}
          <button
            onClick={handleUpdate}
            className="bg-[#C69788] text-white px-4 py-2 rounded-md hover:bg-[#AF8678] transition"
          >
            정보 수정
          </button>

          {/* 로그아웃 + 회원탈퇴 */}
          <div className="flex gap-4">
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/members/logout", {
                    method: "POST",
                    credentials: "include",
                  });
                  if (res.ok) {
                    alert("로그아웃 되었습니다.");
                    window.location.href = "/";
                  } else {
                    alert("로그아웃 실패!");
                  }
                } catch (error) {
                  console.error("Logout error:", error);
                  alert("오류 발생");
                }
              }}
              className="text-sm text-[#888] underline hover:text-[#555]"
            >
              로그아웃
            </button>
            <button
              onClick={() => {
                const confirmed =
                  window.confirm("정말로 회원탈퇴 하시겠습니까?");
                if (confirmed) handleDeleteAccount();
              }}
              className="text-sm text-[#888] underline hover:text-[#555]"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberUpdateModal;
