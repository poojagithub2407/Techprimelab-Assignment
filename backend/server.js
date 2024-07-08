const express = require('express');
const connectDB = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const projectRoutes = require('./routes/project');


const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', projectRoutes);









const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
