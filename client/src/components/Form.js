import React from 'react'
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = ({handleSubmit,noteData,handleChange}) => {
  return (
    <div className="m-2 p-4 bg-white overflow-y-auto rounded-md">
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
              rows="4"
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
  )
}

export default Form