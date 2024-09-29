import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import EmptyCard from "../../components/cards/EmptyCard";
import Toast from "../../components/ToastMessage/Toast";
import AddEditNotes from "./AddEditNotes";
import NoteDetail from "./NoteDetail";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import noData from "../../assets/noData.svg";
import notFound from "../../assets/search-not-found.svg";

const Home = () => {
  Modal.setAppElement("#root");

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [openNoteDetail, setOpenNoteDetail] = useState({
    isShown: false,
    data: null,
  });
  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "success",
  });
  const handleShowToastMessage = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToastMessage = () => {
    setShowToastMessage({
      isShown: false,
      message: "",
      type: "success",
    });
  };
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState();
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const handleAdd = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };
  const handleDetail = (noteDetails) => {
      setOpenNoteDetail({ isShown: true, data: noteDetails });
  };

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance("/get-all-notes");
      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  // Delete note
  const deleteNote = async (data) => {
    try {
      const noteId = data._id;
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        handleShowToastMessage("Note has been deleted", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  // on search note
  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //clear search
  const handleClearSearch = () => {
    setIsSearch(false), getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.put(
        "/update-note-ispinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        let toastmessage = "Note has been Unpinned";
        if (response.data.note.isPinned) {
          toastmessage = "Note is Pinned";
        }
        handleShowToastMessage(toastmessage, "success");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, [navigate]);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
      />

      <div className="container-sm mx-auto px-5 lg:px-20 mt-10">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onDetail={() => handleDetail(item)}
                onEdit={() => handleEdit(item)}
                onPinNote={() => updateIsPinned(item)}
                onDelete={() => {
                  deleteNote(item);
                }}
                />

            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noData : notFound }
            message={
              isSearch
                ? "Ooops... We can't find what you're looking for"
                : "You don't have any note, start making your own note by clicking the 'Add' button to jot down your ideas, thought, reminder or everythings on your mind. Let's get started!!"
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 text-white hover:bg-blue-600 fixed right-10 bottom-10"
        onClick={handleAdd}
      >
        <MdAdd className="text-[32px]" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            background: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="lg:w-[40%] w-[70%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={handleShowToastMessage}
          type={openAddEditModal.type} // Pass the type prop here
        />
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={openNoteDetail.isShown}
        onRequestClose={() =>
          setOpenNoteDetail({ isShown: false, data: null })
        }
        style={{
          overlay: {
            background: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="lg:w-[40%] w-[70%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <NoteDetail
          noteData={openNoteDetail.data}
          onClose={() =>
            setOpenNoteDetail({ isShown: false, data: null })
          }
        />
      </Modal>
      <Toast
        isShown={showToastMessage.isShown}
        type={showToastMessage.type}
        message={showToastMessage.message}
        onClose={handleCloseToastMessage}
      />
    </>
  );
};

export default Home;
