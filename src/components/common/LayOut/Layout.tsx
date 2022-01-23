import React, { ReactNode } from 'react';
import { TabLink } from 'src/interface/tab';
import { useAppSelector } from '../../.././app/hooks';
import { selectstatus } from '../../../features/playmusic/PlaySlice';
import Wavesuffer from '../../../features/Wave/Wavesuffer';
import Footer from '../Footer/Footer';
import Navigation from '../Navbar/Navbar';
import Tab from '../Tab/Tab';

interface Props {
  children: ReactNode;
  disableTab?: boolean;
  disableNav?: boolean;
  listTab?: TabLink[];
}

const listTabdefault: TabLink[] = [
  { url: '/music/Feature', tabName: 'Feature' },
  { url: '/music/Genres', tabName: 'Genres' },
  { url: '/music/Moods', tabName: 'Moods' },
];

const MainLayout = (props: Props) => {
  const { children, listTab = listTabdefault, disableTab = false, disableNav = false } = props;
  const status = useAppSelector(selectstatus);
  return (
    <div className="h-full" style={{ backgroundColor: '#0F0F0F' }}>
      {!disableNav && <Navigation />}
      <div
        style={{ backgroundColor: '#0F0F0F' }}
        className="px-5 relative container mx-0 tablet:px-16 tablet:mx-auto"
      >
        {!disableTab && <Tab listTab={listTab}></Tab>}
        <div style={{minHeight:"200px"}}>{children}</div>
          <Footer />
      </div>
      {/* {(status === 'play' || status === 'stop') && <Wavesuffer />} */}
    </div>
  );
};
export default MainLayout;
