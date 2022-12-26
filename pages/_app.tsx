import { AppProps } from 'next/app';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
// App компонент верхнего уровня, который оборачивает все страницы текущего приложения. 
// Он используется для сохранения состояния при переходе между страницами или для добавления 
// глобальных стилей.