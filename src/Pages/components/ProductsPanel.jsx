import { useState } from "react"

//кнопки добавить прикрепит снизу в будущем

export default function ProductsPanel({ products, setProducts, cart, setCart }) {
    const [search, setSearch] = useState("");

    const filtered = products.filter((p) => {
        const q = search.toLowerCase();

        return (
            p.name?.toLowerCase().includes(q) ||
            p.article?.toLowerCase().includes(q) ||
            p.barcode?.toLowerCase().includes(q)
        );
    })

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p._id === product._id);
            if(exists){
                return prev.map((p) => 
                    p._id === product._id 
                        ? {...p, cartQty: p.cartQty + 1}
                        : p
                );
            }

            return [...prev, { ...product, cartQty: 1}];
        })
    }

    return (
        <div className="products-panel">
            <h2>Товары</h2>
            <input
                type="text"
                placeholder="Поиск по названию, артиклю или штрихкоду..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            {filtered.length === 0 && <p>Нет товаров</p>}

            <div className="products-grid">
                {filtered.map((p) => (
                    <div key={p._id} className="product-card">
                        <h4>{p.name}</h4>
                        <p>Цена: {p.price} ₸</p>
                        <p>Остаток: {p.quantity}</p>
                        <p>Артикул: {p.article}</p>
                        <p>Штрихкод: {p.barcode}</p>
                        <button onClick={() => addToCart(p)}>
                            Добавить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}