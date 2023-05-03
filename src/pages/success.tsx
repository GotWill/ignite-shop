import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";


type ImagesProps = {
    images: []
}

interface SuccessProps {
    custorName: string;

    product: {
        images: ImagesProps[]
    }

    
}

export default function Success({ custorName, product }: SuccessProps) {

      return (
        <>

            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex"/>
            </Head>

            <SuccessContainer>
               

                <ImageContainer>
                    {product.images.map((ele) => {
                        return <Image src={ele.images.join('')} width={140} height={140} alt='' />
                    })}
                </ImageContainer>

                <h1>Compra efetuada!</h1>

                <p>
                    Uhuul <strong>{custorName}</strong>, sua compra de {product.images.length}   camisetas já está a caminho da sua casa. 
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id)



    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })


    const custorName = session.customer_details.name
    const product = session.line_items.data


    return {
        props: {
            custorName,
            product: {
                images: product.map((ele) => {
                    return ele.price.product as Stripe.Product
                })
            },

          
        }
    }
}