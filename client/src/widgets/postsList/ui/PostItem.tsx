type PostItemProps = {
	caption: string;
	comments: number;
	likes: number;
	date: string;
	template: string;
};

export const PostItem = ({ caption, comments, date, likes, template }: PostItemProps) => {
	return (
		<div className='mt-4 relative p-4 border-2 border-violet-600 rounded-md'>
			<div className='absolute top-2 right-2 text-orange-500'>
				date: {new Date(date).getHours()}
			</div>
			<div className='absolute top-2 left-2 p-2 rounded-lg bg-black flex justify-center hover:bg-gray transition-all'>
				<span className='text-white bold'>&#9825; {likes} </span>
			</div>
			<div className='absolute bottom-2 right-2 text-sm text-white'>
				comments: {comments}
			</div>
			<div className='pt-10 italic'>{caption}</div>
		</div>
	);
};
