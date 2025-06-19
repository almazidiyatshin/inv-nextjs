'use client';

import { memo } from 'react';
import { Flex, For } from '@chakra-ui/react';
import { useModel } from './useModel';
import { AssetCard } from 'features';
import { TAssetsWidgetProps } from './types';

export const AssetsWidget = memo<TAssetsWidgetProps>(({ data }) => {
	const { assetsConfig } = useModel({ data });

	return (
		<Flex wrap={'wrap'} gap={'4'} marginY={'4'}>
			<For each={assetsConfig}>
				{(config) => <AssetCard key={config.id} {...config} />}
			</For>
		</Flex>
	);
});

AssetsWidget.displayName = 'AssetsWidget';
