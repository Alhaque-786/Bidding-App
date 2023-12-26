const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/bids/:projectId', async (req, res) => {
    try {
        const project = await project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        const bids = project.bids;
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

router.post('/bids/:projectId', async (req, res) => {
    const { user, amount } = req.body;

    try {
        const project = await project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        project.bids.push({ user, amount });
        await project.save();
        res.status(201).json(project.bids);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
})

module.exports = router;