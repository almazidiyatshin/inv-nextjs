'use client';

import { TbMoonFilled as DarkThemeIcon } from 'react-icons/tb';
import { TbSunFilled as LightThemeIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import cn from 'classnames';
import { useTheme } from '@/config/providers';

export const ThemeToggleButton = () => {
	const { isDarkTheme, toggleTheme } = useTheme();

	return (
		<div className={styles.btnGroup}>
			<button
				className={cn(styles.btn, styles.btn_left, {
					[styles.btn__active]: !isDarkTheme,
				})}
				disabled={!isDarkTheme}
				onClick={toggleTheme}
			>
				<LightThemeIcon className={styles.icon} />
			</button>
			<button
				className={cn(styles.btn, styles.btn_right, {
					[styles.btn__active]: isDarkTheme,
				})}
				disabled={isDarkTheme}
				onClick={toggleTheme}
			>
				<DarkThemeIcon className={styles.icon} />
			</button>
		</div>
	);
};
