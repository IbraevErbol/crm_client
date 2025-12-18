export default function CartPanel({ cart, setCart }) {
    //       <CartHeader />
    //   <CartList />
    //   <CartFooter />
    const changeQty = (id, delta) => {
        setCart((prev) =>
            prev.map((p) => 
                    p._id === id
                        ? {...p, quantity: p.quantity + delta}
                        : p
                    ).filter((p) => p.quantity > 0)    
        )
    }

    const total = cart.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );

    return (
        <div className="cart-panel">
            <h2>Чек</h2>
            {cart.length === 0 && <p>Корзина пуста</p>}

            {cart.map((p) => (
                <div key={p._id} className="cart-item">
                    <div>
                        <strong>{p.name}</strong>
                        <p>{p.price} ₸ × {p.quantity}</p>
                    </div>

                    <div className="cart-actions">
                        <button onClick={() => changeQty(p._id, -1)}>-</button>
                        <span>{p.quantity}</span>
                        <button onClick={() => changeQty(p._id, 1)}>+</button>
                        <button onClick={() => removeFromCart(p._id)}>✕</button>
                    </div>
                </div>
            ))}

            {cart.length > 0 && (
                <div className="cart-total">
                    <hr />
                    <h3>Итого: {total} ₸</h3>
                </div>
            )}
        </div>
    )
}