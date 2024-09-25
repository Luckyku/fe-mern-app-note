import React, { useState } from "react";
import Tag from "../../components/Inputs/Tag";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

// Correctly destructure props
const AddEditNotes = ({
  noteData,
  onClose,
  type,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData ? noteData.title : "");
  const [content, setContent] = useState(noteData ? noteData.content : "");
  const [tags, setTags] = useState(noteData ? noteData.tags : []);
  const [error, setError] = useState("");
  
  // Insert New Notes
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-notes", {
        title: title,
        content: content,
        tags: tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note has been added", "success");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.details) {
          const errorDetails = error.response.data.details;
          let errorMessage = null;
          // Find the first relevant error message in priority order
          if (errorDetails.some((err) => err.path === "title")) {
            errorMessage = errorDetails.find((err) => err.path === "title").msg;
          } else if (errorDetails.some((err) => err.path === "content")) {
            errorMessage = errorDetails.find(
              (err) => err.path === "content"
            ).msg;
          } else if (errorDetails.some((err) => err.path === "tags")) {
            errorMessage = errorDetails.find((err) => err.path === "tags").msg;
          }
          setError(errorMessage);
        } else {
          setError(error.response.data.message);
        }
      }
    }
  };

  // Update Notes
  const editNote = async () => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.put("/edit-notes/" + noteId, {
        title: title,
        content: content,
        tags: tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note has been updated", "success");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.details) {
          const errorDetails = error.response.data.details;
          let errorMessage = null;
          // Find the first relevant error message in priority order
          if (errorDetails.some((err) => err.path === "title")) {
            errorMessage = errorDetails.find((err) => err.path === "title").msg;
          } else if (errorDetails.some((err) => err.path === "content")) {
            errorMessage = errorDetails.find(
              (err) => err.path === "content"
            ).msg;
          } else if (errorDetails.some((err) => err.path === "tags")) {
            errorMessage = errorDetails.find((err) => err.path === "tags").msg;
          }
          setError(errorMessage);
        } else {
          setError(error.response.data.message);
        }
      }
    }
  };
  const handleAdd = () => {
    // Clear any previous error messages
    setError("");

    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    // Simulate adding the note (replace with actual logic)
    try {
      // Example: Replace with API call or other logic to save the note
      if (type === "edit") {
        editNote();
      } else {
        addNewNote();
      }
    } catch (err) {
      // Handle any errors that occur during the process
      setError("An error occurred while adding the note. Please try again.");
    }
  };

  return (
    <div className="relative p-4 ">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full hover:bg-slate-100 text-slate-500 flex justify-center items-center"
        aria-label="Close"
      >
        <MdClose />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          className="text-2xl text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Enter title..."
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text" // Corrected typo
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Type here..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <label className="input-label">TAGS</label>
        <Tag tags={tags} setTags={setTags} />
      </div>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
      <button className="btn-primary mt-5" onClick={handleAdd}>
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNotes;
