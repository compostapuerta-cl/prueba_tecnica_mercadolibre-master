import axios from 'axios'
import dotenv from 'dotenv'
import { getDecimals, getAuthor } from '../utils.js'
dotenv.config()

const BASE_URL = process.env.BASE_URL
const author = getAuthor()
const CATEGORY_ID = 'category'

/**
 * Model that queries MercadoLibre's public API
 */
export class ItemModel {
  static async getAll ({ query }) {
    const url = new URL(`${BASE_URL}/sites/MLA/search`)
    if (query) url.searchParams.set('q', query)
    const { data } = await axios.get(url)
    console.log(data)
    const categories = getCategories(data.available_filters)
    const items = data.results.map(result => getItem(result))

    return { author, categories, items }
  }

  static async getById ({ id }) {
    const url = new URL(`${BASE_URL}/items/${id}`)
    const { data } = await axios.get(url)

    const detailsUrl = new URL(`${BASE_URL}/items/${id}/description`)

    const { data: detailsData } = await axios.get(detailsUrl)

    const item = { ...getItem(data), sold_quantity: data.sold_quantity, description: detailsData.plain_text }
    return { author, item }
  }
}

function getCategories (filters) {
  const categoriesList = filters.find(filter => filter.id === CATEGORY_ID)?.values || []

  // sort categories by amount of results DESC
  const sortedCategories = categoriesList.sort((a, b) => b.results - a.results)

  return sortedCategories.slice(0, 4).map((element) => element.name)
}

function getItem (result) {
  return {
    id: result.id,
    title: result.title,
    price: {
      currency: result.currency_id,
      amount: result.price,
      decimals: getDecimals(result.price, '.')
    },
    picture: result.thumbnail,
    condition: result.buying_mode,
    free_shipping: result.shipping.free_shipping
  }
}
