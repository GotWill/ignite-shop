import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import Logo from '../assets/logo.png'
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';
import Link from 'next/link';
import { Handbag } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import ProductProps, { MenuLateral } from '@/components/MenuLateral';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  const [disable, setDisable] = useState(false)

  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
      const products = localStorage.getItem('ignite-shooping')
      setProducts(JSON.parse(products))
  },[])


  return (
    <Container>


      <Header>
        <Link href="/">
          <Image src={Logo} alt='' />
        </Link>

        <button className='btn' onClick={() => setDisable(true)}>
          <Handbag size={24} color="#8D8D99" />
          {
            products?.length > 0 &&  <span>{products.length}</span>
          }
        </button>

        {disable &&  <MenuLateral close={() => setDisable(false)}/>}

       

      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
