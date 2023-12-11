export class ItemController {
  constructor ({ itemModel }) {
    this.itemModel = itemModel
  }

  getAll = async (req, res) => {
    const { q: query } = req.query
    const items = await this.itemModel.getAll({ query })

    if (items) return res.json(items)

    return res.status(404).json({ status: 404, errorMessage: 'Items not found' })
  }

  getById = async (req, res) => {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ status: 400, errorMessage: 'Item Id not provided' })
    }

    const item = await this.itemModel.getById({ id })

    if (!item) {
      res.status(404).json({ status: 404, errorMessage: 'Item not found' })
    }

    res.json(item)
  }
}
