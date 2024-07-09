const mongoose = require('mongoose');

// Define the project schema
const projectSchema = mongoose.Schema({
  Projecttheme: String,        
  Reason: String,             
  Type: String,              
  Division: String,            
  Category: String,            
  Priority: String,          
  Department: String,          
  Startdate: String,           
  Enddate: String,             
  Location: String,          
  Status: {
    type: String,
    default: "Registered"      
  }
});

const ProjectModel = mongoose.model('projects', projectSchema);

module.exports = ProjectModel;
