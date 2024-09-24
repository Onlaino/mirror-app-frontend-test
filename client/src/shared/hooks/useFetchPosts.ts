import { fetchPosts } from '@/entities/posts/lib/postApi';
import { IPosts } from '@/entities/posts/model/type';
import { useEffect, useState } from 'react';

export const useFetchPosts = () => {
	const [posts, setPosts] = useState<IPosts[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const loadPosts = async (page: number = 1) => {
		try {
			setLoading(true);
			const postsData = await fetchPosts(page);
			setPosts((prevPosts) => [...prevPosts, ...postsData]);
		} catch (error) {
			console.error(error);
			setError('Failed to load posts');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log(`useEffect called for page: ${currentPage}`);
		loadPosts(currentPage);
	}, [currentPage]);

	const fetchMorePosts = () => {
		  if (!loading) {
				setCurrentPage((prev) => prev + 1);
			}
	};

	return { posts, loading, error, fetchMorePosts };
};
