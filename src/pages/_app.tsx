import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import Logo from '../assets/logo.png'
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import Link from 'next/link';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>


      <Header>
        <Link href="/">
          <Image src={Logo} alt='' />
        </Link>

      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
