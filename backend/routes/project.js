// projectRoutes.js
const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, updateProjectStatus } = require('../controllers/projectController');

router.post('/create', createProject);
router.get('/projects', getAllProjects);
router.put('/projects/:id/status', updateProjectStatus);


const authenticateToken = require('../utils/authenticateToken');
const projectController = require('../controllers/projectController');

// Example protected route
router.get('/', authenticateToken, projectController.getAllProjects);
module.exports = router;
