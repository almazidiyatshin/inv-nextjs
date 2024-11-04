'use client';

import { useEffect, useState } from 'react';
import { TbMoonFilled as DarkThemeIcon } from 'react-icons/tb';
import { TbSunFilled as LightThemeIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import cn from 'classnames';

export const ThemeToggleButton = () => {
	const [theme, setTheme] = useState(() =>
		typeof window !== 'undefined'
			? localStorage.getItem('theme') || 'light'
			: 'light'
	);
	const isDarkTheme = theme === 'dark';

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<button
			className={cn(styles.btn, { [styles.btn__dark]: theme === 'dark' })}
			onClick={toggleTheme}
		>
			{isDarkTheme ? (
				<LightThemeIcon className={styles.icon} />
			) : (
				<DarkThemeIcon className={styles.icon} />
			)}
		</button>
	);
};
