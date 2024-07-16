
const Project = require('../models/Project');

const createProject = async (req, res) => {
    try {
        const { Projecttheme, Reason, Type, Division,
            Category, Priority, Department, Startdate,
            Enddate, Location } = req.body;

        const newProject = new Project({
            Projecttheme,
            Reason,
            Type,
            Division,
            Category,
            Priority,
            Department,
            Startdate,
            Enddate,
            Location
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Unable to create project' });
    }
};

module.exports = {
    createProject
}