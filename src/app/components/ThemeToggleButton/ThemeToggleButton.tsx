'use client';

import { TbMoonFilled as DarkThemeIcon } from 'react-icons/tb';
import { TbSunFilled as LightThemeIcon } from 'react-icons/tb';
import styles from './styles.module.css';
import cn from 'classnames';
import { useTheme } from '@/config/providers';

export const ThemeToggleButton = () => {
	const { theme, isDarkTheme, toggleTheme } = useTheme();

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
