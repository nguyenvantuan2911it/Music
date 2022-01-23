import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from '../app/store';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>SGM Music</title>
        <meta name="description" content="Our music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
