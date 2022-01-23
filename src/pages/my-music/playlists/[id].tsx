import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Playlist, PlaylistApiFp } from 'src/api/api';
import Loading from 'src/components/common/Loading/Loading';
import ListTrack from 'src/components/TrackModule/ListTrack';
import { authorization, getStoreLocal } from 'src/features/auth/AuthSlice';
import { getPlaylist, getPlaylistNull } from 'src/features/playlist/PlayListSlice';
import { setListTracks } from 'src/features/track/Trackslice';
import { PlayheadPluginParams } from 'wavesurfer.js/src/plugin/playhead';
import PlayList from '.';

export interface DetailPlayListProps {}

export default function DetailPlayList(props: DetailPlayListProps) {
  const router = useRouter();
  const { id } = router.query;
  const [listTrack, setListTrack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setvisible] = useState(false);
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState<Playlist>({});

  useEffect(() => {
    const userId = getStoreLocal('token');
    if (!id && !userId) return;
    if (typeof id === 'string') {
      setLoading(true);
      (async () => {
        const filter = {
          limit: 5,
          include: [
            {
              relation: 'genres',
              scope: {
                fields: ['tag'],
              },
            },
            { relation: 'moods', scope: { fields: ['tag'] } },
            { relation: 'composers', scope: { fields: ['name'] } },
          ],
        };
        try {
          const playlistinTrack = await PlaylistApiFp.playlistPrototypeGetTracks(
            {
              id,
              filter: JSON.stringify(filter),
            },
            authorization()
          )();

          const currPlaylist = await PlaylistApiFp.playlistFindById(
            {
              id,
            },
            authorization()
          )();
          setPlaylist(currPlaylist);

          dispatch(setListTracks(playlistinTrack));
          setListTrack(playlistinTrack);

          setLoading(false);
        } catch (error) {
          setLoading(false);
          message.error("You haven't login");
        }
      })();
    }
  }, [id]);

  const detelePlaylist = (playlist: Playlist) => {
    message.error('We have develop in next version');
    // setLoading(true);
    // async () => {
    //   try {
    //     PlaylistApiFp.playlistDeleteById({ id: playlist.id.toString() }, authorization())();
    //     setLoading(false);
    //     message.success('Detele success');
    //   } catch (error) {
    //     setLoading(false);
    //     message.error('Detele not success .Please try again');
    //   }
    // };
  };
  const renamePlayList = (playlist: Playlist) => {
    message.error('We have develop in next version');
    // async () => {
    //   try {
    //     PlaylistApiFp.playlistPrototypePatchAttributes(
    //       { id: playlist.id.toString(), data: playlist },
    //       authorization()
    //     )();
    //     setLoading(false);
    //     message.success('Rename success');
    //   } catch (error) {
    //     message.error('Rename not success .Please try again');
    //   }
    // };
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="text" onClick={() => renamePlayList(playlist)}>
          Rename
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="text" className="text-red-700" onClick={() => detelePlaylist(playlist)}>
          Detele
        </Button>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <PlayList>
      <div className="">
        {loading && <Loading></Loading>}
        <div className="flex justify-between items-center">
          {playlist && <h1 className="font-bold text-4xl text-white">{playlist.name}</h1>}
          <Dropdown overlay={menu} placement="bottomRight">
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined style={{ fontSize: '32px' }} />
            </a>
          </Dropdown>
        </div>
        <Modal
          title="Do you want delete PlayList"
          visible={visible}
          onOk={() => detelePlaylist(playlist)}
          // onCancel={hideModal}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Do you want to delete this playlist?</p>
        </Modal>
        {listTrack.length === 0 ? (
          <div className=" tablet:-mx-32 ipad:mx-0">
            <div className="w-full  tablet:w-104 laptop:w-560 bg-gray-500 desktop:w-816 ">
              <div className="py-10 px-4 text-center desktop:py-20 desktop:px-28">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto relative">
                  <div className="relative top-11 left-4">
                    <div className="w-3/4 h-1 my-4 bg-gray-700"></div>
                    <div className="w-3/4 h-1 my-4 bg-gray-700"></div>
                    <div className="w-3/4 h-1 my-4 bg-gray-700"></div>
                  </div>
                </div>
                <div className=" text-4xl font-bold my-4">No tracks yet</div>
                <div className="text-lg desktop:text-2xl">
                  Get inspired by browsing some music and sound effects.
                </div>
                <div className="">
                  <button className=" text-xl mx-4 my-2 w-48 h-12 bg-blue-500 cursor-pointer hover:text-black desktop:w-52 ">
                    <Link href="/music/Genres">
                      <a className="hover:text-black">Browse Music</a>
                    </Link>
                  </button>
                  <button className="text-xl mx-4 my-2 w-48 h-12 bg-transparent border-2 cursor-pointer desktop:w-52 ">
                    <Link href="/sound-effects">
                      <a>Browse Sound</a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <ListTrack listTrack={listTrack} />
          </div>
        )}
      </div>
    </PlayList>
  );
}
