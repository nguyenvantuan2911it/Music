import Link from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { fetchTitleofType, selectType } from 'src/features/MuiscGener/MuiscGenerSlice';

export interface MuiscGenerNavProps {
  listMusic: any;
}

export default function MuiscGenerNav({ listMusic }) {
  const dispatch = useDispatch();
  // const { list } = useAppSelector(selectType);
  // const [checktype, setCheckType] = useState<String | String[]>('');
  const [list, setList] = useState([]);
  useEffect(() => {
    // @ts-ignore
    // console.log(query.musictype);
    // if (query.musictype === undefined) {
    //   setCheckType('Sound-effect');
    // } else {
    //   setCheckType(query.musictype);
    // }
    setList(listMusic);
    console.log(list);
    // dispatch(fetchTitleofType({ type: checktype }));
    // console.log(list, listMusic);
  }, []);

  const a = listMusic.reduce((array, item, index) => {
    array[index] = list.filter((items) => items.fatherGenreId === item.id);
    return array;
  }, []);
  const newArray = [[], [], [], [], [], []];
  a.forEach((item, index) => {
    newArray[Math.floor((index * 6) / a.length)].push(item);
  });
  const newA = [[], [], [], [], [], []];
  listMusic.forEach((item, index) => {
    newA[Math.floor((index * 6) / listMusic.length)].push(item);
  });

  const router = useRouter();
  const { query } = router;

  return (
    <>
      {newArray.length === 6 && (
        <>
          <div className="text-xl mt-2">A — Z</div>
          <div className="grid grid-cols-12 gap-x-4 tablet:gap-x-8">
            {newArray.map((item, indexs) => {
              return (
                <div
                  key={indexs}
                  className="col-span-6 ipad:col-span-4 laptop:col-span-3 desktop:col-span-2 cursor-pointer"
                >
                  {item.map((items, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2 mt-8">
                        {query.musictype === undefined ? (
                          <Link href={`/music/Sound-effect/${newA[indexs][index].id}`}>
                            <div className="text-base font-semibold">{newA[indexs][index].tag}</div>
                          </Link>
                        ) : (
                          <Link href={`/music/${query.musictype}/${newA[indexs][index].id}`}>
                            <div className="text-base font-semibold">{newA[indexs][index].tag}</div>
                          </Link>
                        )}

                        {items.map((itemss, indexss) => {
                          if (query.musictype === undefined) {
                            return (
                              <Link href={`/music/Sound-effect/${itemss.id}`} key={indexss}>
                                <div className=" text-gray-600 text-base hover:text-white font-semibold">
                                  {itemss.tag}
                                </div>
                              </Link>
                            );
                          } else {
                            return (
                              <Link href={`/music/${query.musictype}/${itemss.id}`} key={indexss}>
                                <div className=" text-gray-600 text-base hover:text-white font-semibold">
                                  {itemss.tag}
                                </div>
                              </Link>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
