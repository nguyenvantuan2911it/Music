import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function index() {
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (pathname == '/music') {
      router.push('/music/Feature');
    }
  }, [pathname]);
  return <div></div>;
}

export default index;
