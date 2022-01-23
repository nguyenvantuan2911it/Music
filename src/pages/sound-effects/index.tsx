import React from 'react';
import { GenreApiFp } from 'src/api/api';
import Feature from 'src/components/common/Feature/ListFeature';
import MainLayout from 'src/components/common/LayOut/Layout';
import MuiscGenerNav from 'src/components/common/NavFooterContent/Music-Gener';

export default function DynamicPage({ posts }) {
  return (
    <div>
      <MainLayout disableTab>
        <div className="mt-[80px]">
          {posts.length > 0 && (
            <Feature
              music_sound="music"
              type_music="Sound-effect"
              listFeature={posts}
              title="Sound-effect"
            />
          )}
        </div>
        <MuiscGenerNav listMusic={posts} />
      </MainLayout>
    </div>
  );
}
export async function getStaticProps() {
  const filtersound = {
    limit: 10,
    where: { soundEffect: 'true' },
  };
  const posts = await GenreApiFp.genreFind({ filter: JSON.stringify(filtersound) })();
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts,
    },
    revalidate: 3600,
  };
}

// export async function getStaticPaths() {
//   const posts = [
//     {
//       musictype: 'Sound-effect',
//     },
//   ];
//   const paths = posts.map((post) => ({
//     params: { musictype: post.musictype },
//   }));
//   return { paths, fallback: 'blocking' };
// }
