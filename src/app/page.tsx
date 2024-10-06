import { Header } from './components/Header';
import './global.css';

import { Widgets } from './widgets/Widgets';

export default async function Page() {
	let indicatorsData = [];

	try {
		const res = await fetch(`https://${process.env.VERCEL_URL}/api/indicators`);
		console.log({ process }, process.env.VERCEL_URL);
		indicatorsData = await res.json();
	} catch (e) {
		console.error(e);
		indicatorsData = [];
	}

	return (
		<main>
			<Header indicators={indicatorsData} />
			<Widgets />
		</main>
	);
}
