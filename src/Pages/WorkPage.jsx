import { useEffect, useState } from "react";
import "./WorkPage.css"
import CartPanel from "./components/CartPanel";
import ProductsPanel from "./components/ProductsPanel";
import { fetchProducts } from "../api/product";

export default function WorkPage() {
    const [products, setProducts] = useState([]); 
    const [cart, setCart] = useState([]); 
    useEffect(() =>{
        try {
            const loadFetch = async() => {
                const data = await fetchProducts();
                setProducts(data);
            }
            
            loadFetch()
        } catch (error) {
            console.log(error)
        }
    }, [products])

    return (
        <div className="cashier-layout">
            <CartPanel
                cart={cart}
                setCart={setCart}
            />
            <ProductsPanel
                products={products}
                setProducts={setProducts}
                cart={cart}
                setCart={setCart}
            />
        </div>
    )

}
