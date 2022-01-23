import React, { useState } from 'react';

export interface ModalPlayList {
  onSubmit: any;
  hideModal: any;
  list: any[];
}

export function ModalPlayList(props: ModalPlayList) {
  const { onSubmit, hideModal, list } = props;
  const [formValue, setFormValue] = useState({
    projectId: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    hideModal(false);
    onSubmit(formValue);
  };

  return (
    <div
      className="fixed top-32 left-0 bottom-0 w-full  "
      style={{ backgroundColor: 'rbga(0,0,0,0.3)' }}
    >
      <div className="w-11/12 bg-white relative mx-auto ipad:w-3/5 desktop:w-1/2 mt-20">
        <div className="py-4 px-4 text-black text-2xl">CREATE PLAYLIST</div>
        <form
          className="mt-2 pb-4 mx-4"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className=" text-xl desktop:mx-4">
            <input
              onChange={handleChange}
              placeholder="Playlist name"
              type="text"
              name="name"
              defaultValue=""
              required
              className="text-black px-4 my-2 border-2 border-gray-500 w-full h-12 outline-none desktop:h-16 "
            />
            <select
              onChange={handleChange}
              required
              name="projectId"
              className=" text-xl text-black px-4 my-2 border-2 border-gray-500 w-full h-12 outline-none desktop:h-16"
            >
              <option value={0} className="hidden" disabled selected>
                Add to Project (Optional)
              </option>
              <option className="h-2 leading-7" value={0}></option>
              {list.length > 0 &&
                list.map((item, index) => {
                  return (
                    <option className="h-2 leading-7" key={index} value={item.id}>
                      {' '}
                      {item.name}{' '}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="flex justify-between items-center text-xl text-white my-4 desktop:my-8 mx-4">
            <button
              className="cursor-pointer hover:text-black w-20 h-10 bg-blue-400"
              onClick={() => hideModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="cursor-pointer hover:text-black w-20 h-10 bg-blue-400">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
