import './App.css'
import { Toaster } from 'sonner'
import { Products } from './components/products/Products'
import { Navbar } from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ProductDetail } from './components/productDetail/ProductDetail'

function App () {
  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="app-container">
        <main className="main-container">
          <div className="breadcrumb">breadcrumb</div>
          <Routes>
            <Route path="/items">
              <Route index element={<Products />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
