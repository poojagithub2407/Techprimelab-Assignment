
const Project = require('../models/Project');

const getAllProjects = async (req, res) => {
     try {
          const {
               searchTerm,
               sortBy,
               sortOrder = 'asc',
               page = 1,
               limit = 10
          } = req.query;

          let filter = {};

          if (searchTerm) {
               filter.$or = [
                    { Projecttheme: new RegExp(searchTerm, 'i') },
                    { Reason: new RegExp(searchTerm, 'i') },
                    { Type: new RegExp(searchTerm, 'i') },
                    { Division: new RegExp(searchTerm, 'i') },
                    { Category: new RegExp(searchTerm, 'i') },
                    { Priority: new RegExp(searchTerm, 'i') },
                    { Department: new RegExp(searchTerm, 'i') },
                    { Location: new RegExp(searchTerm, 'i') },
                    { Status: new RegExp(searchTerm, 'i') },
               ];
          }

          let sortCriteria = {};

          const sortableFields = ['Project Theme', 'Reason', 'Type', 'Division', 'Category', 'Priority', 'Department', 'Location'];

          if (sortBy && sortableFields.includes(sortBy)) {
               sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;
          } else {
               sortCriteria['Projecttheme'] = sortOrder === 'desc' ? -1 : 1;
          }

          const skip = (page - 1) * limit;
          const totalDocuments = await Project.countDocuments(filter);
          const projects = await Project.find(filter).sort(sortCriteria).skip(skip).limit(parseInt(limit));

          res.json({
               projects,
               totalDocuments,
               totalPages: Math.ceil(totalDocuments / limit),
               currentPage: parseInt(page)
          });
     } catch (error) {
          console.error('Error fetching projects:', error);
          res.status(500).json({ error: 'Unable to fetch projects' });
     }
};
module.exports = {
     getAllProjects
}