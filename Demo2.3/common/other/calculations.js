const pricePerItem = function (rawData) {
    const data = rawData.map(el => {
        const price = el.amount * el.price;
        el.total_per_item = price
        return el
    })
    return data
}

const totalPrice = function(data) {
    const total = data.reduce ((acc, curr) => {
        acc += curr.total_per_item
        return acc
    }, 0)
    return total
}

module.exports = {pricePerItem, totalPrice};