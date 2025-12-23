import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../api/product";
import { Table, Tag, Button, Input, Segmented, Badge, Space, Modal } from "antd";

{/*Доска задач */ }
//Реализовать удаление, изменение +
//при добавления обязательные поля назвние, цена, себестоимость, артикл, штрихкоде, количество +
//Продано не добавляется 

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("none");
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSelected = () => {
    Modal.confirm({
      title: "Удалить товары?",
      content: `Будет удалено: ${selected.length}`,
      okText: "Удалить",
      okType: 'danger',
      cancelText: "Отмена",
      async onOk() {
        await Promise.all(selected.map(id => deleteProduct(id)));
        setSelected([]);
        setMode("none");
        loadProducts();
      }
    })

  }

  const rowSelection = mode === 'delete' ? {
    selectedRowKeys: selected,
    onChange: (keys) => setSelected(keys),
  } : undefined;

  useEffect(() => {
    if (mode !== 'delete') setSelected([]);
  }, [mode])

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return products.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.article?.toLowerCase().includes(q) ||
      p.barcode?.toLowerCase().includes(q)
    );
  }, [products, search]);

  const columns = [
    {
      title: "#", key: "index",
      render: (_, __, index) => index + 1,
    },
    { title: 'Название', dataIndex: 'name', key: 'name', },
    {
      title: 'Цена', dataIndex: 'price', key: 'price',
      render: (p) => `${p.toLocaleString()}₸`
    },
    { title: 'Артикул', dataIndex: 'article', key: 'article', },
    { title: 'Штрихкод', dataIndex: 'barcode', key: 'barcode', },
    {
      title: 'Себестоимость', dataIndex: 'costPrice', key: 'costPrice',
      render: (p) => `${p.toLocaleString()}₸`
    },
    {
      title: 'Количество', dataIndex: 'quantity', key: 'quantity',
      render: (qty) =>
        <Tag color={qty > 0 ? 'green' : 'red'}>
          {qty}
        </Tag>
    },
    { title: 'Категория', dataIndex: 'category', key: 'category', },
    { title: 'Описание', dataIndex: 'description', key: 'description', },
    {
      title: 'Скидка', dataIndex: 'discount', key: 'discount',
      render: (d) => `${d}%`
    },
    { title: 'Продано', dataIndex: 'soldCount', key: 'soldCount', },
    {
      title: 'Создано', dataIndex: 'createdAt', key: 'createdAt',
      render: (value) =>
        value ? new Date(value).toLocaleString() : "-",
    },
    {
      title: 'Обновлено', dataIndex: 'updatedAt', key: 'updatedAt',
      render: (value) =>
        value ? new Date(value).toLocaleString() : "-",
    },
    ...(mode === 'edit' ?
      [
        {
          title: "Действие", key: "action",
          render: (_, record) => (
            <Button onClick={() => navigate(`/admin/edit/${record._id}`)}>
              ✏️
            </Button>
          )
        }
      ] : [])
  ]



  return (
    <div style={{ padding: "20px" }}>

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          marginBottom: 20,
          gap: 16,
        }}
      >
        <Input
          placeholder="Поиск товара..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
          allowClear
        />

        <Space>
          <span>Всего: <b>{products.length}</b></span>

          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { label: "Просмотр", value: 'none' },
              { label: "Изменить", value: 'edit' },
              { label: "Удалить", value: 'delete' },
            ]}
          />

          <Link to='/admin/create-prod'>
            <Button type="primary">➕ Добавить</Button>
          </Link>

          {mode === 'delete' && (
            <Badge count={selected.length}>
              <Button
                danger
                disabled={selected.length === 0}
                onClick={deleteSelected}
              >
                Удалить
              </Button>
            </Badge>
          )}
        </Space>
      </div>
      {/* LIST */}
      <div>
        <h2>Все товары</h2>
        {filtered.length === 0 && <p>Нет товаров</p>}


        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};


export default AdminPage;
