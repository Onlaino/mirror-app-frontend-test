import { getPostDate } from '@/shared/lib/getPostDate';

type PostItemProps = {
	caption: string;
	comments: number;
	likes: number;
	date: string;
	template: string;
};

export const PostItem = ({
	caption,
	comments,
	date,
	likes,
	template,
}: PostItemProps) => {
	const cardClass =
		template === 'classic'
			? 'hover:shadow-lg hover:bg-gray/50'
			: 'hover:-translate-y-0.5 hover:bg-blue-200';

	return (
		<div
			className={`${cardClass} mt-4 relative p-4 rounded-md shadow-md flex flex-col justify-between transition-all cursor-pointer`}
		>
			<div className='text-black font-bold border-b-2'>
				Date: {getPostDate(date)}
			</div>
			<div className='pt-1 italic'>{caption}</div>
			<div className='py-2  flex flex-col items-start gap-1 '>
				<div className='text-sm text-black'>comments: {comments}</div>
				<div className=' p-1 shadow-sm text-black font-medium rounded-lg  hover:bg-gray transition-all'>
					👍&nbsp;{likes}{' '}
				</div>
			</div>
		</div>
	);
};
