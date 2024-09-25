type GridType = {
	columns: number;
	rows: number;
};

type LayoutType = {
	params: {
		grid: GridType;
		masonry: GridType;
	};
};

export const getPostStyle = (
	currentLayout: string = 'grid',
	layout: LayoutType | undefined
) => {
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
