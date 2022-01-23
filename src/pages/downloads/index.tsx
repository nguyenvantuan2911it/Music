import { Button, message } from 'antd';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { AccountApiFp } from 'src/api/api';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import MainLayout from 'src/components/common/LayOut/Layout';
import Loading from 'src/components/common/Loading/Loading';
import ListTrack from 'src/components/TrackModule/ListTrack';
import { listTrackAsync, listTrackViewMoreAsync, selectTrack } from 'src/features/track/Trackslice';
import Navchildren from '../../components/common/Navchildren';

export default function DownLoad() {
  const { listTrack, isLoading, viewMore } = useAppSelector(selectTrack);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);

  const [disableViewMore, setDisableViewMore] = useState(false);

  useEffect(() => {
    dispatch(listTrackAsync({ type: 'Download' }));
  }, []);

  const handelViewMore = async () => {
    if (!viewMore) {
      setCount(count + 1);
      dispatch(listTrackViewMoreAsync({ type: 'Download', skip: count * 5 }));
    }
  };
  return (
    <MainLayout disableTab>
      {isLoading ? (
        <>
          <div className="h-123 w-full bg-transparent"></div>
          <Loading />
        </>
      ) : (
        <>
          <div className=" hidden mt-20 laptop:flex w-full" style={{ color: 'white' }}>
            <div className="flex items-center">
              <Navchildren />
            </div>
          </div>
          {listTrack.length <= 0 ? (
            <>
              <div className="text-2xl ">You have yet download any Track file</div>
              <div className="flex  flex-row gap-5 mt-7">
                <Button
                  onClick={() => {
                    router.push('/');
                  }}
                  className="bg-cyan-600 "
                  type="primary"
                  style={{ color: 'black' }}
                >
                  Go to PlayList
                </Button>
                <Button
                  onClick={() => {
                    router.push('/sound-effect');
                  }}
                  className="bg-cyan-600 "
                  type="primary"
                  style={{ color: 'black' }}
                >
                  Go to Sound Effect
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-20 laptop:mt-0"></div>
              <ListTrack listTrack={listTrack}></ListTrack>
              <div className="text-center mt-6 ">
                {!viewMore && (
                  <Button className=" bg-black text-white border-white" onClick={handelViewMore}>
                    View More
                  </Button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </MainLayout>
  );
}
