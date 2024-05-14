import React from "react";
import { X } from "lucide-react";

type modalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<modalProps> = ({ open, onClose, children }) => {
  return (
    <div
    onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-neutral-900 rounded-lg shadow p-6 transition-all max-w-md flex flex-col items-center ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 py-1 px-2 text-gray-400 hover:text-white"
        >
        <X/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
