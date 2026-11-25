import express from "express";
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import urlRouter from "./routes/url.route.js";
import { redirectFromShortUrl } from "./controllers/url.controller.js";

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/users",userRouter)
app.use("/api/v1/urls",urlRouter)
app.get("/:id", redirectFromShortUrl);



app.use(errorHandler);

export default app;
