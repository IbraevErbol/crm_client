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

            {cart.length > 0 && (
                <>
                    <Divider />
                    <Title level={5}>Итого: {total} ₸</Title>
                    <Button type="primary" block onClick={() => setIsPayOpen(true)}>
                        Оплатить
                    </Button>
                </>
            )}

            <Modal
                title="Способ оплаты"
                open={isPayOpen}
                onCancel={() => setIsPayOpen(false)}
                footer={null}
            >
                <Button block onClick={() => handlePay("cash")}>💵 Наличными</Button>
                <Button block style={{marginTop: 8}} onClick={() => handlePay("card")}>💳 Картой</Button>
            </Modal> 
    
        </div>
    )
}