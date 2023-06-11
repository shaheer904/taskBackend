const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const session = require("cookie-session");
const compression = require("compression");

dotenv.config(); // read config.env to environmental variables
require("./config/dbConnection")(); // db connection
const AppError = require("./utils/AppError");
const errorHandler = require("./controllers/error/errorhandler");
const userRoute = require("./constants/index").ROUTES.USERS
const userRouter = require("./routes/userRoutes");
const carsRoute = require("./constants/index").ROUTES.CAR;
const carsRouter = require("./routes/carRoutes");
const categoriesRoute = require("./constants/index").ROUTES.CATEGORY;
const categoriesRouter = require("./routes/categoryRoutes");


const PORT = process.env.PORT || 5000; // port
const app = express();


// CORS
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };


  app.use(
    session({
      signed: false,
    })
  );
app.use((req, res, next) => {
    next();
  });

app.get("/health-check", (req, res) => {
    res.status("200").send("server is up and running");
  });

app.use(compression());

app.use(cors(corsOptions));
app.use(morgan("dev"));

// GLOBAL MIDDLEWARES
app.use(express.json()); // body parser (reading data from body to req.body)

app.use(userRoute, userRouter);
app.use(categoriesRoute, categoriesRouter);
app.use(carsRoute, carsRouter);


app.all("*", (req, res, next) =>
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
  