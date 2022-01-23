import { Button, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AccountApiFp, ProjectApiFp } from 'src/api/api';
import { useAppSelector } from 'src/app/hooks';
import Loading from 'src/components/common/Loading/Loading';
import { ModalPlayList } from 'src/components/common/Modal';
import { authorization, getStoreLocal } from 'src/features/auth/AuthSlice';
import { selectProject } from 'src/features/project/ProjectSlice';
import Project from '.';
import { openNotificationWithIcon } from '..';
export interface DetailProjectProps {}

export default function DetailProject(props: DetailProjectProps) {
  const router = useRouter();
  const { id } = router.query;
  const [listPlayList, setListPlayList] = useState([]);
  const [project, setProject] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [showModalPlayList, setShowModalPlayList] = useState(false);
  const { listProject } = useAppSelector(selectProject);
  const idUser = getStoreLocal('id');

  const handleSubmit = async (formValue) => {
    if (!id) return;
    try {
      await AccountApiFp.accountPrototypeCreatePlaylist(
        {
          id: idUser,
          data: formValue,
        },
        authorization()
      )();
      openNotificationWithIcon({
        type: 'success',
        message: 'Add PlayList',
        description: 'Add To PlayList Successfully',
      });
      setShowModalPlayList(false);
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }
    setShowModalPlayList(false);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        if (typeof id === 'string') {
          const result = await ProjectApiFp.projectPrototypeGetPlaylists(
            {
              id,
            },
            authorization()
          )();
          const data = await ProjectApiFp.projectFindById(
            {
              id,
            },
            authorization()
          )();
          setProject(data);
          setListPlayList(result);
          setLoading(false);
        }
      } catch (error) {}
    })();
  }, [id]);

  return (
    <Project>
      <div className="relative">
        {loading ? (
          <Loading></Loading>
        ) : listPlayList.length === 0 ? (
          <div className="w-64 mx-auto tablet:w-full tablet:mx-0 bg-gray-500 my-8 ">
            <div className="py-10 tablet:px-4 text-center desktop:py-20 desktop:px-28">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto relative">
                <div className="absolute top-2/4 bg-black w-9/12 h-1 border-1 border-black left-4"></div>
                <div className="abs absolute top-2/4 bg-black w-9/12 h-1 border-1 border-black left-4 rotate-90"></div>
              </div>
              <div className="text-5xl font-bold my-4">No playlists yet</div>
              <div className="text-xl desktop:text-2xl">
                Save your favorite music and sound effects in playlists. Get started by creating
                your first playlist.
              </div>
              <button
                className="text-2xl my-4 w-full h-14 bg-blue-500 cursor-pointer hover:text-black desktop:w-52 "
                onClick={() => {
                  setShowModalPlayList(true);
                }}
              >
                Create Playlist
              </button>
            </div>
          </div>
        ) : (
          <div className=" mt-10">
            {project && <div className="text-4xl">{project.name}</div>}
            <Button
              type="text"
              className="text-blue-500 p-0 "
              onClick={() => {
                message.success('We have develop this function in next version');
              }}
            >
              Create Playlist in Project
            </Button>
            {listPlayList.length > 0 &&
              listPlayList.map((item, index) => {
                return (
                  <div key={index}>
                    <Link href={`/my-music/playlists/${item.id}`}>
                      <div className="my-4 border-t-2 border-gray-500 py-4 text-2xl">
                        {item.name}
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {showModalPlayList && (
        <ModalPlayList
          onSubmit={handleSubmit}
          list={listProject}
          hideModal={(hide) => setShowModalPlayList(hide)}
        />
      )}
    </Project>
  );
}
