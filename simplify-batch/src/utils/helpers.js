function getUserData(users) {
    return users.flatMap(user => user.orders.filter(order => order.status === 'active'))
}

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

async function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id, name: `User ${id}` }), 1000)
    })
}

export { getUserData, calculateTotal, fetchUser }
