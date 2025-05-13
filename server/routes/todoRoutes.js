const express = require("express");
const { todoModel } = require("../models/Todo");
const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await todoModel.find().sort({ createdAt: -1 });
    res.json(todos);
});

router.post('/', async (req, res) => {
    const { text } = req.body;
    const todo = new todoModel({ text });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
});

router.put('/:id', async (req, res) => {
    const updatedTodo = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});

router.delete('/:id', async (req, res) => {
    await todoModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});

module.exports = {
    todoRoutes: router
};
