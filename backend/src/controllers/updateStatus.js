const Project = require('../models/Project');
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

 module.exports={
     updateProjectStatus
 }