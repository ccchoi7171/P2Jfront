import React, { useRef, ChangeEvent } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface FileUploadButtonProps {
  setProfileImageFile: (file: File | null) => void;
  setPreviewImageURL: (url: string) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  setProfileImageFile,
  setPreviewImageURL,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProfileImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImageURL(objectUrl);
    }
  };

  return (
    <div className="mb-5">
      <label className="block mb-2 font-medium">프로필 이미지</label>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center w-full max-w-[300px] bg-[#d9d9d9] text-gray-700 px-5 py-3 rounded-lg font-medium text-base shadow-md hover:bg-[#979797] hover:-translate-y-[2px] hover:shadow-lg transition-all"
      >
        <FaCloudUploadAlt className="mr-2 text-lg" />
        이미지 업로드
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUploadButton;