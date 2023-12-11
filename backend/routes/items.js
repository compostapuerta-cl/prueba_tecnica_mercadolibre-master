import { Router } from 'express'
import { ItemController } from '../controllers/items.js'

export function createItemRouter ({ itemModel }) {
  const itemRouter = Router()
  const itemController = new ItemController({ itemModel })

  itemRouter.get('/', itemController.getAll)
  itemRouter.get('/:id', itemController.getById)

  return itemRouter
}
