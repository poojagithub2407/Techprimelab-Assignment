const Project = require('../models/Project');


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

module.exports = {
     countTotalProjects,
     countRunningProjects,
     countCancelledProjects,
     countOverdueRunningProjects,
     countClosedProjects
}