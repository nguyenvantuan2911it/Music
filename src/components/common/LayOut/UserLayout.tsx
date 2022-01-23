import * as React from 'react';

export interface UserLayoutProps {
    children: any
}

export default function UserLayout (props: UserLayoutProps) {
    const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
}
