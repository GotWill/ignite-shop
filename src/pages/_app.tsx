import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import { Container } from '../styles/pages/app';
import { ProductContextProvider } from '../context/Products';
import Header from '@/components/Header';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ProductContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </ProductContextProvider>

  )
}
