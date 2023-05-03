import  { ReactNode, createContext, useState } from "react"

interface State {

    id: string,
    name: string,
    imageUrl: string,
    price: string,
    defaultPriceId: string,

}

interface ProductContextType {
    listProducts: State[];
    addProducts: (product: State[]) => void
}

export const  ProductContext = createContext({} as ProductContextType)


type ChildrenTypeProps = {
    children: ReactNode
}

export function ProductContextProvider ({children}: ChildrenTypeProps){

    const [listProducts, setListProducts] = useState<State[]>([])

    function addProducts(product: State[]){
       
        setListProducts(product)
    }



    return (
        <ProductContext.Provider value={{listProducts, addProducts}}>
            {children}
        </ProductContext.Provider>
    )
}