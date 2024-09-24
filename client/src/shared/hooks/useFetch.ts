import { IPosts } from '@/entities/posts/model/type';
import { useEffect, useState } from 'react';

export const useFetch = (navigation: string) => {
	const [data, setData] = useState<IPosts[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPosts, setTotalPosts] = useState<number>(0);
	const postsPerPage = 10;

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`http://localhost:4000/posts?_page=${currentPage}&_limit=${postsPerPage}`
				);

				if (navigation === 'pagination') {
					const newPosts = await res.json();
					setData(newPosts);
					const totalPosts = res.headers.get('X-Total-Count');
					setTotalPosts(Number(totalPosts));
				}

				if (navigation === 'load-more') {
					const newPosts = await res.json();
					const totalPosts = res.headers.get('X-Total-Count');

					setData((prevPosts) => [...prevPosts, ...newPosts]);
					setTotalPosts(Number(totalPosts));
				}
			} catch (err) {
				console.log(err);
				setError('Failed to load posts');
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, [currentPage]);

	const totalPages = Math.ceil(totalPosts / postsPerPage);

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const loadMore = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};
	return {
		data,
		loading,
		error,
		currentPage,
		totalPages,
		hasMore: currentPage < totalPages,
		goToNextPage,
		goToPrevPage,
		loadMore,
	};
};
