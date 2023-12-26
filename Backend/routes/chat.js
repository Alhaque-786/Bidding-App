const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/chat/:projectId', async (req, res) => {
    try {
        const project = await project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        const messages = project.messages;
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

router.post('/chat/:projectId', async (req, res) => {
    const { user, text } = req.body;

    try {
        const project = await project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        project.messages.push({ user, text });
        await project.save();
        res.status(201).json(project.messages);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
})

module.exports = router;