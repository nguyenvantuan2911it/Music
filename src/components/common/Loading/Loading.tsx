import * as React from 'react';
import s from './Loading.module.scss';
export interface LoadingProps {}

export default function Loading(props: LoadingProps) {
  return (
    <div className={s.box}>
      <div className={s.container}>
        <div className={s.ring}></div>
        <div className={s.ring}></div>
        <div className={s.ring}></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}
