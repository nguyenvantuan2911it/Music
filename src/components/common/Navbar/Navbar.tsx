import { ExclamationCircleOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getStoreLocal, signout } from 'src/features/auth/AuthSlice';
import styles from './Navbar.module.scss';

const { Title } = Typography;
const { confirm } = Modal;

const Navigation = () => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const handleToggle = () => setIsHidden(!isHidden);
  const dispatch = useDispatch();

  const showPromiseConfirm = () => {
    confirm({
      title: 'Are you sure want signout?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, web will signout',
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
    <Row align="middle" justify="space-between" className={styles.nav}>
      {/* <Container className={styles.nav_container}> */}
      <div className="container mx-auto">
        <div className={styles.nav_container}>
          <Link href="/">
            <a>
              <Title level={3} className={styles.title}>
                SGM Music
              </Title>
            </a>
          </Link>

          <div className="flex items-center gap-10 flex-row-reverse">
            {isHidden ? (
              <MenuOutlined className={styles.navbar__toggle} onClick={handleToggle} />
            ) : (
              <div
                className={styles.navbar__toggle}
                style={{ fontSize: '26px', marginLeft: '8px' }}
                onClick={handleToggle}
              >
                X
              </div>
            )}
            <SearchOutlined
              className={styles.navbar__toggle}
              style={{ fontSize: '26px' }}
              onClick={() => {
                router.push('/search');
              }}
            />
          </div>
          <Row className={styles.menu}>
            <Link href="/music">
              <Col className={styles.menu__item}>
                <a
                  className={`${router.pathname == '/music/[musictype]' ? `${styles.active}` : ''}`}
                >
                  Music
                </a>
              </Col>
            </Link>
            <Link href="/sound-effects">
              <Col className={styles.menu__item}>
                <a className={`${router.pathname == '/sound-effects' ? `${styles.active}` : ''}`}>
                  Sound Effect
                </a>
              </Col>
            </Link>
            <Link href="/landing/our-music-licenses">
              <Col className={styles.menu__item}>
                <a
                  className={`${
                    router.pathname == '/landing/our-music-licenses' ? `${styles.active}` : ''
                  }`}
                >
                  Licenses
                </a>
              </Col>
            </Link>
            <Link href="/pricing">
              <Col className={styles.menu__item}>
                <a className={`${router.pathname == '/pricing' ? `${styles.active}` : ''}`}>
                  Pricing
                </a>
              </Col>
            </Link>
            {getStoreLocal('token') ? (
              <Link href="/my-music">
                <Col className={styles.menu__item}>
                  <a
                    className={`${
                      router.pathname.split('/')?.[1] == 'account' ? `${styles.active}` : ''
                    }`}
                  >
                    Me
                  </a>
                </Col>
              </Link>
            ) : (
              <Link href="/login">
                <a className={styles.menu__item}>Login</a>
              </Link>
            )}
            <Link href="/search">
              <Col className={styles.menu__item}>
                <SearchOutlined style={{ fontSize: '20px' }} />
              </Col>
            </Link>
          </Row>

          <div className={isHidden ? styles.hideonmobile && styles.hideonpc : styles.menu223}>
            <Link href="/music/Feature">
              <a
                className="text-white py-2 text-bold px-6"
                style={{ fontSize: '22px' }}
                onClick={handleToggle}
              >
                Featured
              </a>
            </Link>
            <Link href="/music/Genres">
              <a
                className="text-white py-2 text-bold px-6"
                style={{ fontSize: '22px' }}
                onClick={handleToggle}
              >
                Genres
              </a>
            </Link>
            <Link href="/music/Moods">
              <a
                className="text-white py-2 text-bold px-6"
                style={{ fontSize: '22px' }}
                onClick={handleToggle}
              >
                Moods
              </a>
            </Link>
            <Link href="/sound-effects">
              <a className="text-white py-2 text-bold px-6" style={{ fontSize: '22px' }}>
                Sound Effects
              </a>
            </Link>
            <Link href="/landing/our-music-licenses">
              <a className="text-white py-2 text-bold px-6" style={{ fontSize: '22px' }}>
                Licenses Model
              </a>
            </Link>
            <Link href="/pricing">
              <a className="text-white py-2 text-bold px-6 pb-4" style={{ fontSize: '22px' }}>
                Pricing
              </a>
            </Link>
            <div className="mx-10 border-t-2 border-gray-800 ">
              <div className="flex flex-col -mx-10 pt-2">
                {getStoreLocal('token') && (
                  <>
                    <Link href="/my-music">
                      <a
                        onClick={handleToggle}
                        className="text-white py-2 text-bold px-6"
                        style={{ fontSize: '22px' }}
                      >
                        Playlist
                      </a>
                    </Link>
                    <Link href="/account">
                      <a
                        onClick={handleToggle}
                        className="text-white py-2 text-bold px-6"
                        style={{ fontSize: '22px' }}
                      >
                        Account
                      </a>
                    </Link>
                    <Link href="/downloads">
                      <a
                        onClick={handleToggle}
                        className="text-white py-2 text-bold px-6"
                        style={{ fontSize: '22px' }}
                      >
                        Download
                      </a>
                    </Link>
                    <Link href="/referral">
                      <a
                        onClick={handleToggle}
                        className="text-white py-2 text-bold px-6"
                        style={{ fontSize: '22px' }}
                      >
                        Referral
                      </a>
                    </Link>
                  </>
                )}
              </div>
              {getStoreLocal('token') ? (
                <div onClick={showPromiseConfirm}>
                  <button className="w-full h-10 border-2 border-red my-2 mb-80 ">
                    <div className="text-red-800 text-bold" style={{ fontSize: '22px' }}>
                      Sign out
                    </div>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  <button className="w-full h-14 border-2 bg-blue-500 border-blue-500 my-2 mb-80 ">
                    <div className="text-white text-bold text-2xl">Login</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* </Container> */}
    </Row>
  );
};
export default Navigation;
// const rootElement = document.getElementById('root');
// ReactDOM.render(<Navigation />,rootElement)
