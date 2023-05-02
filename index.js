const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route");
const { currentcity } = require("./routes/currentcity.route");
const redis_Client = require("./helpers/redis");
const { logger } = require("express-winston");
require("dotenv").config()
const app = express()
app.use(express.json());

app.get("/", async (req, res) => {
   res.send(await redis_Client.get("name"));
})

app.use("/user", userRouter)

app.use("/city", currentcity)


//server
app.listen(PORT, async () => {
   try {
      await connection()
      console.log("Connected to the database");
      logger.log("info", "Database is connected")
   } catch (err) {
      console.log(err.meassage)
      logger.log("error", "Database is not connected properly")

   }
   console.log(`Server is running at port number ${PORT}`);
})