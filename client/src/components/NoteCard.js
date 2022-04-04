import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPen,faTrashCan} from "@fortawesome/free-solid-svg-icons";

const NoteCard = ({ allNotes, editHandler, deleteHandler }) => {
  return (
    <div className="main m-2 p-2 bg-white  rounded-md overflow-y-auto" style={{height:"590px"}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {allNotes.map((note) => {
        return (
          <section
            key={note.id}
            className="m-3  py-4 px-6 bg-teal-300 rounded-lg "
            style={{"box-shadow":"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}
          >
            <div>
              <h2 className="text-black text-2xl font-semibold">
                {note.title}
              </h2>
              <h4 className="text-gray-500 text-base font-semibold">
                Note by{" "}
                {note?.User?.username ? note?.User?.username : "deleted user"}
              </h4>
              <p className="mt-2 text-gray-800 ">{note.content}</p>
            </div>
            <div className="flex float-right justify-end">
              <button
                onClick={()=>editHandler(note.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 "
              >
               <FontAwesomeIcon icon={faPen}/>
              </button>
              <button
                onClick={()=>deleteHandler(note.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faTrashCan}/>
              </button>
            </div>
          </section>
        );
      })}
    </div>
    </div>
  );
};

export default NoteCard;
