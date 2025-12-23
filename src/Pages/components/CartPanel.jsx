import { useState } from "react";
import { salesCart } from "../../api/product";
import { Button, List, Modal, Typography, Divider } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export default function CartPanel({ cart, setCart }) {
    const [isPayOpen, setIsPayOpen] = useState(false);


    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((p) => p._id !== id));
    };

    const changeQty = (id, delta) => {
        setCart((prev) =>
            prev.map((p) => {
                if (p._id !== id) return p;

                const nextQty = p.cartQty + delta;
                if (nextQty < 1) return null;
                if (nextQty > p.quantity) return p;

                return { ...p, cartQty: nextQty };
            }
            ).filter(Boolean)
        )
    }

    const total = cart.reduce(
        (sum, p) => sum + p.price * p.cartQty,
        0
    );


    const handlePay = async (type) => {
        const payload = {
            items: cart.map((p) => ({
                productId: p._id,
                name: p.name,
                price: p.price,
                quantity: p.cartQty
            })),
            paymentType: type
        }
        try {
            await salesCart(payload);

            Modal.success({ title: "Оплата прошла успешно" });

            setIsPayOpen(false);
            setCart([]);
        } catch (error) {
            Modal.error({ title: "Ошибка соединения с сервером" });
            console.error(error);
        }


    };


    return (
        <div className="cart-panel">
            <Title level={4}>Чек</Title>
            <List
                dataSource={cart}
                locale={{ emptyText: "Корзина пуста" }}
                renderItem={(p) => (
                    <List.Item
                        actions={[
                            <Button icon={<MinusOutlined />} onClick={() => changeQty(p._id, -1)} />,
                            <Text>{p.cartQty}</Text>,
                            <Button
                                icon={<PlusOutlined />}
                                disabled={p.cartQty >= p.quantity}
                                onClick={() => changeQty(p._id, 1)}
                            />,
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => setCart(c => c.filter(i => i._id !== p._id))}
                            ></Button>
                        ]}
                    >
                        <List.Item.Meta 
                            title={p.name}
                            description={`${p.price} ₸ × ${p.cartQty}`}
                        />
                    </List.Item>
                )}
            />

            
            {/* {cart.map((p) => (
                <div key={p._id} className="cart-item">
                    <div>
                        <strong>{p.name}</strong>
                        <p>{p.price} ₸ × {p.cartQty}</p>
                    </div>

                    <div className="cart-actions">
                        <button onClick={() => changeQty(p._id, -1)}>-</button>
                        <span>{p.cartQty}</span>
                        <button
                            onClick={() => changeQty(p._id, 1)}
                            disabled={p.cartQty >= p.quantity}
                        >
                            +
                        </button>
                        <button onClick={() => removeFromCart(p._id)}>✕</button>
                    </div>
                </div>
            ))} */}

            {cart.length > 0 && (
                // <div className="cart-total">
                //     <hr />
                //     <h3>Итого: {total} ₸</h3>
                // </div>
                <>
                    <Divider />
                    <Title level={5}>Итого: {total} ₸</Title>
                    <Button type="primary" block onClick={() => setIsPayOpen(true)}>
                        Оплатить
                    </Button>
                </>
            )}

            {/* {cart.length > 0 && (
                <div className="cart-footer">
                    <button
                        className="pay-button"
                        onClick={() => setIsPayOpen(true)}
                    >
                        Оплатить
                    </button>
                </div>
            )} */}

            <Modal
                title="Способ оплаты"
                open={isPayOpen}
                onCancel={() => setIsPayOpen(false)}
                footer={null}
            >
                <Button block onClick={() => handlePay("cash")}>💵 Наличными</Button>
                <Button block style={{marginTop: 8}} onClick={() => handlePay("card")}>💳 Картой</Button>
            </Modal> 
            {/* {isPayOpen && (
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
            )} */}
        </div>
    )
}