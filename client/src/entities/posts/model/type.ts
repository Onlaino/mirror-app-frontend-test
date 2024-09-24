export interface IPosts {
	caption: string;
	id: string;
	comments: number;
	likes: number;
	date: string;
	permalink: string;
	userId: string;
}

export interface FetchPostsResponse {
	data: IPosts[];
	total: number;
	page: number;
	pageSize: number;
}
