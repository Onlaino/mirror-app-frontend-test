import { fetchSettings } from '@/entities/settings/lib/settingsApi';
import { ISettings } from '@/entities/settings/model/type';
import { useEffect, useState } from 'react';

export const useFetchSettings = () => {
	const [settings, setSettings] = useState<ISettings>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadSettings = async () => {
		try {
			setLoading(true);
			const settingsData = await fetchSettings();
			setSettings(settingsData);
		} catch (error) {
			console.error(error);
			setError('Failed to load posts');
		} finally {
			setLoading(false);
		}
	};

	const onClickUpdate = () => {
		loadSettings();
	};

	useEffect(() => {
		loadSettings();
	}, []);

	return { settings, loading, error, onClickUpdate };
};
