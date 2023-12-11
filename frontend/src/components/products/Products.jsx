import './Products.css'
import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'

export function Products () {
  const location = useLocation()
  const search = new URLSearchParams(location.search).get('search')
  const { products, loading } = useProducts({ search })

  if (loading) {
    return <div>Cargando...</div>
  }
  return (
    <section className="products-container">
      {products.length !== 0
        ? (
            products.map(({ id, title, picture, price, free_shipping: freeShipping }) => (
            <Link to={`/items/${id}`} key={id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-container">
                <img src={picture} alt="Product Image" />
                <div className="product-info">
                  <h2 className="product-price">
                    {price.amount.toLocaleString('es-AR', {
                      style: 'currency',
                      currency: price.currency
                    })}
                  </h2>
                  <p className="product-title">{title}</p>
                </div>
                {freeShipping && <p className="free-shipping">Envío gratis!</p>}
              </div>
            </Link>
            ))
          )
        : (
        <div>No se encontraron resultados para tu búsqueda</div>
          )}
    </section>
  )
}
