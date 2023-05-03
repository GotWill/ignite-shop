import { ProductContext } from "@/context/Products"
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useContext, useState } from "react"
import Stripe from "stripe"

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
    }
}

type Props = {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
}


export default function Product({ product }: ProductProps) {
    console.log(product.defaultPriceId)

    const {addProducts, listProducts} = useContext(ProductContext)

    // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    // async function handlePriceProduct() {
    //     try {
    //         setIsCreatingCheckoutSession(true)
    //         const response = await axios.post('/api/checkout', {
    //             priceId: product.defaultPriceId
    //         })

    //         const { checkoutUrl } = response.data;
    //         window.location = checkoutUrl;
    //     } catch (err) {
    //         setIsCreatingCheckoutSession(false)
    //         alert("Falha ao redirecionar ao checkout")
    //     }
    // }

    function addProductList(Item: Props ){
      const newList = [...listProducts]

      newList.push({
        id: Item.id,
        imageUrl: Item.imageUrl,
        name: Item.name,
        price: Item.price,
        defaultPriceId: Item.defaultPriceId
      })

      addProducts(newList)

    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>


            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button onClick={ () =>  addProductList(product)}>
                        Adicionar a sacola
                    </button>
                </ProductDetails>
            </ProductContainer>

        </>

    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [
            {
                params: { id: 'prod_NjVUi7CnoQpd72' }
            }
        ],
        fallback: true
    }
}


export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })


    const price = product.default_price as Stripe.Price
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount as number / 100),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1
    }

}