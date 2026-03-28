require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const comicRoutes = require("./routes/comic.routes");
const chapterRoutes = require("./routes/chapter.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/comics", comicRoutes);
app.use("/api/chapters", chapterRoutes);

// swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log("Server running at http://localhost:" + PORT);
});
