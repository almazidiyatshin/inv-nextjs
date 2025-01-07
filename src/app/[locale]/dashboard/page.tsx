import { Header } from '../../widgets/Header';
import { Widgets } from '../../widgets/Widgets';
import '../../global.css';
import { TLocale } from '@/app/hooks/useTranslation';
import { ThemeProvider } from '@/config/providers';

type TProps = { params: { locale: TLocale } };

export default function Page({ params: { locale } }: TProps) {
	return (
		<main>
			<ThemeProvider>
				<Header locale={locale} />
				<Widgets locale={locale} />
			</ThemeProvider>
		</main>
	);
}
