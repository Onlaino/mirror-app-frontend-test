import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useFetchSettings } from '@/shared/hooks/useFetchSettings';
import { ISettings } from '../settings/model/type';

type ContextType = {
	settings: ISettings | undefined;
	loading: boolean;
	error: string | null;
	updateSettings: () => void;
};

const initialValue: ISettings = {
	layout: {
		current: '',
		params: {
			grid: {
				columns: 0,
				rows: 0,
			},
			masonry: {
				columns: 0,
				rows: 0,
			},
		},
	},
	template: '',
	navigation: '',
};

export const LayoutContext = createContext<ContextType>({
	settings: initialValue,
	loading: false,
	error: null,
	updateSettings: () => {},
});

export const LayoutContextProvider = ({ children }: PropsWithChildren) => {
	const { settings, error, loading, onClickUpdate } = useFetchSettings();
	const [currentSettings, setCurrentSettings] =
		useState<ISettings>(initialValue);

	useEffect(() => {
		if (settings) {
			setCurrentSettings(settings);
		}
	}, [settings]);

	const updateSettings = () => {
		onClickUpdate();
	};

	return (
		<LayoutContext.Provider
			value={{ settings: currentSettings, loading, error, updateSettings }}
		>
			{children}
		</LayoutContext.Provider>
	);
};
