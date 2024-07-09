const Project = require('../models/Project');

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

        let sortCriteria = {};
        if (sortBy) {
            sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

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

const countTotalProjects = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        res.json({ totalProjects });
    } catch (error) {
        console.error('Error counting total projects:', error);
        res.status(500).json({ error: 'Unable to count total projects' });
    }
};

const countClosedProjects = async (req, res) => {
    try {
        const closedProjects = await Project.countDocuments({ Status: 'Closed' });
        res.json({ closedProjects });
    } catch (error) {
        console.error('Error counting closed projects:', error);
        res.status(500).json({ error: 'Unable to count closed projects' });
    }
};

const countRunningProjects = async (req, res) => {
    try {
        const runningProjects = await Project.countDocuments({ Status: 'Running' });
        res.json({ runningProjects });
    } catch (error) {
        console.error('Error counting running projects:', error);
        res.status(500).json({ error: 'Unable to count running projects' });
    }
};

const countOverdueRunningProjects = async (req, res) => {
    try {
        const today = new Date();
        const overdueRunningProjects = await Project.countDocuments({
            Status: 'Running',
            Enddate: { $lt: today }
        });
        res.json({ overdueRunningProjects });
    } catch (error) {
        console.error('Error counting overdue running projects:', error);
        res.status(500).json({ error: 'Unable to count overdue running projects' });
    }
};

const countCancelledProjects = async (req, res) => {
    try {
        const cancelledProjects = await Project.countDocuments({ Status: 'Cancelled' });
        res.json({ cancelledProjects });
    } catch (error) {
        console.error('Error counting cancelled projects:', error);
        res.status(500).json({ error: 'Unable to count cancelled projects' });
    }
};

const chartProject = async (req, res) => {
    try {
        const departments = ['Finance', 'Strategy', 'Quality', 'Maintenance']; // Example departments

        const promises = departments.map(async (department) => {
            const totalProjects = await Project.countDocuments({ Department: department });
            const closedProjects = await Project.countDocuments({ Department: department, Status: 'Closed' });

            return {
                department,
                totalProjects,
                closedProjects
            };
        });

        const departmentCounts = await Promise.all(promises);
        res.json({ departmentCounts });
    } catch (error) {
        console.error('Error fetching department project counts:', error);
        res.status(500).json({ error: 'Unable to fetch department project counts' });
    }
};

module.exports = {
    createProject,
    getAllProjects,
    updateProjectStatus,
    countTotalProjects,
    countClosedProjects,
    countRunningProjects,
    countOverdueRunningProjects,
    countCancelledProjects,
    chartProject
};
