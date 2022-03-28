import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({
  showModal,
  setShowModal,
  handleChange,
  modalData,
  updateHandler
}) {

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-96 ">
              {/*content*/}
              <section className="m-3  py-4 px-6 bg-teal-300 shadow-xl shadow-slate-500 rounded-lg ">
                <div>
                  {/* HEADER */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-white rounded-t">
                    <h3 className="text-3xl font-semibold">Edit Note</h3>
                    <button
                      className="text-red-700 p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <FontAwesomeIcon className="font-black" icon={faXmark} />
                    </button>
                  </div>
                  {/* BODY */}
                  <section>
                    <div className="my-1">
                      <label className="block mb-1 text-gray-600 font-semibold">
                        Title
                      </label>
                      <input
                        id="modal-tag"
                        type="text"
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        name="title"
                        autoComplete="off"
                        required={true}
                        value={modalData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-600 font-semibold">
                        Note
                      </label>
                      <textarea
                        id="modal-tag"
                        name="note"
                        rows="3"
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        autoComplete="off"
                        required={true}
                        value={modalData.note}
                        onChange={handleChange}
                      />
                    </div>
                  </section>
                  {/*FOOTER*/}
                  <div className="mt-2 flex items-center justify-center p-6 border-t border-solid border-white rounded-b">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                      onClick={updateHandler}
                      id={modalData.id}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

//   onClick={() => setShowModal(true)}
