import { ProductContext } from "@/context/Products";
import { Container, CardProduct } from "@/styles/components/MenuLaterax";
import { X } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image"
import { useContext, useEffect, useState } from "react";


interface Props {
    close: () => void
}

export default interface ProductProps {
    id: string,
    name: string,
    imageUrl: string,
    price: string,

}

export function MenuLateral({ close }: Props) {

    const { listProducts, addProducts } = useContext(ProductContext)

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const newList = listProducts.map((ele) => {
        return parseFloat(ele.price.split('').join('').substring(2).replace(',', '.'))
    })

    const value = newList.reduce((acc, item) => acc + item, 0)
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency'
    }).format(value)

    function removeItem(product: ProductProps) {
        const newList = [...listProducts].filter((item) => item.id !== product.id)
        addProducts(newList)
    }

    async function handlePriceProduct() {

        try {
            setIsCreatingCheckoutSession(true)


            const response = await axios.post('/api/checkout', {
                products: listProducts

            })

            const { checkoutUrl } = response.data;
            window.location = checkoutUrl;
        } catch (err) {
            setIsCreatingCheckoutSession(false)
            alert("Falha ao redirecionar ao checkout")
        }
    }

    

    return (
        <Container>
            <div className="close">
                <button onClick={close}>
                    <X size={24} color="#fff" />
                </button>
            </div>

            {
                listProducts?.length > 0 ? (
                    <h2>Sacola de compras</h2>
                ) : (
                    <h2>O Carrinho está vazio</h2>
                )
            }


            {
                listProducts?.length > 0 &&

                listProducts?.map((product) => {
                    return (
                        <CardProduct key={product.id}>
                            <div className="box">
                                <Image src={product.imageUrl} width={93} height={93} alt='' />
                            </div>
                            <div className="info">
                                <h3>{product.name}</h3>
                                <span>{product.price}</span>
                                <button onClick={() => removeItem(product)}>Remover</button>
                            </div>
                        </CardProduct>
                    )
                })
            }

            {
                listProducts?.length > 0 &&
                <footer>

                    <div className="flex-info">
                        <p>Quantidade</p>
                        <span>{listProducts?.length} itens</span>
                    </div>
                    <div className="flex-info">
                        <span><strong>Valor total</strong></span>
                        <h2>{formattedValue}</h2>
                    </div>

                    <button disabled={isCreatingCheckoutSession} onClick={handlePriceProduct}>
                        Finalizar compra
                    </button>
                </footer>
            }


        </Container>
    )
}