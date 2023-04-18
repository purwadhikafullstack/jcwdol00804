const route = require("express").Router();
const { citiesDataController } = require("../controllers");

route.get("/cities-data", citiesDataController.addCitiesData);
route.get("/get-province", citiesDataController.getProvince);
route.post("/get-cities", citiesDataController.getCities);

module.exports = route;