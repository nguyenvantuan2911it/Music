import {
  ArrowDownOutlined,
  CustomerServiceOutlined,
  PauseCircleOutlined,
  PlayCircleFilled,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import Loading from 'src/components/common/Loading/Loading';
import { getStoreLocal } from 'src/features/auth/AuthSlice';
import { selectTrackDownload } from 'src/features/track/TrackDownloadSlice';
import { selectTrack } from 'src/features/track/Trackslice';
import { playmusic, selectstatus, selecttrack, stop } from '../../../features/playmusic/PlaySlice';
import MainLayout from '../../common/LayOut/Layout';

export interface IItemTrackProps {
  listTrack: any[];
  status: any;
  onShowModal: any;
  handleDownloadFile: any;
  onShowModalPlayList: any;
  onHideModalPlayList: any;
}

export default function ItemTrack(props: IItemTrackProps) {
  const { listTrack, onShowModal, handleDownloadFile, onShowModalPlayList, onHideModalPlayList } =
    props;
  const { listTrackId } = useAppSelector(selectTrack);
  const [listProduct, setListProduct] = useState(listTrack);
  const [showAction, setShowAction] = useState(false);
  const [showToastify, setShowToastify] = useState(false);
  const statusTrack = useAppSelector(selectstatus);
  const { isLoading } = useAppSelector(selectTrackDownload);
  const trackid = useAppSelector(selecttrack);
  const dispatch = useDispatch();
  const handleDownload = (track) => {
    handleDownloadFile(track);
  };

  useEffect(() => {
    const index = listProduct.findIndex((item) => item.id === trackid);
    setListProduct(
      listTrack.map((prd, i) => {
        if (i === index) return { ...prd, isPlay: statusTrack === 'play' ? false : true };
        else return { ...prd, isPlay: true };
      })
    );
  }, [trackid, statusTrack, listTrack]);

  return (
    <div className="mt-4">
      {isLoading && <Loading />}
      {listProduct &&
        listProduct.map((tracks, index) => {
          return (
            <div key={index} className="my-2 flex w-full items-center hover:bg-gray-700 py-4">
              <div
                className=" cursor-pointer text-5xl pr-4 ipad:text-5xl desktop:text-4xl h-full mb-2 mx-2"
                onClick={() => {
                  if (tracks.isPlay) {
                    if (tracks.id === trackid) {
                      dispatch(
                        stop({
                          status: 'play',
                        })
                      );
                    } else {
                      dispatch(
                        playmusic({
                          status: 'play',
                          trackid: tracks.id,
                        })
                      );
                    }
                  } else {
                    dispatch(
                      stop({
                        status: 'stop',
                      })
                    );
                  }
                }}
              >
                {tracks.isPlay ? <PlayCircleFilled /> : <PauseCircleOutlined />}
              </div>
              <div className="w-80 mr-4 laptop:w-56 desktop:w-60 text-base font-bold">
                <div className="text-base ipad:text-lg desktop:text-base">
                  <a>{tracks.name}</a>
                </div>
                <div className="text-gray-400">
                  {/* {tracks.composers.map((item, index) => {
                    return <a key={index}>{item.name}</a>;
                  })} */}
                </div>
              </div>
              <div className="flex justify-between flex-1 items-center">
                <div className="hidden flex-1 items-center flex-wrap laptop:flex text-base text-gray-500 px-2 desktop:text-base font-bold desktop:px-2 w-52">
                  {tracks.genres.map((item, index) => {
                    if (index === tracks.genres.length - 1) {
                      return (
                        <div className="ml-2" key={index}>
                          <Link href={`/music/Genres/${item.id}`}>
                            <a>{item.tag} </a>
                          </Link>
                        </div>
                      );
                    } else {
                      return (
                        <div className="ml-2" key={index}>
                          <Link href={`/music/Genres/${item.id}`}>
                            <a>{item.tag},</a>
                          </Link>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="hidden items-center flex-1 flex-wrap desktop:flex text-base text-gray-500 desktop:text-base font-bold desktop:px-4">
                  {tracks.moods.map((item, index) => {
                    if (index === tracks.moods.length - 1) {
                      return (
                        <div className="ml-2" key={index}>
                          <Link href={`/music/mood/${item.id}`}>
                            <a>{item.tag} </a>
                          </Link>
                        </div>
                      );
                    } else {
                      return (
                        <div className="ml-2" key={index}>
                          <Link href={`/music/genres/${item.id}`}>
                            <a>{item.tag},</a>
                          </Link>
                        </div>
                      );
                    }
                  })}
                </div>
                <div
                  className="text-5xl ipad:hidden cursor-pointer rounded-full h-10  hover:bg-gray-500"
                  onClick={() => {
                    setShowAction(true);
                  }}
                >
                  <span className="relative -top-4">...</span>
                </div>
                {showAction && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-1500 ipad:hidden">
                    <div className="px-4">
                      <div
                        className="py-4 text-xl font-bold float-right cursor-pointer"
                        onClick={() => {
                          setShowAction(false);
                        }}
                      >
                        X
                      </div>
                      <div className=" clear-right my-6">
                        <div className="text-2xl">Toolkit</div>
                        <div className="text-lg">Dylan Sitts</div>
                      </div>
                      <div className="text-lg text-gray-500">
                        <div className=" leading-7">Genre: Old School Hip Hop</div>
                        <div className=" leading-7">Category: Quirky</div>
                        <div className=" leading-7">BPM: 88</div>
                      </div>
                      <button
                        className="my-4 w-full h-12 text-xl bg-blue-500 "
                        onClick={() => {
                          const id = getStoreLocal('id');
                          if (!id) {
                            onHideModalPlayList(false);

                            setShowToastify(true);
                          } else {
                            onShowModalPlayList(true, tracks);
                          }
                          setShowAction(false);
                        }}
                      >
                        Add to playlist
                      </button>
                      <div className="my-4 border-t-2 border-gray-500">
                        <div className="py-6 text-2xl">
                          <div
                            onClick={() => {
                              onShowModal(true);
                              setShowAction(false);
                            }}
                            className="flex items-center py-4 hover:bg-gray-700 cursor-pointer "
                          >
                            <ShoppingCartOutlined />
                            <span className="text-base px-4 font-semibold">Buy License</span>
                          </div>
                          <div className="flex items-center py-4 hover:bg-gray-700 cursor-pointer">
                            <CustomerServiceOutlined />
                            <span className="text-base px-4 font-semibold">Find Similar</span>
                          </div>
                          <div className="flex items-center py-4 hover:bg-gray-700 cursor-pointer">
                            <ArrowDownOutlined
                              onClick={() => {
                                handleDownload(tracks);
                                setShowAction(false);
                              }}
                            />
                            <span className="text-base px-4 font-semibold">Download</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="hidden desktop:hidden text-base text-gray-500 px-4 desktop:text-base font-bold desktop:px-8">
                  2:00
                </div>
              </div>
              <div className="hidden ipad:flex text-xl pl-4">
                <div onClick={() => onShowModal(true)} className="px-4 cursor-pointer text-xl">
                  <ShoppingCartOutlined />
                </div>
                <div
                  onClick={() => {
                    const id = getStoreLocal('id');
                    if (!id) {
                      onHideModalPlayList(false);
                      setShowToastify(true);
                    } else {
                      onShowModalPlayList(true, tracks);
                    }
                  }}
                  className="px-4 cursor-pointer text-xl"
                >
                  <PlusOutlined />
                </div>

                <div className="px-4 cursor-pointer text-xl">
                  <ArrowDownOutlined onClick={() => handleDownload(tracks)} />
                </div>
              </div>
            </div>
          );
        })}
      {showToastify && (
        <div className="fixed bottom-4 right-8 " style={{ zIndex: 1500 }}>
          <div className="text-center bg-black w-80 h-44">
            <div className="py-10 px-2">
              <div className="text-2xl">You must be logged in to add to playlist</div>
              <div className="flex justify-between flex-row-reverse items-center my-4 mx-4">
                <div className="text-xl cursor-pointer text-blue-500">
                  <Link href="/login">Go to Login Page</Link>
                </div>
                <div className="text-xl cursor-pointer" onClick={() => setShowToastify(false)}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ItemTrack.Layout = MainLayout;
