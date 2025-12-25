import { Route, Routes, useLocation} from 'react-router-dom'

import Home from './Home';
import AdminPage from "./admin/AdminPage"
import WorkPage from './Pages/WorkPage';
import CreateNewProduct from './admin/CreateNewProduct';
import EditProduct from './admin/EditProduct';
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
        <Route path="/admin/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  )
}
export default App

