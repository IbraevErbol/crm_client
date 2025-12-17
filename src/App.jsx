import { Link, Route, Routes, useLocation } from 'react-router-dom'

import AdminPage from "./admin/AdminPage"
import WorkPage from './Pages/WorkPage';
import CreateNewProduct from './admin/CreateNewProduct';
import './App.css'
const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Роуты */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/create-prod" element={<CreateNewProduct />}/>
      </Routes>
      {location.pathname === '/' && (
        <>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Link to="/admin">
              <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                Перейти в админку
              </button>
            </Link>
            <Link to="/work">
              <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                Кассы
              </button>
            </Link>
          </div>

        </>
      )}

    </>
  )
}
 
const Home = () => {
  return <div>Главная страница</div>
}

export default App

