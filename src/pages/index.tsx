import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (pathname == '/') {
      router.push('/music/Feature');
    }
  }, [pathname]);
  return <div></div>;
};

export default IndexPage;
