import React, { useEffect } from "react";
import { LuCheck, LuTrash } from "react-icons/lu";

const Toast = ({ isShown, type, message, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed w-full top-4 right-4 max-w-xs transition-all duration-300 cursor-pointer ${
        isShown ? "opacity-100 z-10" : "opacity-0 -z-10"
      }`}
    >
      <button className="w-full" onClick={onClose}>
        <div
          className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
            type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
          } after:absolute after:top-0 after:left-0 after:rounded-l-lg`}
        >
          <div className="flex items-center gap-3 py-2 ps-4 pe-0 bg-white ">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                type === "delete" ? "bg-red-50" : "bg-green-50"
              }`}
            >
              {type === "delete" ? (
                <LuTrash className="text-xl text-red-500" />
              ) : (
                <LuCheck className="text-xl text-green-500" />
              )}
            </div>
            <p className="text-sm text-slate-800">{message}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Toast;
