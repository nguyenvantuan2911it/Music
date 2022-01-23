import { Button, message } from 'antd';
import { divide } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BAs3_T0k3n, BASE_PATH, GenreApiFp } from 'src/api/api';
import { useAppSelector } from 'src/app/hooks';
import MainLayout from 'src/components/common/LayOut/Layout';
import Loading from 'src/components/common/Loading/Loading';
import ListTrack from 'src/components/TrackModule/ListTrack';
import { getTagById, selectListMusic } from 'src/features/musicTag/musicSlice';
import {
  getlistTrackbyId,
  listTrackViewMoreAsync,
  selectTrack,
} from 'src/features/track/Trackslice';
import s from './Detail.module.scss';

export interface DetailProps {
  id: string | number;
}
export default function Detail(props: DetailProps) {
  const router = useRouter();
  const {
    query: { params },
  } = router;
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { tagbyID } = useAppSelector(selectListMusic);
  const { listTrackId, isLoading, viewMore } = useAppSelector(selectTrack);

  useEffect(() => {
    if (!params) return;
    let checkType = params[0];
    if (params[0] === 'Sound-effect') {
      checkType = 'Genres';
    }
    dispatch(getTagById({ type: checkType, id: params[1] }));
  }, [params]);

  useEffect(() => {
    if (!params) return;
    let checkType2 = params[0];
    if (params[0] === 'Sound-effect') {
      checkType2 = 'Genres';
    }
    if (tagbyID) {
      dispatch(getlistTrackbyId({ type: checkType2, id: tagbyID.id }));
    }
  }, [tagbyID, params]);

  const filterdemo = (numberskip: number) => {
    return {
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
      skip: numberskip,
    };
  };
  const handelViewMore = async () => {
    if (!params) return;

    let checkType = params[0];
    if (params[0] === 'Sound-effect') {
      checkType = 'Genres';
    }
    console.log(checkType);
    if (!viewMore) {
      setCount(count + 1);
      const res = await GenreApiFp.genrePrototypeGetTrack({
        id: params[1],
        filter: JSON.stringify(filterdemo(count * 5)),
      })();
      console.log(res);
      dispatch(listTrackViewMoreAsync({ type: checkType, skip: count * 5, id: tagbyID.id }));
    }
  };

  return (
    <MainLayout disableTab>
      {isLoading && <Loading />}
      {params && (
        <div className="mt-20  laptop:mx-4 desktop:mx-0">
          <div className="flex flex-col-reverse laptop:flex-row">
            <div className="laptop:w-1/2 my-auto desktop:my-10">
              <ul className="flex items-center gap-4 text-xl">
                <Link href={`/music/${params[0]}`}>
                  <li className="">{params[0]}</li>
                </Link>
                <div className="">/</div>
                <Link href={`/music/${params[0]}/christmas`}>
                  <li className="">{tagbyID?.tag}</li>
                </Link>
              </ul>
              <span className="py-8 text-5xl">{tagbyID?.slug}</span>
            </div>
            <div className="w-52 h-52 my-8 laptop:w-1/2 laptop:h-96">
              <img
                src={`${BASE_PATH}/Containers/images/download/${tagbyID?.coverImage}?access_token=${BAs3_T0k3n}`}
                className=" w-full h-full object-cover desktop:w-3/4 desktop:float-right"
                alt=""
                loading="eager"
              />
            </div>
          </div>
          <div className={s.container}>
            <div className={s.list}>
              {listTrackId.length > 0 ? (
                <span className=" ">
                  <ListTrack listTrack={listTrackId}></ListTrack>
                  {!viewMore && (
                    <div className=" mx-auto w-[80px] mt-5">
                      <Button
                        onClick={handelViewMore}
                        className=" bg-black text-white border-white  "
                      >
                        View More
                      </Button>
                    </div>
                  )}
                </span>
              ) : (
                <div className="text-lg">No Track For This Type</div>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
