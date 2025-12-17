import { useState } from "react";
import { Link } from "react-router-dom";
import { createProduct } from "../api/product";
import "./CreateNewProduct.css";

{/*Доска задач*/ }
//валидация название, артикул, баркоде
//оформление нормальное полей
//соединить с кнопкай в админ стр

const CreateNewProduct = () => {

    const [form, setForm] = useState({
        name: "",
        price: "",
        costPrice: "",
        article: "",
        barcode: "",
        quantity: "",
        category: "",
        description: "",
        images: "",
        discount: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ["name", "price", "costPrice", "article", "barcode", "quantity"];

        for(const field of requiredFields){
            if(!form[field]){
                alert(`Поле "${field}" обязательно для заполнения!`)
                return;
            }
        }
        try {
            const dataToSend = {
                name: form.name,
                price: Number(form.price),
                costPrice: Number(form.costPrice),
                article: form.article,
                barcode: form.barcode,
                quantity: Number(form.quantity),
                category: form.category,
                description: form.description,
                discount: Number(form.discount),
                images: form.images ? form.images.split(",") : [],
            };

            await createProduct(dataToSend);

            alert("Товар успешно создан!");

            setForm({
                name: "",
                price: "",
                costPrice: "",
                article: "",
                barcode: "",
                quantity: "",
                category: "",
                description: "",
                images: "",
                discount: "",
            });
        } catch (err) {
            console.error(err);
            alert("Ошибка: " + err.message);
        }
    }
    return (
        <>
            {/* BACK BUTTON */}
            <div className="back-button">
                <Link to="/admin">
                    <button>Назад</button>
                </Link>
            </div>

            <div className="create-product-container">
                <h2>Создание нового товара</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название *:</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Цена *:</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Себестоимость:</label>
                        <input type="number" name="costPrice" value={form.costPrice} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Артикул:</label>
                        <input type="text" name="article" value={form.article} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Штрихкод:</label>
                        <input type="text" name="barcode" value={form.barcode} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Количество:</label>
                        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Категория:</label>
                        <input type="text" name="category" value={form.category} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Описание:</label>
                        <textarea name="description" value={form.description} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Фото (через запятую):</label>
                        <input type="text" name="images" value={form.images} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Скидка (%):</label>
                        <input type="number" name="discount" value={form.discount} onChange={handleChange} />
                    </div>

                    <button type="submit">Создать товар</button>
                </form>
            </div>
        </>
    )
}

export default CreateNewProduct;