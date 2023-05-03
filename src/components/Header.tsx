import Link from "next/link"
import { HeaderContainer } from "../styles/components/Header"
import Image from "next/image"
import { Handbag } from "@phosphor-icons/react"
import { MenuLateral } from "./MenuLateral"
import Logo from '../assets/logo.png'
import { useContext, useState } from "react"
import { ProductContext } from "@/context/Products"

export default function Header() {

    const [disable, setDisable] = useState(false)

    const {listProducts} = useContext(ProductContext)

  

    return (
        <HeaderContainer>
            <Link href="/">
                <Image src={Logo} alt='' />
            </Link>

            <button className='btn' onClick={() => setDisable(true)}>
                <Handbag size={24} color="#8D8D99" />
                {
                    listProducts?.length > 0 && <span>{listProducts.length}</span>
                }
            </button>

            {disable && <MenuLateral close={() => setDisable(false)} />}

        </HeaderContainer>


    )
}