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

//this is a better way since it makes sure that if the database is not connected then the backend does not even start.
/*
async function main(){
    await mongoose.connect("mongodb+srv://admin:Mongodb123@cluster0.xuubqyp.mongodb.net/course-app");
    app.listen(3000);
}

main();
*/

app.listen(3000);