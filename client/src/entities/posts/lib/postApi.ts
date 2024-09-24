import { axiosInstance } from '@/shared/api/axiosInstance';
import { IPosts } from '../model/type';

// export const fetchPosts = async (page: number = 1): Promise<IPosts[]> => {
// 	try {
// 		const res = await axiosInstance.get(`/posts?_page=${page}`);
// 		return res.data;
// 	} catch (error) {
// 		console.error('Error fetching posts:', error);
// 		throw error;
// 	}
// };

interface FetchPostsResponse {
	data: IPosts[];
	totalPages: number;
}

export const fetchPosts = async (
	page: number = 1
): Promise<FetchPostsResponse> => {
	try {
		const res = await axiosInstance.get(`/posts?_page=${page}`);

		const totalPosts = parseInt(res.headers['x-total-count'], 10);
		const postsPerPage = 10;
		const totalPages = Math.ceil(totalPosts / postsPerPage);

		return {
			data: res.data,
			totalPages,
		};
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw error;
	}
};
