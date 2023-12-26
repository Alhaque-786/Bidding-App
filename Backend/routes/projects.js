const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.post('/projects', async (req, res) => {
    const { title, description } = req.body;

    const project = new Project({
        title,
        description,
        bids: [],
        isActive: false
    });

    try {
        const newProject = await Project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

router.get('/projects/:id', getProject, (req, res) => {
    res.json(res.project);
});


router.patch('/projects/:id', getProject, async (req, res) => {
    if(req.body.title != null) {
        res.project.title = req.body.title;
    }

    if(req.body.description != null) {
        res.project.description = req.body.description;
    }

    try {
        const updatedProject = await res.project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

router.delete('/projects/:id',getProject, async (req, res) => {
    try {
        await res.project.remove();
        res.json({message: 'Project deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

async function getProject(req, res, next) {
    try {
        const projects = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Project not found !!' });
        }
        res.project = project;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports= router;