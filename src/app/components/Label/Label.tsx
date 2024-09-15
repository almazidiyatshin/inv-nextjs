import styles from './styles.module.css';

type TProps = {
	title: string;
};

export const Label = ({ title }: TProps) => (
	<div className={styles.label}>{title}</div>
);
