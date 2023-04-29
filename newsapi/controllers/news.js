const users = require("../Users.json");
const { default: axios } = require("axios");

const News = (req, res) => {
  const apikey = process.env.APIKEY;
  const { email, message } = req.body;
  if (!email) {
    return res.status(400).send({ message: message });
  }
  const user = users.find((user) => user.email === email);
  const preference = user.preference;
  const apiRequests = preference.map((pref) =>
    axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${pref}&lang=en&country=IND&max=5&apikey=${apikey}`
    )
  );

  Promise.all(apiRequests)

    .then((responses) => {
      const newsArticles = responses.map((res) => res.data.articles);

      res.send(newsArticles);
    })

    .catch((error) => {
      console.log(error);

      res.status(500).send("Error getting external data" + error);
    });
};

module.exports = News;
