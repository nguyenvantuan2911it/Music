import * as React from 'react';
import MainLayout from 'src/components/common/LayOut/Layout';
import Link from 'next/link';
import UserLayout from 'src/components/common/LayOut/UserLayout';
import Profile from '../account/profile';

export interface UserProps {}

export default function User(props: UserProps) {
	return (
		<MainLayout>
			<div className="header"></div>
			<div className="navbar" style={{ color: 'white' }}>
				<div className="list">
					<Link href="user/playlists">
						<div className="link">Playlists</div>
					</Link>
					<Link href="user/profile">
						<div className="link">Account</div>
					</Link>
					<Link href="user/downloads">
						<div className="link">Downloads</div>
					</Link>
					<Link href="user/referral">
						<div className="link">Referral</div>
					</Link>
				</div>
			</div>
			<div className="container">
				<UserLayout>
					<Profile />
				</UserLayout>
			</div>
		</MainLayout>
	);
}
