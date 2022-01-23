import React, { useState } from 'react';

export interface ModalProjectProps {
  onSubmit: any;
  hideModal: any;
}

export function ModalProject(props: ModalProjectProps) {
  const { onSubmit, hideModal } = props;
  const [formValue, setFormValue] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ [name]: value });
  };
  return (
    <div className="absolute top-0 left-0 bottom-0">
      <form onSubmit={handleSubmit} className=" mx-64 my-40 w-816 bg-white">
        <div className=" text-black text-2xl mx-4 py-6 border-b-2">Create Project</div>
        <div className="mx-8 my-4 h-16 ">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className=" text-black outline-none text-xl px-4 block w-full h-full border-2"
            placeholder="Create Project"
            required
          />
        </div>
        <div className="flex justify-between h-20 mx-4 text-lg pb-4 border-t-2">
          <button
            className="text-blue-500 font-bold mt-4"
            onClick={() => {
              hideModal(false);
            }}
          >
            Cancel
          </button>
          <button type="submit" className="w-20 mt-4 h-10 text-white font-bold bg-blue-400">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
