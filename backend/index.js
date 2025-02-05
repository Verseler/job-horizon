const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(express.json());

const whitelist = [process.env.CLIENT_URL_1];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

const jobs = require("./routes/jobs.routes");
app.use("/jobs", jobs);

const bookmarkJobs = require("./routes/bookmarkJobs.routes");
app.use("/bookmark-jobs", bookmarkJobs);

const jobApplications = require("./routes/jobApplications.routes");
app.use("/job-applications", jobApplications);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected successfully.");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
