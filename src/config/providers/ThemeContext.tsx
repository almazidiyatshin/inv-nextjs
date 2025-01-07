'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
	theme: 'light',
	isDarkTheme: false,
	toggleTheme: () => {},
});

type TProps = {
	children: React.ReactNode;
};

export const ThemeProvider = ({ children }: TProps) => {
	const [theme, setTheme] = useState(() =>
		typeof window !== 'undefined'
			? localStorage.getItem('theme') || 'light'
			: 'light'
	);

	const isDarkTheme = theme === 'dark';

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkTheme);
		localStorage.setItem('theme', theme);
	}, [theme, isDarkTheme]);

	const toggleTheme = () =>
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

	return (
		<ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
