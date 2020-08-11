const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", "templates/views");
hbs.registerPartials("templates/partials");

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Views
app.get("", (req, res, next) => {
  res.render("index", {
    title: "Weather",
    name: "David Membrives",
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About me",
    name: "David Membrives",
  });
});

app.get("/help", (req, res, next) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "David Membrives",
  });
});

app.get("/weather", (req, res, next) => {
  const { address } = req.query;
  if (!address) {
    return res.json({
      error: "No address provided",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log("Error: " + error);
    }
    forecast(
      latitude,
      longitude,
      (error, forecastData)  => {
        return res.send({
          forecast: forecastData,
          location: location,
          address: address,
        });
      }
    );
  });
});

app.get("/products", (req, res, next) => {
  const { search, rating } = req.query;
  if (!search) {
    return res.send({
      products: [
        {
          error: "You must provide a search term",
        },
      ],
    });
  }
  console.log(search);
  return res.send({
    products: [],
  });
});

app.get("/help/*", (req, res, next) => {
  res.render("404", {
    title: "Error",
    error: "Help article not found",
    name: "David Membrives",
  });
});

app.get("*", (req, res, next) => {
  res.render("404", {
    title: "Error",
    error: "Page not found",
    name: "David Membrives",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
