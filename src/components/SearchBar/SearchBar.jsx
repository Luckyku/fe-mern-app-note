import React from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, onKeyDown }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="search note"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {value && (<FaXmark
        className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
        onClick={onClearSearch}
      />)}
      <FaMagnifyingGlass className="text-xl text-slate-500 cursor-pointer hover:text-black" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
