import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First post</title>
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Cкрипт загружен корректно, window.FB заполнен');
          }}
        />
      </Head>
      <h1>First post!</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
