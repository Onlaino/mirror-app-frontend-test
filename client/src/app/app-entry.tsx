import 'normalize.css';
import './styles/index.css';
import { PostPage } from '@/pages/post-page';
import { LayoutContextProvider } from '@/entities/context/LayoutContext';

// TODO:  Приложение не должно ломаться при добавлении/удалении нового layout или template. Добавлять или удалять layout, как и template должно быть легко и с минимальным изменением текущего функционала и кодовой базы.
// TODO: переписать useFetch на axios
// TODO: уточнить, как должны себя вести rows

function App() {
	return (
		<main className='px-44 min-h-screen'>
			<LayoutContextProvider>
				<PostPage />
			</LayoutContextProvider>
		</main>
	);
}

export default App;
