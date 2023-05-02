const redis = require("redis")
const ioredis= require("ioredis")

const redis_cliet = redis.createClient();

redis_cliet.on("connect", async ()=>{
    console.log("Connected to the redis");

});

redis_cliet.on("error", (err)=>{
    console.log(err.message);
});

redis_cliet.connect();

module.exports ={redis_cliet}
