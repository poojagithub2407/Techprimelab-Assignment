const express = require('express');
const router = express.Router();
const {
     createProject,
     getAllProjects,
     updateProjectStatus,
     countTotalProjects,
     countClosedProjects,
     countRunningProjects,
     countOverdueRunningProjects,
     countCancelledProjects,
     chartProject
} = require('../controllers/projectController');

router.post('/create', createProject);
router.get('/projects', getAllProjects);
router.put('/projects/:id/status', updateProjectStatus);

router.get('/count/total', countTotalProjects);
router.get('/count/closed', countClosedProjects);
router.get('/count/running', countRunningProjects);
router.get('/count/overdue-running', countOverdueRunningProjects);
router.get('/count/cancelled', countCancelledProjects);

// router.get('/department/success', getDepartmentSuccessPercentage);

router.get('/chartProject', chartProject);

module.exports = router;
