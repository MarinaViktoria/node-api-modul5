const express = require('express');
const app = express();
const items = require('./Items');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
    res.json(items);
})
app.post('/api/items', (req, res) => {
    const newItem = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    items.push(newItem);
    res.json(items);
})
app.delete('/api/items/:id', (req, res) => {
    let { id } = req.params;
    let itemToBeDeleted = items.find(item => item.id === id);
    if (itemToBeDeleted) {
        res.json({
            message: "Item deleted",
            items: items.filter(item => item.id !== id)
    })
    }
    else {
        res.status(404).json({
            message:`Item you're looking for doesn't exist` 
        })
    }
})
app.put('/api/items/:name', (req, res) => {
    let { name } = req.params;
    let itemToBeChanged = items.find(item => item.name === name);
    if (itemToBeChanged) {
        const changeItem = req.body;
        items.forEach(item => {
            if (item.name === req.params.name) {
                item.name = changeItem ? changeItem.name : item.name;
                res.json({message: `Item changed`, items})
            }
        })
        }
            else {
                res.status(404).json({
                    message: `Item you're looking for doesn't exist` 
                })
            }
         })
    

app.listen(8000, () => {
    console.log(`It's working!!!`)
})