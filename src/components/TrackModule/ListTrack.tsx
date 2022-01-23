import { message, notification } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { selectProject } from 'src/features/project/ProjectSlice';
import { downloadTrack } from 'src/features/track/TrackDownloadSlice';
import Wavesuffer from 'src/features/Wave/Wavesuffer';
import { AccountApiFp, PlaylistApiFp, Track } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authorization, getStoreLocal } from '../../features/auth/AuthSlice';
import { selectstatus } from '../../features/playmusic/PlaySlice';
import { ModalPlayList } from '../common/Modal';
import ModalAddPlayList from '../common/Modal/ModalAddPlayList';
import ModalDownload from '../common/Modal/ModalDownload';
import Modal from '../Modal';
import ItemTrack from './components/ItemTrack';
import s from './ListTrack.module.scss';

export interface TrackListProps {
  listTrack: Track[];
}
function TrackList(props: TrackListProps) {
  const { listTrack } = props;
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectstatus);
  const [showModalPlayList, setShowModalPlayList] = useState(false);
  const [showiewPlayList, setShowViewPlayList] = useState(false);
  const [showModalCreatePlayList, setShowModalCreatePlayList] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const { listProject } = useAppSelector(selectProject);
  const [track, setTrack] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  const handleDownloadFile = async (track: any) => {
    if (getStoreLocal('token')) {
      // const countDownloadTrack = await AccountApiFp.accountPrototypeCountDownloads(
      //   { id: getStoreLocal('id') },
      //   authorization()
      // )();
      dispatch(downloadTrack(track));
      // if (countDownloadTrack.count < 3) {

      // } else {
      //   setVisible(true);
      // }
    } else {
      message.error('Please login before download handel');
      router.push('/login');
    }
  };

  const handleHideModalPlayList = (hide) => {
    setShowModalPlayList(hide);
  };
  const openNotificationWithIcon = (noti) => {
    notification[noti.type]({
      message: noti.message,
      description: noti.description,
    });
  };
  const handleAddToCart = async (value) => {
    const id = getStoreLocal('id');
    try {
      await AccountApiFp.accountPrototypeCreateCart(
        {
          id,
          data: value,
        },
        authorization()
      )();
      openNotificationWithIcon({
        type: 'success',
        message: 'Add To Cart',
        description: 'Add To Cart Successfully',
      });
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }
    router.push('/licensing/checkout/');
  };

  const handleHideModal = (hide) => {
    setShowModal(hide);
  };

  const handleSubmit = async (formValue) => {
    const id = getStoreLocal('id');
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
      setShowModalCreatePlayList(false);
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }

    setShowModalPlayList(false);
  };

  const handleAddTrack = async (playlist, hide) => {
    try {
      await PlaylistApiFp.playlistPrototypeLinkTracks(
        {
          id: playlist.id,
          fk: track.id,
        },
        authorization()
      )();
      setPlaylist(playlist);
      setShowViewPlayList(true);
    } catch (error) {}
    setShowModalPlayList(hide);
  };

  return (
    <>
      <div style={{ overflow: 'auto' }} className={s.main__app_music}>
        <h1 className="text-xl text-white my-4 font-bold">List Track</h1>
        {listTrack.length <= 0 && <div>No Track</div>}
        {listTrack.length > 0 && (
          <ItemTrack
            listTrack={listTrack}
            status={status}
            onShowModal={(show) => {
              setShowModal(show);
            }}
            onShowModalPlayList={(show, tracks) => {
              setShowModalPlayList(show);
              setTrack(tracks);
            }}
            onHideModalPlayList={(hide) => {
              setShowModalPlayList(hide);
            }}
            handleDownloadFile={handleDownloadFile}
          />
        )}
        {showModal && <Modal onHideModal={handleHideModal} onAddToCart={handleAddToCart} />}
        {showModalPlayList && (
          <ModalAddPlayList
            onAddTrack={handleAddTrack}
            onHideModalPlayList={handleHideModalPlayList}
            onShowModalCreate={() => {
              setShowModalCreatePlayList(true);
            }}
          />
        )}
        {showModalCreatePlayList && (
          <ModalPlayList
            onSubmit={handleSubmit}
            list={listProject}
            hideModal={(hide: boolean) => setShowModalCreatePlayList(hide)}
          />
        )}
      </div>
      <ModalDownload
        visible={visible}
        setVisible={setVisible}
        title={'YOU’VE ALREADY DOWNLOADED 3 TRACKS'}
      ></ModalDownload>
      {showiewPlayList && (
        <div className="fixed bottom-4 right-8 z-1500">
          <div className="text-center bg-black w-80 h-36">
            <div className="py-10">
              <div className="text-2xl">Add To Playlist Success</div>
              <div className="flex justify-between flex-row-reverse items-center my-4 mx-4">
                <div className="text-xl cursor-pointer text-blue-500">
                  <Link href={`/my-music/playlists/${playlist?.id}`}>View Playlists</Link>
                </div>
                <div className="text-xl cursor-pointer" onClick={() => setShowViewPlayList(false)}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(status === 'play' || status === 'stop') && <Wavesuffer listTrack={listTrack} />}
    </>
  );
}

export default TrackList;
