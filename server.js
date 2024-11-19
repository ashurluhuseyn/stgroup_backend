const http = require('http'); 
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./config/db');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 4000;
const authRoutes = require('./routes/authRoute');
const blogRoutes = require('./routes/blogRoute');
const planRoutes = require('./routes/planRoute');
const homeRoutes = require('./routes/HomeRoutes/homeRoute');
const aboutRoutes = require('./routes/aboutRoute');
const statRoutes = require('./routes/statRoute');
const courseRoutes = require('./routes/CourseRoutes/courseRoute');
const vacancyRoutes = require('./routes/vacancyRoute');
const eventRoutes = require('./routes/eventRoute');
const jobApplyRoutes = require('./routes/ApplyRoutes/jobApply');
const serviceRoute = require('./routes/serviceRoute');
const categoryRoutes = require('./routes/categoryRoute');
const teacherRoutes = require('./routes/teacherRoute');
const advantageRoutes = require('./routes/advantageRoute');
const trainingPlanRoutes = require('./routes/CourseRoutes/trainingPlanRoute');
const academicApplyRoutes = require('./routes/ApplyRoutes/academicApply');
const corporateApplyRoutes = require('./routes/ApplyRoutes/corporateApply');

// DB connection
const { testConnection } = require('./config/db');
testConnection();

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/plan", planRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/vacancy", vacancyRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/stat", statRoutes);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/vacancy/apply", jobApplyRoutes);
app.use("/api/v1/training/plan", trainingPlanRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/advantage", advantageRoutes);
app.use("/api/v1/apply/corporate", corporateApplyRoutes);
app.use("/api/v1/apply/academic", academicApplyRoutes);


sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err.message);
  });


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);
  
    if (message.toLowerCase().includes("salam")) {
      socket.emit("receiveMessage", "Server: Salam! Necəsiniz?");
    } else {
      socket.emit("receiveMessage", "Server: Sualınızı daha dəqiq verin.");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});