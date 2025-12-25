import { useNavigate, useParams } from "react-router-dom"
import { editProductById, findProductById } from "../api/product"
import { useEffect, useState } from "react"
import "./CreateNewProduct.css";

export default function EditProduct() {
    const { id } = useParams()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        price: "",
        costPrice: "",
        article: "",
        barcode: "",
        quantity: "",
        category: "",
        description: "",
        discount: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editProductById(id, {
                ...form,
                price: Number(form.price),
                costPrice: Number(form.costPrice),
                quantity: Number(form.quantity),
                discount: Number(form.discount)
            })

            navigate("/admin");
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await findProductById(id);
                setForm({
                    name: data.name || "",
                    price: data.price || "",
                    costPrice: data.costPrice || "",
                    article: data.article || "",
                    barcode: data.barcode || "",
                    quantity: data.quantity || "",
                    category: data.category || "",
                    description: data.description || "",
                    discount: data.discount || ""
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        if (id) loadProducts();
    }, [id])


    if (loading) return <p>...Загрузка</p>
    return (
        <div className="create-product-container" style={{ maxWidth: "600px" }}>
            <h2>Редактирование товара</h2>
            <form onSubmit={handleSubmit}>
                <Input label="Название" name="name" value={form.name} onChange={handleChange} required />
                <Input label="Цена" name="price" type="number" value={form.price} onChange={handleChange} required />
                <Input label="Себестоимость" name="costPrice" type="number" value={form.costPrice} onChange={handleChange} required />
                <Input label="Артикул" name="article" value={form.article} onChange={handleChange} required />
                <Input label="Штрихкод" name="barcode" value={form.barcode} onChange={handleChange} required />
                <Input label="Количество" name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
                <Input label="Категория" name="category" value={form.category} onChange={handleChange} />
                <Input label="Скидка (%)" name="discount" type="number" value={form.discount} onChange={handleChange} />

                <div style={{ marginBottom: "10px" }}>
                    <label>Описание</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        style={{ width: "100%", minHeight: "80px" }}
                    />
                </div>

                <button type="submit">Сохранить изменения</button>
                <button type="button" onClick={() => navigate("/admin")} style={{ marginLeft: "10px" }}>
                    Отмена
                </button>
            </form>

        </div>
    )
}

const Input = ({ label, ...props }) => (
    <div className="form-group" style={{ marginBottom: "10px" }}>
        <label>
            {label}
            <input {...props} style={{ width: "100%", padding: "8px" }} />
        </label>
    </div>
);