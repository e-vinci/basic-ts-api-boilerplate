"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_path_1 = __importDefault(require("node:path"));
const json_1 = require("../utils/json");
const type_guards_1 = require("../utils/type-guards");
const router = (0, express_1.Router)();
const jsonDbPath = node_path_1.default.join(__dirname, '/../data/pizzas.json');
const defaultPizzas = [
    {
        id: 1,
        title: '4 fromages',
        content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
    },
    {
        id: 2,
        title: 'Vegan',
        content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
    },
    {
        id: 3,
        title: 'Vegetarian',
        content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
    },
    {
        id: 4,
        title: 'Alpage',
        content: 'Gruyère, Mozarella, Lardons, Tomates',
    },
    {
        id: 5,
        title: 'Diable',
        content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
    },
];
/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
    var _a;
    if (req.query.order && !(0, type_guards_1.isString)(req.query.order))
        return res.sendStatus(400);
    const orderByTitle = ((_a = req.query.order) === null || _a === void 0 ? void 0 : _a.includes('title'))
        ? req.query.order
        : undefined;
    let orderedMenu = [];
    const pizzas = (0, json_1.parse)(jsonDbPath, defaultPizzas);
    if (orderByTitle)
        orderedMenu = [...pizzas].sort((a, b) => a.title.localeCompare(b.title));
    if (orderByTitle === '-title')
        orderedMenu = orderedMenu.reverse();
    return res.json(orderedMenu.length === 0 ? pizzas : orderedMenu);
});
// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
    const pizzas = (0, json_1.parse)(jsonDbPath, defaultPizzas);
    const idInRequest = parseInt(req.params.id, 10);
    const indexOfPizzaFound = pizzas.findIndex((pizza) => pizza.id === idInRequest);
    if (indexOfPizzaFound < 0)
        return res.sendStatus(404);
    return res.json(pizzas[indexOfPizzaFound]);
});
// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
    var _a, _b, _c, _d;
    const title = ((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.length) !== 0 ? req.body.title : undefined;
    const content = ((_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.length) !== 0 ? req.body.content : undefined;
    if (!title || !content)
        return res.sendStatus(400); // error code '400 Bad request'
    const pizzas = (0, json_1.parse)(jsonDbPath, defaultPizzas);
    // const lastItemIndex = pizzas?.length ? pizzas.length - 1 : undefined;
    // const nextId = (lastItemIndex ?? -1) + 1;
    // Use reduce() to find the highest id in the pizzas array
    const nextId = pizzas.reduce((maxId, pizza) => (pizza.id > maxId ? pizza.id : maxId), 0) + 1; // 0 is the initial value of maxId  
    const newPizza = {
        id: nextId,
        title,
        content,
    };
    pizzas.push(newPizza);
    (0, json_1.serialize)(jsonDbPath, pizzas);
    return res.json(newPizza);
});
// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
    const pizzas = (0, json_1.parse)(jsonDbPath, defaultPizzas);
    const idInRequest = parseInt(req.params.id, 10);
    const foundIndex = pizzas.findIndex((pizza) => pizza.id === idInRequest);
    if (foundIndex < 0)
        return res.sendStatus(404);
    const itemsRemovedFromMenu = pizzas.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromMenu[0];
    (0, json_1.serialize)(jsonDbPath, pizzas);
    return res.json(itemRemoved);
});
// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    var _a, _b;
    const title = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title;
    const content = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.content;
    if ((!title && !content) || (title === null || title === void 0 ? void 0 : title.length) === 0 || (content === null || content === void 0 ? void 0 : content.length) === 0) {
        return res.sendStatus(400);
    }
    const pizzas = (0, json_1.parse)(jsonDbPath, defaultPizzas);
    const idInRequest = parseInt(req.params.id, 10);
    const foundIndex = pizzas.findIndex((pizza) => pizza.id === idInRequest);
    if (foundIndex < 0)
        return res.sendStatus(404);
    const updatedPizza = Object.assign(Object.assign({}, pizzas[foundIndex]), req.body);
    pizzas[foundIndex] = updatedPizza;
    (0, json_1.serialize)(jsonDbPath, pizzas);
    return res.json(updatedPizza);
});
exports.default = router;
