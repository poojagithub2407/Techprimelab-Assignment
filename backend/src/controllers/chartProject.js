const Project = require('../models/Project');

const chartProject = async (req, res) => {
     try {
         const departments = ['Finance', 'Strategy', 'Quality', 'Maintenance'];
 
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

 module.exports={chartProject};