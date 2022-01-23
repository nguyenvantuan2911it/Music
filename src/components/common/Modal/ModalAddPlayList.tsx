import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { getStoreLocal } from 'src/features/auth/AuthSlice';
import { getPlaylist, getPlaylistNull, selectPlayList } from 'src/features/playlist/PlayListSlice';
import { getProject, selectProject, setFilter } from 'src/features/project/ProjectSlice';
import { debounce } from '../Function/Debounce';

export interface ModalAddPlayListProps {
  onHideModalPlayList: any;
  onShowModalCreate?: any;
  onAddTrack?: any;
}

export default function ModalAddPlayList(props: ModalAddPlayListProps) {
  const { onHideModalPlayList, onShowModalCreate, onAddTrack } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const handleHideModal = () => {
    onHideModalPlayList(false);
  };

  const { listProject, filter } = useAppSelector(selectProject);
  const { listPlayList } = useAppSelector(selectPlayList);
  const id = getStoreLocal('id');
  useEffect(() => {
    if (!id) return;
    dispatch(getProject({ id, value: filter }));
    return () => {
      if (filter !== '') {
        dispatch(setFilter(''));
      }
    };
  }, [filter]);
  useEffect(() => {
    if (!id) return;
    dispatch(getPlaylistNull(id));
    dispatch(getPlaylist(id));
  }, [id]);
  const handleAddTrack = (playlist, hide) => {
    onAddTrack(playlist, hide);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  return (
    <div className="w-full h-full fixed top-20 left-0 right-0 text-black z-1500">
      {listProject && (
        <div className="mx-auto bg-white w-full ipad:w-160">
          <div className="">
            <div className="text-lg py-6 border-b-2 border-gray-300 px-4 font-semibold">
              ADD TO PLAYLIST
            </div>
            <div className=" overflow-y-scroll h-96 py-8 px-6">
              <input
                type="text"
                className="w-full h-16 px-4 text-lg border-2 border-gray-300 outline-none "
                placeholder="Filter Project..."
                onChange={handleSearch}
              />
              <div
                onClick={() => {
                  onShowModalCreate(true);
                  handleHideModal();
                }}
                className="text-base py-8 h-4 w-24 font-semibold text-blue-500 cursor-pointer hover:shadow-[0_2px_rgba(59,130,247,1)]"
              >
                New playlist
              </div>
              <div className="my-4 text-lg w-full">
                {listPlayList.length > 0 &&
                  listPlayList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          router.push(`/my-music/playlists/${item.id}`);
                        }}
                        className=" text-base my-1 text-gray-500 cursor-pointer px-2 laptop:text-lg"
                      >
                        {item.name}
                      </div>
                    );
                  })}
                {listProject.length > 0 &&
                  listProject.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="text-lg mt-10 cursor-pointer text-gray-500 uppercase laptop:text-xl">
                          {item.name}
                        </div>
                        {item.playlists.length > 0 &&
                          item.playlists.map((playlist, index) => {
                            return (
                              <div
                                key={index}
                                className=" text-base my-1 px-2 hover:bg-gray-300 cursor-pointer laptop:text-lg"
                                onClick={() => {
                                  handleAddTrack(playlist, false);
                                }}
                              >
                                {playlist.name}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
              <div className="px-4"></div>
            </div>
            <div className=" py-6 border-t-2 border-gray-300">
              <div
                onClick={handleHideModal}
                className="text-base mx-4 my-2 h-8 w-14 font-semibold text-blue-500 cursor-pointer hover:shadow-[0_2px_rgba(59,130,247,1)]"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
