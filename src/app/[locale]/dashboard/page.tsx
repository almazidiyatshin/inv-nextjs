import { Header } from '../../components/Header';
import { Widgets } from '../../widgets/Widgets';
import '../../global.css';
import { TLocale } from '@/app/hooks/useTranslation';

type TProps = { params: { locale: TLocale } };

export default function Page({ params: { locale } }: TProps) {
	return (
		<main>
			<Header locale={locale} />
			<Widgets locale={locale} />
		</main>
	);
}
