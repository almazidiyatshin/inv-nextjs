'use client';

import { Provider } from 'react-redux';
import { store } from 'shared/lib';
import { TStoreProviderProps } from './types';

export const StoreProvider = ({ children }: TStoreProviderProps) => {
	return <Provider store={store}>{children}</Provider>;
};
