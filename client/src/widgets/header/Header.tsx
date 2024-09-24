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
			<>
				<p className='text-xl text-white italic'>Current layout: {current}</p>
				<p className='text-xl text-white italic'>
					Current rows: {current === 'grid' ? grid.rows : masonry.rows}
				</p>
				<p className='text-xl text-white italic'>
					Current columns:
					{current === 'grid' ? grid.columns : masonry.columns}
				</p>
				<p className='text-xl text-white italic'>Template: {template}</p>
				<p className='text-xl text-white italic'>Navigation: {navigation}</p>
			</>
		);
	};

	return (
		<header className='flex justify-around p-3 bg-black/60 rounded-xl'>
			<div className='flex flex-col'>
				{error && <h1>{error}</h1>}
				{loading ? (
					<h1 className='text-white italic'>Loading...</h1>
				) : (
					renderInfo()
				)}
			</div>
			<button
				onClick={updateSettings}
				className='text-sm uppercase text-black italic bg-slate-300 rounded-xl p-3 hover:bg-slate-500 transition-all'
			>
				Update settings
			</button>
		</header>
	);
};
