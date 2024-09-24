import { LayoutContext } from '@/entities/context/LayoutContext';
import { useFetchPosts } from '@/shared/hooks/useFetchPosts';
import { useContext } from 'react';
import { PostItem } from './PostItem';

export const PostsList = () => {
	const {
		settings,
		error: settingsError,
		loading: settingsLoading,
	} = useContext(LayoutContext);

	console.log(settings);
	const {
		posts,
		error: postsError,
		loading: postsLoading,
		fetchMorePosts,
	} = useFetchPosts();

	console.log(posts);

	if (settingsLoading || postsLoading) return <div>Loading...</div>;
	if (settingsError) return <div>Error loading settings: {settingsError}</div>;
	if (postsError) return <div>Error loading posts: {postsError}</div>;

	const { layout, navigation, template } = settings || {};
	const currentLayout = layout?.current;

	const getPostStyle = () => {
		if (currentLayout === 'grid') {
			const gridParams = layout?.params.grid;
			return gridParams
				? {
						display: 'grid',
						gridTemplateColumns: `repeat(${gridParams.columns}, 1fr)`,
						gridAutoRows: 'minmax(100px, auto)',
						gap: '16px',
				  }
				: null;
		}

		if (currentLayout === 'masonry') {
			const masonryParams = layout?.params.masonry;
			return masonryParams
				? {
						display: 'grid',
						gridTemplateColumns: `repeat(${masonryParams.columns}, 1fr)`,
						gap: '16px',
						gridAutoRows: 'minmax(200px, auto)',
				  }
				: null;
		}
		return null;
	};

	const postStyle = getPostStyle();

	if (!postStyle) {
		return <div>No layout parameters available</div>;
	}

	// const handleLoadMore = () => {
	// fetchMorePosts(currentPage + 1);
	// setCurrentPage(currentPage + 1);
	// };

	return (
		<div>
			<div style={postStyle}>
				{posts.map((post) => (
					<PostItem
						key={post.id}
						caption={post.caption}
						comments={post.comments}
						date={post.date}
						likes={post.likes}
						template={template!}
					/>
				))}
			</div>

			{navigation === 'load-more' && (
				<button onClick={fetchMorePosts} className='p-2 rounded-md bg-black text-white font-bold mt-3 hover:bg-black/50 hover:text-black transition-all'>Load More</button>
			)}
		</div>
	);
};
