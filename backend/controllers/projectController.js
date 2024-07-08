const Project = require('../models/Project');

// Create a new project
const createProject = async (req, res) => {
    try {
        const { Projecttheme, Reason, Type, Division, Category, Priority, Department, Startdate, Enddate, Location } = req.body;

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

// Get all projects with optional search, sort, and pagination functionality
const getAllProjects = async (req, res) => {
    try {
        const { Projecttheme, Reason, Type, Division, Category, Priority, Department, Startdate, Enddate, Location, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

        let filter = {};

        if (Projecttheme) filter.Projecttheme = new RegExp(Projecttheme, 'i');
        if (Reason) filter.Reason = new RegExp(Reason, 'i');
        if (Type) filter.Type = new RegExp(Type, 'i');
        if (Division) filter.Division = new RegExp(Division, 'i');
        if (Category) filter.Category = new RegExp(Category, 'i');
        if (Priority) filter.Priority = new RegExp(Priority, 'i');
        if (Department) filter.Department = new RegExp(Department, 'i');
        if (Location) filter.Location = new RegExp(Location, 'i');
        if (Startdate) filter.Startdate = { $gte: new Date(Startdate) };
        if (Enddate) filter.Enddate = { $lte: new Date(Enddate) };

        // Define the sorting criteria
        let sortCriteria = {};
        if (sortBy) {
            sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        // Pagination logic
        const skip = (page - 1) * limit;
        const totalDocuments = await Project.countDocuments(filter);
        const projects = await Project.find(filter).sort(sortCriteria).skip(skip).limit(parseInt(limit));

        res.json({ projects, totalDocuments, totalPages: Math.ceil(totalDocuments / limit), currentPage: parseInt(page) });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Unable to fetch projects' });
    }
};

const updateProjectStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: { Status: status } },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project status:', error);
        res.status(500).json({ error: 'Unable to update project status' });
    }
};

module.exports = { createProject, getAllProjects, updateProjectStatus };
