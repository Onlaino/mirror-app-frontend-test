import { axiosInstance } from '@/shared/api/axiosInstance';
import axios from 'axios';
import { ISettings } from '../model/type';

export const fetchSettings = async (): Promise<ISettings> => {
	try {
		const res = await axiosInstance.get<ISettings>('/settings');
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(`Axios error: ${error.response?.data}`);
			throw new Error(`Error fetching settings: ${error.response?.status}`);
		} else {
			console.error('Unexpected error: ', error);
			throw new Error('Unexpected error occurred');
		}
	}
};
