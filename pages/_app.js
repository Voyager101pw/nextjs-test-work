import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// App компонент верхнего уровня, который оборачивает все страницы текущего приложения. 
// Он используется для сохранения состояния при переходе между страницами или для добавления 
// глобальных стилей.