const express = require('express');
const router = express.Router();

const { createProject } = require('../controllers/createProject');
const { getAllProjects } = require('../controllers/getAllProjects');
const { updateProjectStatus } = require('../controllers/updateStatus');

const { getDashboardCounts } = require('../controllers/countofProject')
const{chartProject}=require('../controllers/chartProject')

router.post('/create', createProject);

router.get('/projects', getAllProjects);

router.put('/:id/status', updateProjectStatus);

router.get('/count', getDashboardCounts);

router.get('/chartProject', chartProject);

module.exports = router;
