import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../api/product";

{/*Доска задач */ }
//Реализовать удаление, изменение
//при добавления обязательные поля назвние, цена, себестоимость, артикл, штрихкоде, количество

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
      // console.log("API data:", data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const deleteSelected = async () => {
    await Promise.all(selected.map(id => deleteProduct(id)));
    
    setSelected([]);
    setMode("none");
    loadProducts();
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* BACK BUTTON */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Назад</button>
        </Link>
      </div>

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Поиск товара..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "50%", padding: "10px", fontSize: "16px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <div>
            <p>Всего товаров: {products.length}</p>
          </div>
          <Link to='/admin/create-prod'>
            <button>Добавить</button>
          </Link>

          {mode === "delete" ? (
            <>
              <button onClick={deleteSelected} disabled={selected.length === 0}>
                Удалить выбранные
              </button>
              <button onClick={() => { setMode("none"); setSelected([]); }}>
                Отмена
              </button>
            </>
          ) : mode === "edit" ? (
            <button onClick={() => setMode("none")}>Отмена</button>
          ) : (
            <>
              <button onClick={() => setMode("delete")}>Удалить</button>
              <button onClick={() => setMode("edit")}>Изменить</button>
            </>
          )}
          <button>Экспорт</button>
          <button>Импорт</button>
        </div>
      </div>

      {/* LIST */}
      <div>
        <h2>Все товары</h2>
        {filtered.length === 0 && <p>Нет товаров</p>}

        {filtered.length > 0 && (
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                {[
                  "#", "Название", "Цена", "Артикул", "Штрихкод",
                  "Себестоимость", "Количество", "Категория", "Описание",
                  "Скидка", "Продано", "Создано", "Обновлено"
                ].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
                {/* Новый столбец */}
                {mode !== "none" && <th style={thStyle}>Действие</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, index) => (
                <tr key={p._id}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.price}₸</td>
                  <td style={tdStyle}>{p.article}</td>
                  <td style={tdStyle}>{p.barcode}</td>
                  <td style={tdStyle}>{p.costPrice}₸</td>
                  <td style={tdStyle}>{p.quantity}</td>
                  <td style={tdStyle}>{p.category || "-"}</td>
                  <td style={tdStyle}>{p.description || "-"}</td>
                  <td style={tdStyle}>{p.discount || 0}%</td>
                  <td style={tdStyle}>{p.soldCount || 0}</td>
                  <td style={tdStyle}>
                    {p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}
                  </td>
                  <td style={tdStyle}>
                    {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "-"}
                  </td>

                  {mode === 'delete' && (
                    <td style={tdStyle}>
                      <input 
                        type="checkbox" 
                        checked={selected.includes(p._id)}
                        onChange={() => toggleSelect(p._id)}
                      />
                    </td>
                  )}
                  {mode === 'edit' && (
                    <td style={tdStyle}>
                      <button onClick={() => navigate(`/admin/edit/${p._id}`)}>
                        ✏️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default AdminPage;
