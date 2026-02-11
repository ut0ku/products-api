const express = require('express');
const app = express();
const port = 3000;

// Парсинг
app.use(express.json());

let products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    { id: 2, name: 'Мышь', price: 1500 },
    { id: 3, name: 'Клавиатура', price: 3000 }
];

// РОУТИНГ

// Главная
app.get('/', (req, res) => {
    res.send('Добро пожаловать в API товаров!');
});

// 1. Получить все товары
app.get('/products', (req, res) => {
    res.json(products);
});

// 2. Получить по ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(product);
});

// 3. Добавить товар
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'Не указано название или цена' });
    }
    const newProduct = {
        id: Date.now(),
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 4. Обновить по ID
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    const { name, price } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    res.json(product);
});

// 5. Удалить по ID
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    products.splice(index, 1);
    res.json({ message: 'Товар удален' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});