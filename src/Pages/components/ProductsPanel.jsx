import { useState } from "react"
import { Input, Card, Row, Col, Empty, Button, Typography, Tag } from "antd";
//кнопки добавить прикрепит снизу в будущем
const { Text } = Typography
const { Search } = Input;

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
            if (exists) {
                return prev.map((p) =>
                    p._id === product._id
                        ? { ...p, cartQty: p.cartQty + 1 }
                        : p
                );
            }

            return [...prev, { ...product, cartQty: 1 }];
        })
    }

    return (
        <div className="products-panel">
            {/* <h2>Товары</h2> */}
            <Search
                type="text"
                placeholder="Поиск по названию, артиклю или штрихкоду..."
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "10px" }}
            />

            {filtered.length === 0 ? (
                <Empty description="Товары не найдены" />

            ) : (
                <Row gutter={[16, 16]}>
                    {filtered.map((p) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
                            {/* <Card
                                hoverable
                                title={p.name}
                                actions={[
                                    <Button
                                        type="primary"
                                        block
                                        disabled={p.quantity === 0}
                                        onClick={() => addToCart(p)}
                                    >
                                        Дoбавить
                                    </Button>]}
                            >
                                <Text strong>{p.price}</Text>

                                <div style={{ marginTop: 8 }}>
                                    <Tag color={p.quantity > 0 ? "green" : "red"}>
                                        Остаток: {p.quantity}
                                    </Tag>
                                </div>
                                <Text type="secondary">Артикул: {p.article}</Text><br />
                                <Text type="secondary">Штрихкод: {p.barcode}</Text>
                            </Card> */}
                            <Card hoverable>
                                <Text strong style={{ fontSize: 16, display: "block" }}>
                                    {p.name}
                                </Text>

                                <Text strong>{p.price} ₸</Text>

                                <div style={{ marginTop: 8 }}>
                                    <Tag color={p.quantity > 0 ? "green" : "red"}>
                                        Остаток: {p.quantity}
                                    </Tag>
                                </div>

                                <Text type="secondary">Артикул: {p.article}</Text><br />
                                <Text type="secondary">Штрихкод: {p.barcode}</Text>

                                <Button
                                    type="primary"
                                    block
                                    disabled={p.quantity === 0}
                                    style={{ marginTop: 12 }}
                                    onClick={() => addToCart(p)}
                                >
                                    Добавить
                                </Button>
                            </Card>
                        </Col>
                    ))}

                </Row>)}

        </div>
    )
}