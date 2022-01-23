import { useRouter } from 'next/router';
import React from 'react';
import { BAs3_T0k3n, BASE_PATH } from 'src/api/api';
import styles from './Feature.module.scss';

export interface FeatureProps {
  listFeature: any[];
  title?: String | String[];
  type_music?: String | String[];
  music_sound?: String;
  type?: String;
}

export default function Feature(props: FeatureProps) {
  const router = useRouter();
  const { listFeature, title, music_sound, type_music } = props;

  let checkTitle = false;
  if (title === 'Feature') {
    checkTitle = true;
  }
 
  const onClickdetailTag = (post: any) => {
    router.push({
      pathname: `/${music_sound}/${type_music}/${post.id}`,
    });
  };

  return (
    <div className={styles.listFeature}>
      <h2 className={styles.description}> Feature {checkTitle ? ' playlists & themes' : title}</h2>
      <div className={styles.feature_image}>
        {listFeature &&
          listFeature.map((post, index) => (
            <div
              key={index}
              className={styles.feature_music}
              onClick={() => {
                onClickdetailTag(post);
              }}
            >
              <button className={styles.feature_music_button}>
                <div className={styles.feature_1}>
                  <div className={styles.feature}>
                    <img
                      className=" w-full h-full "
                      src={`${BASE_PATH}/Containers/images/download/${post.coverImage}?access_token=${BAs3_T0k3n}`}
                      alt="Sunset in the mountains"
                    />
                  </div>
                </div>
                <div className={styles.slug}>{post.slug}</div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
