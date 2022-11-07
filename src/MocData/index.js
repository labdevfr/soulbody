const array = [
    {
        id: 1,
        name: 'Трусики-MIRANDA',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/183/carenOne.jpg'
    },
    {
        id: 2,
        name: 'Трусики-DIAMOND',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/500/diamondOne.jpg'
    },
    {
        id: 3,
        name: 'Трусики-BETTY',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/660/bettyOne.jpg'
    },
    {
        id: 4,
        name: 'Трусики-KAREN',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/0116/karenOne.jpg'
    },
    {
        id: 5,
        name: 'Трусики-TWIG',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/1757/twigOne.jpg'
    },
    {
        id: 6,
        name: 'Трусики-JANET',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/152/janetOne.jpg'
    },
    {
        id: 7,
        name: 'Трусики-MARGARET',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/15/margaretOne.jpg'
    },
    {
        id: 8,
        name: 'Трусики-SARA',
        price: 49,
        image: 'https://raw.githubusercontent.com/MaksOnofriychuk/panty-shop/main/product-photos/3681/saraOne.jpg'
    },

]


export function getOne(id) {
    return array.find(item=>item.id == id)
}

export default array
