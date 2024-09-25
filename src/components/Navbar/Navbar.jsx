import React, { useState } from "react";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  userInfo,
  showProfile = true,
  onSearchNotes,
  handleClearSearch,
}) => {
  const navigate = useNavigate(); // Correctly call useNavigate as a function

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    // Define search behavior here
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission if in a form
      handleSearch(); // Call handleSearch when Enter key is pressed
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch(); 

  };

  return (
    <div className="drop-shadow flex items-center justify-between px-6 py-2 bg-white">
      <h2 className="text-xl font-medium text-black">My Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value); // Ensure you use e.target.value for input change
        }}
        onKeyDown={handleKeyDown}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
      />
      {showProfile && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};

export default Navbar;
