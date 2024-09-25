import { LayoutContext } from '@/entities/context/LayoutContext';
import { usePosts } from '@/shared/hooks/usePosts';
import { useContext } from 'react';
import { PostItem } from './PostItem';
import { getPostStyle } from '../lib/getPostStyle';

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
	} = usePosts(settings?.navigation || 'pagination');

	const { layout, navigation, template } = settings || {};
	const currentLayout = layout?.current;
	const postStyle = getPostStyle(currentLayout, layout);

	if (settingsLoading || postsLoading) return <div>Loading...</div>;
	if (settingsError) return <div>Error loading settings: {settingsError}</div>;
	if (postsError) return <div>Error loading posts: {postsError}</div>;

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
