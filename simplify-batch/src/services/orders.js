import db from '../db.js'
import { calculateTotal } from '../utils/helpers.js'

function getOrders(userId) {
    return db.query('SELECT * FROM orders WHERE user_id = ?', [userId])
}

function processOrder(order) {
    if (!order.userId || !order.items.length) return false

    const total = calculateTotal(order.items)
    if (total <= 0) return false

    db.save(order)
    return true
}

export { getOrders, processOrder }
