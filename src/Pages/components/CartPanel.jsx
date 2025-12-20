import { useState } from "react";

export default function CartPanel({ cart, setCart }) {
    const [isPayOpen, setIsPayOpen] = useState(false);


    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((p) => p._id !== id));
    };

    const changeQty = (id, delta) => {
        setCart((prev) =>
            prev.map((p) =>
                p._id === id
                    ? { ...p, cartQty: p.cartQty + delta }
                    : p
            ).filter((p) => p.cartQty > 0)
        )
    }

    const total = cart.reduce(
        (sum, p) => sum + p.price * p.cartQty,
        0
    );


    const handlePay = (type) => {
        alert(
            type === "cash"
                ? "Оплата наличными"
                : "Оплата картой"
        );

        setCart([]);        // очистили корзину
        setIsPayOpen(false); // закрыли модалку
    };

    return (
        <div className="cart-panel">
            <h2>Чек</h2>
            {cart.length === 0 && <p>Корзина пуста</p>}

            {cart.map((p) => (
                <div key={p._id} className="cart-item">
                    <div>
                        <strong>{p.name}</strong>
                        <p>{p.price} ₸ × {p.cartQty}</p>
                    </div>

                    <div className="cart-actions">
                        <button onClick={() => changeQty(p._id, -1)}>-</button>
                        <span>{p.cartQty}</span>
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

            {cart.length > 0 && (
                <div className="cart-footer">
                    <button
                        className="pay-button"
                        onClick={() => setIsPayOpen(true)}
                    >
                        Оплатить
                    </button>
                </div>
            )}

            {isPayOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Способ оплаты</h3>

                        <button onClick={() => handlePay("cash")}>
                            💵 Наличными
                        </button>

                        <button onClick={() => handlePay("card")}>
                            💳 Картой
                        </button>

                        <button
                            className="close-btn"
                            onClick={() => setIsPayOpen(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}