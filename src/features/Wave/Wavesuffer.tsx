import {
  ArrowDownOutlined,
  DashOutlined,
  PauseCircleOutlined,
  PlayCircleFilled,
  PlusOutlined,
  ShoppingCartOutlined,
  SoundOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { message, notification, Slider } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountApiFp, BAs3_T0k3n, BASE_PATH, PlaylistApiFp, Track, TrackApiFp } from 'src/api/api';
import Loading from 'src/components/common/Loading/Loading';
import LoadingWave from 'src/components/common/LoadingWave/LoadingWave';
import ModalAddPlayList from 'src/components/common/Modal/ModalAddPlayList';
import ModalDownload from 'src/components/common/Modal/ModalDownload';
import Modal from 'src/components/Modal';
import { useAppSelector } from '../../app/hooks';
import { ModalPlayList } from '../../components/common/Modal/ModalPlayList';
import { authorization, getStoreLocal } from '../auth/AuthSlice';
import { play, playmusic, selectstatus, selecttrack, stop } from '../playmusic/PlaySlice';
import { selectProject } from '../project/ProjectSlice';
import { downloadTrack } from '../track/TrackDownloadSlice';
import s from './Wavesuffer.module.scss';
interface Props {
  listTrack: any;
}

export interface WTrack {
  track: Track;
  isPlay: Boolean;
  ref: any;
}

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#767676',
  progressColor: '#ffffff',
  barWidth: 2,
  barRadius: 1,
  responsive: true,
  height: 50,
  normalize: true,
  partialRender: true,
  overflow: false,
});

function secondsToTimestamp(seconds) {
  seconds = Math.floor(seconds);
  let h: string | number = Math.floor(seconds / 3600);
  let m: string | number = Math.floor((seconds - h * 3600) / 60);
  let s: string | number = seconds - h * 3600 - m * 60;

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
}

function Wavesuffer(props: Props) {
  const { listTrack } = props;
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const { listProject } = useAppSelector(selectProject);
  const [durationTime, setdurationTime] = useState('');
  const [currentTimeTrack, setcurrentTimeTrack] = useState('');
  const [trackW, setTrackW] = useState(undefined);
  const [showModalCreatePlayList, setShowModalCreatePlayList] = useState(false);
  const status = useAppSelector(selectstatus);
  const dispatch = useDispatch();
  const trackid = useAppSelector(selecttrack);
  const [showModal, setShowModal] = useState(false);
  const [showModalPlayList, setShowModalPlayList] = useState(false);
  const [currentTrack, setcurrentTrack] = useState<Track | null>(undefined);
  const [showAction, setShowAction] = useState(false);
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState(30);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showToastify, setShowToastify] = useState(false);

  useEffect(() => {
    setcurrentTrack(trackW);
    if (trackW !== currentTrack) {
      create();
    }
    return () => {
      wavesurfer.current?.destroy();
      dispatch(
        play({
          status: 'play',
        })
      );
    };
  }, [trackW, trackid]);

  useEffect(() => {
    if (!trackid) return;
    (async () => {
      try {
        const result = await TrackApiFp.trackFindById({
          id: trackid,
        })();
        setTrackW(result);
      } catch (error) {}
    })();
  }, [trackid]);

  useEffect(() => {
    if (!wavesurfer.current) return;
    if (status === 'play') {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [status]);

  const create = async () => {
    setLoading(true);
    const WaveSurfer = (await import('wavesurfer.js')).default;
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    const file = `${BASE_PATH}/Containers/files/download/${trackW.file}?access_token=${BAs3_T0k3n}`;
    wavesurfer.current.load(file);
    wavesurfer.current.on('ready', () => {
      wavesurfer.current.play();
      setLoading(false);
    });

    wavesurfer.current.on('finish', () => {
      const index = listTrack.findIndex((item) => item.id === trackW.id);
      dispatch(
        playmusic({
          status: 'play',
          trackid: index === listTrack.length - 1 ? listTrack[0].id : listTrack[index + 1].id,
        })
      );
    });
    wavesurfer.current.on('audioprocess', () => {
      if (wavesurfer.current.isPlaying()) {
        const totalTime = wavesurfer.current.getDuration();
        const currentTime = wavesurfer.current.getCurrentTime();
        setcurrentTimeTrack(currentTime);
        setdurationTime(secondsToTimestamp(totalTime));
        setTime(secondsToTimestamp(currentTime));
        setValue((currentTime * 100) / totalTime);
      }
    });
  };

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
      message.error('Please login before download');
      router.push('/login');
    }
  };
  const handlePlayPause = () => {
    wavesurfer.current.playPause();
    if (status === 'play') {
      dispatch(stop({ status: 'stop' }));
    } else {
      dispatch(play({ status: 'play' }));
    }
  };
  const handleChangeVolume = (value) => {
    setVolume(value);
    wavesurfer.current.setVolume(value / 100);
  };
  const openNotificationWithIcon = (noti) => {
    notification[noti.type]({
      message: noti.message,
      description: noti.description,
    });
  };
  const handleHideModal = (hide) => {
    setShowModal(hide);
  };

  const handleHideModalPlayList = (hide) => {
    setShowModalPlayList(hide);
  };

  const handleAddTrack = async (playlist, hide) => {
    try {
      await PlaylistApiFp.playlistPrototypeLinkTracks(
        {
          id: playlist.id,
          fk: trackid,
        },
        authorization()
      )();
    } catch (error) {}
    setShowModalPlayList(hide);
  };
  const handleAddToCart = async (value) => {
    const id = getStoreLocal('id');
    try {
      await AccountApiFp.accountPrototypeCreateCart({
        id,
        data: value,
      })();
    } catch (error) {
      console.log('Error add to cart');
    }
    router.push('/licensing/checkout/');
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
    } catch (error) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }
    setShowModalPlayList(false);
  };
  return (
    <>
      {loading && <Loading />}
      {loading && <LoadingWave />}
      <footer className={s.footer}>
        <div
          id="id"
          className="absolute left-0 right-0 w-full desktop:hidden z-1000"
          style={{ bottom: '76px' }}
        >
          <progress
            id="progess"
            value={value}
            max="100"
            className={s.test}
            onClick={(e) => {
              const x = e.pageX;
              const width = document.getElementById('id').offsetWidth;
              var sec = wavesurfer.current.getDuration();
              wavesurfer.current.setCurrentTime((x / width) * sec);
              setValue((x / width) * 100);
            }}
          ></progress>
        </div>
        <div className="flex h-full items-center justify-between mx-4 ipad:mx-8 ">
          <div className="controls flex items-center w-104 laptop:w-368">
            <div className="flex items-center">
              <div className="text-white pr-4 cursor-pointer" onClick={handlePlayPause}>
                {status === 'play' ? (
                  <PauseCircleOutlined style={{ fontSize: '40px' }} />
                ) : (
                  <PlayCircleFilled style={{ fontSize: '40px' }} />
                )}
              </div>
              <div
                className="mb-2 cursor-pointer"
                style={{ fontSize: '36px' }}
                onClick={() => {
                  const index = listTrack.findIndex((item) => item.id === trackW.id);
                  dispatch(
                    playmusic({
                      status: 'play',
                      trackid:
                        index === listTrack.length - 1 ? listTrack[0].id : listTrack[index + 1].id,
                    })
                  );
                }}
              >
                <StepForwardOutlined />
              </div>
            </div>
            <div className="px-8" style={{ width: '250px' }}>
              {trackW?.name && trackW?.name.split(' ').length >= 3 ? (
                <div className={s.marquee}>
                  <p className="text-lg font-semibold"> {trackW?.name} </p>
                </div>
              ) : (
                <p className="text-lg font-semibold"> {trackW?.name} </p>
              )}

              <div className="text-base font-semibold">Vũ</div>
            </div>
          </div>
          <div id="waveform-time-indicator" style={{ width: '35%' }}>
            <div id="waveform" ref={waveformRef} className="hidden desktop:block visible" />
            <div className=" hidden justify-between items-center   laptop:flex  desktop:flex-row ">
              <div>
                <span className="text-white">{time}/</span>
                <span className="text-white">{durationTime}</span>
              </div>
              <div className="flex w-60" style={{ width: '200px' }}>
                <Slider
                  className="w-full"
                  min={0}
                  max={100}
                  onChange={handleChangeVolume}
                  value={typeof volume === 'number' ? volume : 0}
                />
                <SoundOutlined className="pl-2 text-lg" />
              </div>
            </div>
          </div>
          <div className="hidden text-xs laptop:block">
            <div className="flex">
              {/* <div className="mx-4">
                  <SlidersOutlined
                  className="text-xl mx-auto block"
                  // onClick={() => handleDownloadFile(track)}
                  />
                  <p>Stems</p>
                  </div>
                  <div className="mx-4">
                  <FieldTimeOutlined
                  className="text-xl mx-auto block"
                  // onClick={() => handleDownloadFile(track)}
                  />
                  <p>Find Similar</p>
                </div> */}
              <div className="mx-4 cursor-pointer" onClick={() => setShowModal(true)}>
                <ShoppingCartOutlined
                  className="text-xl mx-auto block"
                  // onClick={() => handleAddToCart(track)}
                />
                <p>Add to cart</p>
              </div>
              <div
                className="mx-4 cursor-pointer"
                onClick={() => {
                  const id = getStoreLocal('id');
                  if (!id) {
                    setShowModalPlayList(false);
                    setShowToastify(true);
                  } else {
                    setShowModalPlayList(true);
                  }
                }}
              >
                <PlusOutlined className="text-xl mx-auto block" />
                <p>Add to playlist</p>
              </div>
              <div className="ml-4 cursor-pointer">
                <ArrowDownOutlined
                  className="text-xl mx-auto block"
                  onClick={() => handleDownloadFile(trackW)}
                />
                <p>Download</p>
              </div>
            </div>
          </div>
          <div className="hidden tablet:flex px-4 text-3xl w-40 items-center gap-8 laptop:hidden">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowAction(true);
              }}
            >
              <DashOutlined />
            </div>
            <PlusOutlined onClick={() => setShowModalPlayList(true)} />
          </div>
        </div>
      </footer>
      {showAction && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 laptop:hidden">
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
            <button className="my-4 w-full h-12 text-xl bg-blue-500">Add to playlist</button>
            <div className="my-4 border-t-2 border-gray-500">
              <div className="py-6 text-2xl">
                <div
                  onClick={() => {
                    setShowModal(true);
                    setShowAction(false);
                  }}
                  className="flex items-center py-4 hover:bg-gray-700 cursor-pointer "
                >
                  <ShoppingCartOutlined />
                  <span className="text-base px-4 font-semibold">Buy License</span>
                </div>

                <div
                  onClick={() => {
                    setShowAction(false);
                  }}
                  className="flex items-center py-4 hover:bg-gray-700 cursor-pointer"
                >
                  <ArrowDownOutlined />
                  <span className="text-base px-4 font-semibold">Download</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalDownload
        visible={visible}
        setVisible={setVisible}
        title={'YOU’VE ALREADY DOWNLOADED 3 TRACKS'}
      ></ModalDownload>
      {showModal && <Modal onHideModal={handleHideModal} onAddToCart={handleAddToCart} />}
      {showModalPlayList && (
        <ModalAddPlayList
          onShowModalCreate={() => {
            setShowModalCreatePlayList(true);
          }}
          onAddTrack={handleAddTrack}
          onHideModalPlayList={handleHideModalPlayList}
        />
      )}
      {showModalCreatePlayList && (
        <ModalPlayList
          onSubmit={handleSubmit}
          list={listProject}
          hideModal={(hide) => setShowModalCreatePlayList(hide)}
        />
      )}
      {showToastify && (
        <div className="fixed bottom-4 right-8 " style={{ zIndex: 15000 }}>
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
    </>
  );
}

export default Wavesuffer;
