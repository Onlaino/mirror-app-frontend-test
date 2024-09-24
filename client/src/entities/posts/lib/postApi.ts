import { axiosInstance } from '@/shared/api/axiosInstance';
import { IPosts } from '../model/type';

export const fetchPosts = async (page: number = 1): Promise<IPosts[]> => {
	try {
		const res = await axiosInstance.get(`/posts?_page=${page}`);
		return res.data;
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw error;
	}
};
