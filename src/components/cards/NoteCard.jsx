import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment"

const NoteCard = ({
  title,
  date,
  tags,
  content,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onDetail
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out " >
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium hover:text-blue-500 hover:cursor-pointer" onClick={onDetail}>{title}</h6>
          <span className="text-xs text-slate-500">
            Posted on {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn -mt-8  ${
            isPinned ? "text-blue-400" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-slate-600 text-xs mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item}  `)}
        </div>
        <div className="flex gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
