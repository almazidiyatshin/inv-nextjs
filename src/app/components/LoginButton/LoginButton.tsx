'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import styles from './styles.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export const LoginButton = () => {
	const t = useTranslation();
	const { status, data } = useSession();
	const isAuthenticated = status === 'authenticated';
	const isAdmin = data?.user?.role === 'admin';

	const btnTitle = t(isAuthenticated ? 'logout' : 'login');
	const userName = data?.user?.name;
	const userImage = data?.user?.image;

	const handleBtnClick = () => (isAuthenticated ? signOut() : signIn('github'));

	return (
		<div className={styles.authGroup}>
			<div className={styles.userInfo}>
				{userImage && userName && (
					<Image
						title={userName}
						className={styles.avatar}
						src={userImage}
						alt={userName}
						width={20}
						height={20}
					/>
				)}
				<div>
					{isAuthenticated
						? isAdmin
							? userName
							: `${userName} (${t('demoMode')})`
						: t('demoMode')}
				</div>
			</div>
			<button title={btnTitle} className={styles.btn} onClick={handleBtnClick}>
				{btnTitle}
			</button>
		</div>
	);
};
