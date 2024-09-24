import { PostPage } from '@/pages/post-page';
import 'normalize.css';
import './styles/index.css';
import { LayoutContextProvider } from '@/entities/context/LayoutContext';

function App() {
	return (
		<main className='h-svh bg-black/50 px-32'>
			<LayoutContextProvider>
				<PostPage />
			</LayoutContextProvider>
		</main>
	);
}

export default App;
