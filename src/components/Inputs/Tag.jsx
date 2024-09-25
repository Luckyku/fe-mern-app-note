import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Tag = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag(); // Call the function
    }
  };

  const handleRemoveTags = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex gap-2 items-center flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 rounded py-1 px-2" key={index}>
              #{tag}
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveTags(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="hover:bg-blue-700 rounded border border-blue-700 w-8 h-8 flex items-center justify-center text-blue-700 hover:text-white"
          onClick={addNewTag} // Call the function
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Tag;
