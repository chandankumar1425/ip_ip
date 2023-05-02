const redis_clent = require("../helpers/redis")

const axios = require("axios")

const currentcityip = require("../models/currentcity.model")

const user = require("../models/user.model")

const currentcityip = async (ip) => {

    const current_city_ip = await redis_clent.get(ip);

    if (current_city_ip) {

        console.log(`Retrieving city for IP ${ip} from cache`);

        return JSON.parse(current_city_ip);
    }

    const res = await axios.get(`https://ipinfo.io/45.121.2.161/json?token=cd6c452ff15285`);

    const city = res.data.city;

    redis_clent.set(ip, JSON.stringify(city), 'EX', 60 * 60 * 6);

    console.log(`Retrieving city for IP ${ip} from API`);

    return city;
};

const ip =`${ip}`

currentcityip(ip)

    .then((city) => {

        console.log(`Current city for IP ${ip}: ${city}`);

    })
    .catch((error) => {

        console.error(error);

    });