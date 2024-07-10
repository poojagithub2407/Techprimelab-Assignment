const express = require('express');
const router = express.Router();


const { createProject } = require('../controllers/createProject');
const { getAllProjects } = require('../controllers/getAllProjects');
const { updateProjectStatus } = require('../controllers/updateStatus');

const { countTotalProjects,
     countRunningProjects,
     countCancelledProjects,
     countOverdueRunningProjects,
     countClosedProjects } = require('../controllers/countofProject')
const{chartProject}=require('../controllers/chartProject')

router.post('/create', createProject);

router.get('/projects', getAllProjects);

router.put('/:id/status', updateProjectStatus);

router.get('/count/total', countTotalProjects);
router.get('/count/closed', countClosedProjects);
router.get('/count/running', countRunningProjects);
router.get('/count/overdue-running', countOverdueRunningProjects);
router.get('/count/cancelled', countCancelledProjects);

router.get('/chartProject', chartProject);

module.exports = router;
