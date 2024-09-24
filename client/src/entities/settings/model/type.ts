export interface ISettings {
	layout: ILayout;
	template: string;
	navigation: string;
}

interface ILayout {
	current: string;
	params: IParams;
}

interface IParams {
	grid: {
		columns: number;
		rows: number;
	};
	masonry: {
		columns: number;
		rows: number;
	};
}

export interface FetchSettingsResponse {
	data: ISettings;
	total: number;
	page: number;
	pageSize: number;
}
