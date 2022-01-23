import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import MyMusic from '..';

export interface ProjectProps {
  children: ReactNode;
}

export default function Project(props: ProjectProps) {
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
