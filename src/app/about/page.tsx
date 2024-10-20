import '../global.css';
import styles from './styles.module.css';

export default async function Page() {
	return (
		<main>
			<div className={styles.title}>Experience</div>
			<div className={styles.experience}>
				{['Company 1', 'Company 2'].map((company) => (
					<>
						<div key={company}>{company}</div>
						<div>{'->'}</div>
					</>
				))}
			</div>
		</main>
	);
}
