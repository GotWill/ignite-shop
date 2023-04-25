import { Container, CardProduct } from "@/styles/components/MenuLaterax";
import { X } from "@phosphor-icons/react";
import Image from "next/image"
import { useEffect, useState } from "react";


interface Props {
    close: () => void
}

export default interface ProductProps {
   
        id: string,
        name: string,
        imageUrl: string,
        price: string
   
}

export function MenuLateral({ close }: Props) {

    const [products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        const products = localStorage.getItem('ignite-shooping')
        setProducts(JSON.parse(products))
    }, [])



    return (
        <Container>
            <div className="close">
                <button onClick={close}>
                    <X size={24} color="#fff" />
                </button>
            </div>

            <h2>Sacola de compras</h2>

            {
                products.length > 0 &&

                products.map((product) => {
                    return (
                        <CardProduct>
                            <div className="box">
                                <Image src={product.imageUrl} width={93} height={93} alt='' />
                            </div>
                            <div className="info">
                                <h3>{product.name}</h3>
                                <span>R$ {product.price}</span>
                                <button>Remover</button>
                            </div>
                        </CardProduct>
                    )
                })


            }

            <footer>

                <div className="flex-info">
                    <p>Quantidade</p>
                    <span>{products.length} itens</span>
                </div>
                <div className="flex-info">
                    <span><strong>Valor total</strong></span>
                    <h2>R$ 270,00</h2>
                </div>

                <button>
                    Finalizar compra
                </button>
            </footer>
        </Container>
    )
}