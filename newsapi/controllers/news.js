const users = require("../Users.json");
const { default: axios } = require("axios");
const redis = require("redis");
const redisClient = redis.createClient({
  legacyMode: true,
});
redisClient.on("connect", () => {
  console.log("Connected to Redis12345");
});

redisClient.on("error", (err) => {
  console.log(err.message);
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });
const News = (req, res) => {
  const apikey = process.env.APIKEY;
  const { email = "sasddhanffk@gmail.com", message } = req.body;
  if (!email) {
    return res.status(400).send({ message: message });
  }
  redisClient.get(email, async(err, data) => {
    if (data !== null) {
      console.log(data);
     return res.json(JSON.parse(data));
     
    
    } else {
      const user = users.find((user) => user.email === email);
      const preference = user.preference;
      if (preference.length === 0) {
        res.status(200).send({ message: "there are no prefrerences" });
      }
      const apiRequests = preference.map((pref) =>
        axios.get(
          `https://gnews.io/api/v4/top-headlines?category=${pref}&lang=en&country=IND&max=5&apikey=${apikey}`
        )
      );

      Promise.all(apiRequests)

        .then((responses) => {
          const newsArticles = responses.map((res) => res.data.articles);

          redisClient.setEx(email, 3600, JSON.stringify(newsArticles));
          res.send(newsArticles);
        })

        .catch((error) => {
          console.log(error);

          res.status(500).send("Error getting external data" + error);
        });
    }
  });
};

module.exports = News;
