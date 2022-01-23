import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectPlayList } from 'src/features/playlist/PlayListSlice';
import { selectProject } from 'src/features/project/ProjectSlice';
import MyMusic from '..';

export interface PlayListProps {
  children: ReactNode;
}

export default function PlayList(props: PlayListProps) {
  const { children } = props;
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCheck(true);
    }
  }, []);

  return (
    <>
      {check ? (
        <MyMusic disableButton>
          <div>{children}</div>
        </MyMusic>
      ) : (
        <MyMusic>
          <div>{children}</div>
        </MyMusic>
      )}
    </>
  );
}
