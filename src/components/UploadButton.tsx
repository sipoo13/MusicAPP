import { Camera } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

function UploadButton() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <label className="absolute text-black bg-[#efe3e2] hover:bg-[#ffffff] px-4 top-[8%] right-[3%] rounded-sm">
      <div className="flex items-center">
        <Camera className="w-4 h-4" />
        <p className="ml-2">Загрузить фото шапки</p>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
    </label>
  );
}

export default UploadButton;
