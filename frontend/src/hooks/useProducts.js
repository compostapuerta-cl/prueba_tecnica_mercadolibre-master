import { useEffect, useState } from 'react'
import { createAxiosInstance } from '../config'
import { toast } from 'sonner'

const client = createAxiosInstance()

const fetchProducts = async (search) => {
  try {
    const response = await client.get(`/items?q=${search}`)
    const { data } = response
    toast.success('Query exitoso')
    return data.items || []
  } catch {
    toast.error('Ocurrió un error')
    return []
  }
}

export function useProducts ({ search }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    const results = await fetchProducts(search)
    setProducts(results)
    setLoading(false)
  }

  useEffect(() => {
    if (!search) return

    getProducts()
  }, [search])

  return { products, loading }
}
