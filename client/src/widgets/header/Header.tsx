import { LayoutContext } from '@/entities/context/LayoutContext';
import { useContext } from 'react';

export const Header = () => {
	const { error, loading, settings, updateSettings } =
		useContext(LayoutContext);
	const { layout, template, navigation } = settings!;
	const { current, params } = layout;
	const { grid, masonry } = params;

	const renderInfo = () => {
		return (
			<div className='flex gap-6'>
				{error && <h1>{error}</h1>}
				<div>
					<p className='text-xl text-white italic'>
						<span className='text-[#FAA72D] font-bold'>
							Current layout:&nbsp;
						</span>{' '}
						{current}
					</p>
					<p className='text-xl text-white italic'>
						<span className='text-[#FAA72D] font-bold'>
							Current rows:&nbsp;
						</span>
						{current === 'grid' ? grid.rows : masonry.rows}
					</p>
					<p className='text-xl text-white italic'>
						<span className='text-[#FAA72D] font-bold'>
							Current columns:&nbsp;
						</span>
						{current === 'grid' ? grid.columns : masonry.columns}
					</p>
				</div>
				<div>
					<p className='text-xl text-white italic'>
						<span className='text-[#FAA72D] font-bold'>Template:&nbsp;</span>{' '}
						{template}
					</p>
					<p className='text-xl text-white italic'>
						<span className='text-[#FAA72D] font-bold'>Navigation:&nbsp;</span>{' '}
						{navigation}
					</p>
				</div>
			</div>
		);
	};

	return (
		<header className='mt-1 p-2 relative bg-[#2C4858] rounded-md h-24'>
			{loading ? (
				<h1 className='text-white italic'>Loading...</h1>
			) : (
				renderInfo()
			)}

			<button
				onClick={updateSettings}
				className='absolute top-3 right-3 text-sm uppercase bg-white text-black border-2 border-black-400 rounded-md hover:bg-blue-100 py-1 px-2 hover:border-blue-400 transition-all h-10 w-15 active:translate-y-1'
			>
				Update settings
			</button>
		</header>
	);
};
