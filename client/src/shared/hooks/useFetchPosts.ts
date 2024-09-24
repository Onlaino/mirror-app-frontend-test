import { fetchPosts } from '@/entities/posts/lib/postApi';
import { IPosts } from '@/entities/posts/model/type';
import { useEffect, useState } from 'react';

export const useFetchPosts = () => {
	const [posts, setPosts] = useState<IPosts[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1); 

	const loadPosts = async (page: number = 1, append: boolean = false) => {
		try {
			setLoading(true);
			const { data, totalPages } = await fetchPosts(page);
			setPosts((prevPosts) => (append ? [...prevPosts, ...data] : data)); 
			setTotalPages(totalPages); 
		} catch (error) {
			console.error(error)
			setError('Failed to load posts');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadPosts(currentPage, false);
	}, [currentPage]);

	const fetchMorePosts = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
	};

	const goToPrevPage = () => {
		if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
	};

	return {
		posts,
		loading,
		error,
		currentPage,
		totalPages,
		fetchMorePosts,
		goToNextPage,
		goToPrevPage,
	};
};
