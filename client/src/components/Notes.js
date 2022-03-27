import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";
import useAuth from "../auth/useAuth";
import Modal from "./Modal";
import Form from "./Form";

const Notes = () => {
  const { auth } = useAuth();
  const [noteData, setNoteData] = useState({
    userId: auth.id,
    title: "",
    note: "",
  });
  const [allNotes, setAllNotes] = useState([]);
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({id:"",title:"",note:""})
  const URL = "http://localhost:3005";





  ///////////////// USE-EFFECT ///////////////////

  useEffect(() => {
    let reset = setTimeout(() => setMsg(""), 3000);
    return () => clearTimeout(reset);
  }, [msg]);

  useEffect(() => {
    axios
      .get(`${URL}/notes`,{withCredentials:true})
      .then((res) => setAllNotes(res.data.notes))
      .catch((err) => console.log(err));
  }, [msg]);

  ////////////// SUBMIT HANDLER ///////

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/notes`,
        JSON.stringify(noteData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setNoteData({ userId: auth.id, title: "", note: "" });
      setMsg(response?.data?.message);
    } catch (err) {
      if (err) {
        setMsg(err?.response?.data?.message);
      } else {
        setMsg("Registration Failed");
      }
    }
  };
  ////////////----EDIT AND DELETE HANDLERS ---- ////////////
  const editHandler = (e) => {
    let id = Number(e.target.id);
    let filteredNote = allNotes.filter(note=>note.id===id)[0]
    setModalData({
      id:filteredNote.id,
      title:filteredNote.title,
      note:filteredNote.content
    })
    setShowModal(!showModal);
  };

  const deleteHandler = (e) => {
    let id = e.target.id;
    if (window.confirm("Do you want to delete note?")) {
      axios
        .delete(`${URL}/notes/${id}`)
        .then((res) => setMsg(res.data.message));
    } else {
      return;
    }
  };

  const updateHandler =async (e) => {
    let id = e.target.id
    try {
      let res = await axios.put(`${URL}/notes/${id}`,
      {
        title:modalData.title,
        note:modalData.note
      })
      setMsg(res?.data?.message)
      setShowModal(!showModal)
    } catch (error) {
      setMsg(error?.response?.data?.message)
    }

  }

  ///// CHANGE HANDLER ///////
  const handleChange = (e)=>{
    if(e.target.id==="form-tag"){
      const value = e.target.value;
      setNoteData({
        ...noteData,
        [e.target.name]: value,
      });
    }
    if(e.target.id==="modal-tag"){
      const value = e.target.value;
      setModalData({
        ...modalData,
        [e.target.name]:value
      })
    }
  }
  //////////////////////////////////////////////////////////

  return (
    <>
      <ul>
        <li
          className={msg !== "" ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {msg}
        </li>
      </ul>
      
      <Form
        handleSubmit={handleSubmit}
        noteData={noteData}
        handleChange={handleChange}
      />
      <div className="m-2 p-2 bg-white  rounded-md">
        <NoteCard
          allNotes={allNotes}
          setMsg={setMsg}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleChange={handleChange}
          modalData={modalData}
          updateHandler={updateHandler}
        />
      </div>
    </>
  );
};

export default Notes;
