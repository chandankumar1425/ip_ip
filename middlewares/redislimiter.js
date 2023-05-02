const redis_clent = require("../helpers/redis")

const redis_limit = (req, res, next) => {

  const ip = req.ip;

  redis_clent.get(ip, (err, data) => {

    if (err) throw err;

    let no_requests = data ? parseInt(data) : 0;
    
    if (no_requests < 3) {

      redis_clent.set(ip, no_requests + 1);

      next();

    } else {

      res.json({ message: 'Out of limit ' });

    }

  });

};

module.exports = {redis_limit};

