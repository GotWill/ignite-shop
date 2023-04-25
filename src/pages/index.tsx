import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "@phosphor-icons/react";
import { useState } from "react";

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {

  const [stateProduct, setStateProduct] = useState<HomeProps[]>([])

  function saveStorage(product: HomeProps){

      const newList = [...stateProduct]
      if(!newList.includes(product)){
        newList.push(product)
        setStateProduct(newList)
        localStorage.setItem("ignite-shooping", JSON.stringify(newList));
      }
     
    

    

    
  }


  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    },

  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

    
   

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <div className="info">
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <div className="square">
                  <button onClick={() => saveStorage(product)}>
                    <Handbag size={24} color="#fff" />
                  </button>
                </div>
              </footer>
            </Product>
          )
        })}

      </HomeContainer>
    </>

  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map((product) => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount as number / 100),

    }
  })

  return {
    props: {
      products
    },

    revalidate: 60 * 60 * 2
  }
}