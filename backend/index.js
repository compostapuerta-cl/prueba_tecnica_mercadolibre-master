import express, { json } from 'express'
import { createItemRouter } from './routes/items.js'
import { ItemModel } from './models/item.js'
import cors from 'cors'

const app = express()

app.use(json())
app.use(cors())
app.use('/api/items', createItemRouter({ itemModel: ItemModel }))

const PORT = process.env.PORT ?? 3001

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
