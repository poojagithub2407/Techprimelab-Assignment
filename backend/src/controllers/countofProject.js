const Project = require('../models/Project');

const getDashboardCounts = async (req, res) => {
  try {
    const today = new Date();

    const formattedToday = today.toISOString().split('T')[0]; 

    const counts = await Project.aggregate([
      {
        $facet: {
          totalProjects: [{ $count: 'total' }],
          closedProjects: [{ $match: { Status: 'Closed' } }, { $count: 'closed' }],
          runningProjects: [{ $match: { Status: 'Running' } }, { $count: 'running' }],
          overdueRunningProjects: [
            { $match: { Status: 'Running', Enddate: { $lt: formattedToday } } },
            { $count: 'overdueRunning' }
          ],
          cancelledProjects: [{ $match: { Status: 'Cancelled' } }, { $count: 'cancelled' }]
        }
      },
      {
        $project: {
          totalProjects: { $arrayElemAt: ['$totalProjects.total', 0] },
          closedProjects: { $arrayElemAt: ['$closedProjects.closed', 0] },
          runningProjects: { $arrayElemAt: ['$runningProjects.running', 0] },
          overdueRunningProjects: { $arrayElemAt: ['$overdueRunningProjects.overdueRunning', 0] },
          cancelledProjects: { $arrayElemAt: ['$cancelledProjects.cancelled', 0] }
        }
      }
    ]);

    res.json(counts[0]);
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    res.status(500).json({ error: 'Unable to fetch dashboard counts' });
  }
};

module.exports = {
  getDashboardCounts
};
