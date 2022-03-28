import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faPen,faTrashCan} from "@fortawesome/free-solid-svg-icons";

const NoteCard = ({ allNotes, editHandler, deleteHandler }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allNotes.map((note) => {
        return (
          <section
            key={note.id}
            className="m-3  py-4 px-6 bg-teal-300 shadow-xl shadow-slate-500 rounded-lg "
          >
            <div>
              <h2 className="text-black text-2xl font-semibold">
                {note.title}
              </h2>
              <h4 className="text-gray-500 text-base font-semibold">
                Note by {note?.User?.username ? note?.User?.username : "deleted user"}
              </h4>
              <p className="mt-2 text-gray-800 ">{note.content}</p>
            </div>
            <div className="flex justify-end mt-2">
              <button
                id={note.id}
                onClick={editHandler}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 "
              >
                Edit
              </button>
              <button
                id={note.id}
                onClick={deleteHandler}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default NoteCard;
