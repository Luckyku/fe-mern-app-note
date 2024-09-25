import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = ({ value, onChange, placeholder = "Password" }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        name="password"
        id="password"
        placeholder={placeholder}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        aria-label="Password input"
      />
      {isShowPassword ? (
        <FaRegEye
          className="text-blue-500 cursor-pointer"
          size={22}
          onClick={toggleShowPassword}
          aria-label={isShowPassword ? "Hide password" : "Show password"}
        />
      ) : (
        <FaRegEyeSlash
          className="text-slate-400 cursor-pointer"
          size={22}
          onClick={toggleShowPassword}
          aria-label={isShowPassword ? "Hide password" : "Show password"}
        />
      )}
    </div>
  );
};

export default Password;
