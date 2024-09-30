import 'normalize.css';
import './styles/index.css';
import { PostPage } from '@/pages/post-page';
import { LayoutContextProvider } from '@/entities/context/LayoutContext';

const App = () => {
	return (
		<main className='px-44 min-h-screen'>
			<LayoutContextProvider>
				<PostPage />
			</LayoutContextProvider>
		</main>
	);
}

export default App;
