import { Col, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { TabLink } from 'src/interface/tab';
import styles from './Tab.module.scss';

export interface TabProps {
  listTab: TabLink[];
}
const Tab = (props: TabProps) => {
  const { listTab } = props;
  const router = useRouter();
  const { musictype } = router.query;
  return (
    <div className=" mb-5 h-14">
      <Row className={styles.menu}>
        {listTab &&
          listTab.map((tab, index) => {
            return (
              <Link key={index} href={tab.url}>
                <Col className={styles.menu__item}>
                  <span className={`${musictype == tab.tabName ? styles.active : ''}`}>
                    {tab.tabName}
                  </span>
                </Col>
              </Link>
            );
          })}
      </Row>
      <br />
    </div>
  );
};

export default Tab;
