import { LayoutContext } from '@/entities/context/LayoutContext';
import { useFetch } from '@/shared/hooks/useFetch';
import { useContext } from 'react';
import { PostItem } from './PostItem';

export const PostsList = () => {
	const {
		settings,
		error: settingsError,
		loading: settingsLoading,
	} = useContext(LayoutContext);

	const {
		data: posts,
		loading: postsLoading,
		error: postsError,
		currentPage,
		totalPages,
		hasMore,
		goToNextPage,
		goToPrevPage,
		loadMore,
	} = useFetch(settings?.navigation || 'pagination');

	if (settingsLoading || postsLoading) return <div>Loading...</div>;
	if (settingsError) return <div>Error loading settings: {settingsError}</div>;
	if (postsError) return <div>Error loading posts: {postsError}</div>;

	const { layout, navigation, template } = settings || {};
	const currentLayout = layout?.current;

	const getPostStyle = () => {
		if (currentLayout === 'grid') {
			const gridParams = layout?.params.grid;
			return {
				display: 'grid',
				gridTemplateColumns: `repeat(${gridParams?.columns}, 1fr)`,
				gridTemplateRows: `repeat(${gridParams?.rows}, 1fr)`,
				gap: '16px',
			};
		}

		if (currentLayout === 'masonry') {
			const masonryParams = layout?.params.masonry;
			return {
				display: 'grid',
				gridTemplateColumns: `repeat(${masonryParams?.columns}, 1fr)`,
				gridTemplateRows: `repeat(${masonryParams?.rows}, 1fr)`,
				gap: '16px',
			};
		}
	};
	const postStyle = getPostStyle();

	return (
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
			{navigation === 'pagination' ? (
				<div className='flex flex-col items-center gap-2 justify-between w-80 fixed right-[-60px]'>
					<button
						className='border-2  border-black-400 rounded-md hover:bg-blue-100 py-1 px-2 hover:border-blue-400 transition-all h-10 w-15 active:translate-y-1'
						onClick={goToPrevPage}
					>
						Prev page
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						className='border-2 border-black-400 rounded-md hover:bg-blue-100 py-1 px-2 hover:border-blue-400 transition-all h-10 w-15 active:translate-y-1'
						onClick={goToNextPage}
					>
						Next page
					</button>
				</div>
			) : (
				hasMore && (
					<button
						className='fixed right-[65px] border-2  border-black-400 rounded-md hover:bg-blue-100 py-1 px-2 hover:border-blue-400 transition-all h-10 w-15'
						onClick={loadMore}
					>
						Load more
					</button>
				)
			)}
		</div>
	);
};
