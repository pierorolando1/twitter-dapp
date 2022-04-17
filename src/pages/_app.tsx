require('@solana/wallet-adapter-react-ui/styles.css');
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '../providers'

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import NProgress from 'nprogress';

function MyApp({ Component, pageProps }: AppProps) {

    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            console.log(url);
            NProgress.start();
        };

        router.events.on("routeChangeStart", handleRouteChange);
        router.events.on("routeChangeComplete", () => NProgress.done());
        router.events.on("routeChangeError", () => NProgress.done());

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, []);


    return <Providers>
        <Component {...pageProps} />
    </Providers>
}

export default MyApp
