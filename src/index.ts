import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database";
import cors from "cors";
import crowdfundRoutes from "./routes/crowdfundRoutes";
import authRoutes from "./routes/authRoutes";
import feedbackRoutes from './feedbackRoutes';

const app = express();
const PORT = 3001;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hello World!",
    date: new Date(),
  });
});

app.use("/crowdfunds", crowdfundRoutes);
app.use('/auth', authRoutes);
app.use('/api', feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
