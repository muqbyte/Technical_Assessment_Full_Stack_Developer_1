import {Router} from "express";
import {getAllItemsController} from "../controllers/item.controller";
import { newItem } from "../controllers/item.create";
import { getItems, getItemsId } from "../controllers/get.items";
import { putItemById } from "../controllers/put.items";
import { deleteItemById } from "../controllers/delete.items";

const router = Router();

router.get('/', getItems)
router.get('/items/:id', getItemsId)
router.put('/put/items/:id', putItemById)
router.delete('/delete/items/:id', deleteItemById)
router.post('/items', newItem)

export default router;