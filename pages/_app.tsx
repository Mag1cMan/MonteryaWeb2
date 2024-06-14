import { useEffect } from 'react';
import App, { AppProps } from 'next/app';
import { ChakraProvider, Box } from '@chakra-ui/react';
import AppLayout from 'components/layouts/appLayout';
import { PrismGlobal } from 'components/theme/prism';
import { useRouter } from 'next/router';
import * as gtag from 'lib/gtag';
import { AnimatePresence } from 'framer-motion';
import { AccentGlobal } from 'components/theme/Accent';
import { FontsGlobal } from 'components/theme/fonts';
import { Analytics } from '@vercel/analytics/react';
import { AuthContextProvider } from '../configs/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      // console.log(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  

  return (
    <ChakraProvider resetCSS={true}>
      <FontsGlobal />
      <AccentGlobal />
      <PrismGlobal />
      <Analytics />
      <AuthContextProvider>
      <AppLayout>
        <AnimatePresence
          // exitBeforeEnter
          mode='wait'
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Box key={router.route}>
            <Component {...pageProps} />
          </Box>
        </AnimatePresence>
      </AppLayout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
export default MyApp;
