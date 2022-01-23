import { useRouter } from 'next/router';
import React from 'react';
import { GenreApiFp, MoodApiFp, TrackApiFp } from 'src/api/api';
import { useAppSelector } from 'src/app/hooks';
import Feature from 'src/components/common/Feature/ListFeature';
import MainLayout from 'src/components/common/LayOut/Layout';
import Loading from 'src/components/common/Loading/Loading';
import MuiscGenerNav from 'src/components/common/NavFooterContent/Music-Gener';
import ListTrack from 'src/components/TrackModule/ListTrack';
import { selectListMusic } from 'src/features/musicTag/musicSlice';
import { selectTrack } from 'src/features/track/Trackslice';

export default function DynamicPage({ posts, listTrack }) {
  const { isLoading } = useAppSelector(selectListMusic);
  const storeTrack = useAppSelector(selectTrack);
  const router = useRouter();
  const {
    query: { musictype },
  } = router;

  return (
    <div>
      <MainLayout>
        {(isLoading || storeTrack.isLoading) && <Loading />}
        {posts.length > 0 && (
          <Feature
            music_sound="music"
            type_music={musictype}
            listFeature={posts}
            title={musictype}
          />
        )}

        {musictype === 'Feature' && (
          <div className="flex items-center gap-2">
            <div className="w-20 h-20">
              <img src="/satffpick.jpeg" alt="" />
            </div>
            <div className="flex flex-col">
              <strong>Staff Pick</strong>
              <span>Our favorite tracks right now — updated weekly</span>
            </div>
          </div>
        )}

        {listTrack.length > 0 && <ListTrack listTrack={listTrack}></ListTrack>}

        <MuiscGenerNav listMusic={posts} />
      </MainLayout>
    </div>
  );
}

export async function getStaticProps(context) {
  const { musictype } = context.params;
  const filter = {
    limit: 10,
  };
  const getGenre = async () => {
    switch (musictype) {
      case 'Genres':
        return await GenreApiFp.genreFind({ filter: JSON.stringify(filter) })();
      case 'Moods':
        return await MoodApiFp.moodFind({ filter: JSON.stringify(filter) })();
      case 'Feature':
        return await GenreApiFp.genreFind({ filter: JSON.stringify(filter) })();
      default:
        return undefined;
    }
  };
  const filterTrack = {
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
  const posts = await getGenre();

  const listTrackAsync = async () => {
    switch (musictype) {
      case 'Feature':
        return await TrackApiFp.trackFind({
          filter: JSON.stringify(filterTrack),
        })();
      default:
        return [];
    }
  };
  const listTrack = await listTrackAsync();
  if (posts === undefined) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts,
      listTrack,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = [
    {
      musictype: 'Feature',
    },
    {
      musictype: 'Genres',
    },
    {
      musictype: 'Moods',
    },
  ];
  const paths = posts.map((post) => ({
    params: { musictype: post.musictype },
  }));
  return { paths, fallback: 'blocking' };
}
