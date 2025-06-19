import { DashboardPage } from 'screens';
import { TPageProps } from './types';

export default function Page({ params: { locale } }: TPageProps) {
	return <DashboardPage locale={locale} />;
}
