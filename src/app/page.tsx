import { Header } from './components/Header';
import './global.css';

import { Widgets } from './widgets/Widgets';

export default async function Page() {
	return (
		<main>
			<Header />
			<Widgets />
		</main>
	);
}
