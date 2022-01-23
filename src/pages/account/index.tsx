import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from 'src/components/common/LayOut/Layout';
import { getStoreLocal, signout } from 'src/features/auth/AuthSlice';
import Navchildren from '../../components/common/Navchildren';
export interface IAccountProps {
  children: ReactNode;
}
const { confirm } = Modal;
export default function AccountInfo(props: IAccountProps) {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getStoreLocal('token');
    if (!Boolean(token)) {
      router.push('/login');
    }
    if (pathname == '/account') {
      router.push('/account/profile');
    }
  }, [pathname]);

  const { children } = props;
  const handleSignout = () => {
    confirm({
      title: 'Are you sure want sign out?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, web will sign out',
      onOk() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        dispatch(signout());
        router.push('/login');
      },
      onCancel() {},
    });
  };
  return (
    <>
      {pathname && (
        <MainLayout disableTab>
          <div style={{ marginTop: '80px' }}></div>
          <div className="  laptop:block w-full" style={{ color: 'white' }}>
            <div className="hidden items-center laptop:flex ">
              <Navchildren />
            </div>
          </div>
          <div className="laptop:grid grid-cols-12 my-10">
            <div className=" laptop:block col-span-3 " style={{ color: 'white' }}>
              <div className="text-xl text-gray-500 flex gap-4 flex-wrap laptop:text-base laptop:flex-col laptop:gap-2">
                <Link href="/account/subscriptions">
                  <div className="mb-4 cursor-pointer hover:text-white">
                    <span className={`${pathname == '/account/subscriptions' ? 'text-white' : ''}`}>
                      Subscriptions
                    </span>
                  </div>
                </Link>
                <Link href="/account/profile">
                  <div className="mb-4 cursor-pointer hover:text-white">
                    <span className={`${pathname == '/account/profile' ? 'text-white' : ''}`}>
                      Profile
                    </span>
                  </div>
                </Link>
                <Link href="/account/preferences">
                  <div className="mb-4 cursor-pointer hover:text-white">
                    <span className={`${pathname == '/account/preferences' ? 'text-white' : ''}`}>
                      Preferences
                    </span>
                  </div>
                </Link>
                <button onClick={handleSignout}>
                  <div className="mb-4  text-red-700 float-left hidden laptop:block">Sign out</div>
                </button>
              </div>
            </div>
            <div className="w-full laptop:col-span-9 my-10">{children}</div>
          </div>
        </MainLayout>
      )}
    </>
  );
}
