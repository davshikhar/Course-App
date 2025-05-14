const express = require('express');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require("./routes/admin");
const app = express();

//we can make use of the express routing


//so here all the routes starting with mentioned routes are routed to the specific functions
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admine",adminRouter);
app.use("/api/v1/course",courseRouter);


app.listen(3000);