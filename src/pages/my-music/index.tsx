import { Button, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountApiFp } from 'src/api/api';
import { useAppSelector } from 'src/app/hooks';
import { debounce } from 'src/components/common/Function/Debounce';
import MainLayout from 'src/components/common/LayOut/Layout';
import Loading from 'src/components/common/Loading/Loading';
import { ModalPlayList, ModalProject } from 'src/components/common/Modal';
import { authorization, getStoreLocal } from 'src/features/auth/AuthSlice';
import { getPlaylist, getPlaylistNull, selectPlayList } from 'src/features/playlist/PlayListSlice';
import { getProject, selectProject, setFilter } from 'src/features/project/ProjectSlice';
import Navchildren from '../../components/common/Navchildren';

export interface IMyMusicProps {
  children: ReactNode;
  disableButton?: boolean;
}

export default function MyMusic(props: IMyMusicProps) {
  const { children, disableButton } = props;
  const [showModalPlayList, setShowModalPlayList] = useState(false);
  const [showModalProject, setShowModalProject] = useState(false);
  const dispatch = useDispatch();
  const { listProject, loading, filter } = useAppSelector(selectProject);
  const { listPlayList } = useAppSelector(selectPlayList);
  const router = useRouter();
  const { pathname } = router;
  const id = getStoreLocal('id');

  useEffect(() => {
    if (!id) return;
    dispatch(getProject({ id, value: filter }));
    return () => {
      if (filter !== '') {
        dispatch(setFilter(''));
      }
    };
  }, [filter, showModalProject, showModalPlayList]);

  useEffect(() => {
    if (!id) return;
    dispatch(getPlaylistNull(id));
    dispatch(getPlaylist(id));
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/my-music') {
      if (window.innerWidth < 768) {
        router.push(`/my-music`);
      }
      if (listPlayList.length > 0 && window.innerWidth > 768) {
        router.push(`/my-music/playlists/${listPlayList[0].id}`);
      } else {
        router.push(`/my-music`);
      }
    }
  }, [pathname, listPlayList]);

  const handleSubmit = async (formValue) => {
    if (!id) return;
    try {
      await AccountApiFp.accountPrototypeCreatePlaylist(
        {
          id,
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

  const handleSubmitProject = async (formValue) => {
    const id = getStoreLocal('id');
    if (!id) return;
    try {
      await AccountApiFp.accountPrototypeCreateProject(
        {
          id,
          data: formValue,
        },
        authorization()
      )();
      openNotificationWithIcon({
        type: 'success',
        message: 'Add Project',
        description: 'Add To Project Successfully',
      });
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }
    setShowModalProject(false);
  };

  const handleSearch = debounce(async (e) => {
    const { value } = e.target;
    dispatch(setFilter(value));
  }, 500);

  return (
    <MainLayout disableTab>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div>
          {!disableButton && (
            <div className="mx-0 ipad:-mx-12 laptop:mx-0 mt-20 mb-10">
              <div className="block ipad:block my-10 ipad:mx-0" style={{ color: 'white' }}>
                <div className="hidden laptop:flex flex-wrap  items-center">
                  <Navchildren />
                </div>
              </div>
              <div className="col-span-4 grid grid-cols-12">
                <div className="col-span-12 ipad:col-span-4">
                  {listPlayList.length > 0 ? (
                    <div className="col-span-12 w-full ipad:block ipad:col-span-3 ipad:w-52 desktop:w-80">
                      <Button
                        type="primary"
                        className=" bg-blue-400 hover:text-black h-11 block !important text-base laptop:text-lg laptop:w-52"
                        onClick={() => {
                          setShowModalPlayList(true);
                        }}
                      >
                        Create playlist
                      </Button>
                      <Button
                        type="primary"
                        className=" bg-blue-400 hover:text-black h-11  my-8 block !important text-base laptop:text-lg laptop:w-52"
                        onClick={() => {
                          setShowModalProject(true);
                        }}
                      >
                        Create project
                      </Button>
                      <input
                        type="text"
                        name="name"
                        defaultValue={undefined}
                        onChange={handleSearch}
                        placeholder="Filter project"
                        className="h-10 w-full block bg-transparent px-2 border-gray-700 border-2 outline-none hover:border-white ipad:text-base laptop:w-52"
                      />
                      <div className="my-4 text-lg w-full laptop:w-60 desktop:w-80">
                        {listPlayList.length > 0 &&
                          listPlayList.map((item, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  router.push(`/my-music/playlists/${item.id}`);
                                }}
                                className=" text-base my-1 text-gray-500 hover:text-white cursor-pointer px-2 laptop:text-lg"
                              >
                                {item.name}
                              </div>
                            );
                          })}
                        {listProject.map((item, index) => {
                          return (
                            <div key={index}>
                              <Link href={`/my-music/project/${item.id}`}>
                                <div className="text-lg mt-10 cursor-pointer text-gray-200 hover:text-white  uppercase laptop:text-xl">
                                  {item.name}
                                </div>
                              </Link>
                              {item.playlists.length > 0 &&
                                item.playlists.map((playlist, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className=" text-base my-1 text-gray-500 hover:text-white cursor-pointer px-2 laptop:text-lg"
                                    >
                                      <Link href={`/my-music/playlists/${playlist.id}`}>
                                        <a>{playlist.name}</a>
                                      </Link>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}{' '}
                      </div>{' '}
                    </div>
                  ) : (
                    <div className="w-64 tablet:w-560 tablet:-mx-12 ipad:w-160 ipad:mx-0 laptop:w-816 bg-gray-500 my-8 desktop:w-284">
                      <div className="py-10 tablet:px-4 text-center desktop:py-20 desktop:px-28">
                        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto relative">
                          <div className="absolute top-2/4 bg-black w-9/12 h-1 border-1 border-black left-4"></div>
                          <div className="abs absolute top-2/4 bg-black w-9/12 h-1 border-1 border-black left-4 rotate-90"></div>
                        </div>
                        <div className="text-5xl font-bold my-4">No playlists yet</div>
                        <div className="text-xl desktop:text-2xl">
                          Save your favorite music and sound effects in playlists. Get started by
                          creating your first playlist.
                        </div>
                        <div className="mx-4">
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
                    </div>
                  )}
                </div>
                {listPlayList.length > 0 && (
                  <div className=" ipad:block col-span-8 laptop:-mt-10">
                    <div className="">{children}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {listPlayList.length > 0 && disableButton && (
        <div className=" ipad:block mt-[80px] col-span-8 laptop:-mt-10">
          <div className="">{children}</div>
        </div>
      )}
      {showModalPlayList && (
        <ModalPlayList
          onSubmit={handleSubmit}
          list={listProject}
          hideModal={(hide) => setShowModalPlayList(hide)}
        />
      )}
      {showModalProject && (
        <ModalProject
          onSubmit={handleSubmitProject}
          hideModal={(hide) => setShowModalProject(hide)}
        />
      )}
    </MainLayout>
  );
}

export const openNotificationWithIcon = (noti) => {
  notification[noti.type]({
    message: noti.message,
    description: noti.description,
  });
};
