import React,{useState} from 'react'
import {faFloppyDisk,faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = ({handleSubmit,noteData,handleChange}) => {
  const [showForm, setShowForm] = useState(false)

const showHandler = (e)=>{
  setShowForm(!showForm)
}

  return (
  
    <div className="m-2 bg-white rounded-md">
    <div className="w-auto h-11 flex bg-blue-600 rounded-t-md">
        <p className='font-bold text-white text-xl self-center ml-auto'>Add Notes</p>
        <button className='ml-auto mr-5'>
          <FontAwesomeIcon onClick={showHandler} className='h-8 mt-1' icon={faPlusCircle} />
        </button>
      </div>
      <div className={showForm ? "showform" : "hideform"}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
            htmlFor="abc"
          >
            Title
          </label>
          <input
            id="form-tag"
            autoComplete="off"
            className="appearance-none h-10 block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white "
            type="text"
            placeholder="Title"
            value={noteData.title}
            name="title"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="flex flex-wrap">
          <label
            className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
            htmlFor="abc"
          >
            Note
          </label>
          <textarea
            name="note"
            id="form-tag"
            rows="3"
            className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
            onChange={handleChange}
            value={noteData.note}
            required={true}
          />
        </div>
        <div className="button m-1">
          <button
            type="submit"
            className="mx-auto flex justify-center text-white bg-indigo-900 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-96  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span>
              <FontAwesomeIcon icon={faFloppyDisk} /> Save
            </span>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Form