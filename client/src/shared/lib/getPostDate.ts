export const getPostDate = (date: string) => {
	const postDate = new Date(date);
	const today = new Date();
	const diffTime = Math.abs(today.getTime() - postDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 7) {
		return `${diffDays} days ago`;
	} else {
		return postDate.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		});
	}
};