import React from 'react'
import { MdClose } from 'react-icons/md'

const NoteDetail = ({onClose, noteData}) => {
    const title = noteData?.title || ""
    const content = noteData?.content || ""
    const tags = noteData ? noteData.tags : [];


  return (
    <div className="relative p-4">
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full hover:bg-slate-100 text-slate-500 flex justify-center items-center"
        aria-label="Close"
      >
        <MdClose />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <p className="text-2xl capitalize text-slate-950">{title}</p>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">CONTENT</label>
        <p className="text-sm text-slate-950">{content}</p>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">TAGS</label>
        {tags.length > 0 ? (<div className="text-xs text-slate-500">
          {tags.map((item) => `#${item}  `)}
        </div>) : (
            <p className='text-sm text-slate-500'>This note doesn't have any tags</p>
        )}
        

      </div>
    </div>
  );
}

export default NoteDetail
