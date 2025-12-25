import { useNavigate } from 'react-router-dom'
import { Button, Input, Modal, Typography, Card, Row, Col, message } from "antd";
import { useState } from 'react';

// защиту роутов (PrivateRoute)
// хранение isAdmin в localStorage
// реальную авторизацию через backend

const { Title, Text } = Typography;
const pas = "1234"

export default function Home() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState("");

    const handleAdminToggle = () => {
        if (password === pas) {
            setOpen(false);
            setPassword('');
            navigate('/admin');
        } else {
            message.error("Неверный пароль");
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f5f5",
            }}
        >
            <Card style={{ width: 500, textAlign: "center" }}>
                <Title level={2}>POS / Кассовая система</Title>
                <Text type='secondary'>Выберите режим работы</Text>

                <Row gutter={16} style={{ marginTop: 30 }}>
                    <Col span={12}>
                        <Button
                            type="primary"
                            size="large"
                            block
                            onClick={() => navigate('/work')}
                        >
                            Касса
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            size="large"
                            block
                            onClick={() => setOpen(true)}
                        >
                            Админка
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Вход в админку"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                centered
            >
                <Input.Password
                    placeholder='Введите пороль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onPressEnter={handleAdminToggle}
                />
                <Button
                    type="primary"
                    block
                    style={{ marginTop: 16 }}
                    onClick={handleAdminToggle}
                >
                    Войти
                </Button>
            </Modal>
        </div>
    )
}