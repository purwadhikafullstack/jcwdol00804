const { db, dbQuery } = require("../config/db");
const request = require("request");

module.exports = {
  // Get Data From API Raja Ongkir
  addCitiesData: async (req, res) => {
    try {
      var options = {
        method: "GET",
        url: "https://api.rajaongkir.com/starter/city",
        headers: { key: process.env.RAJAONGKIR_KEY },
      };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const data = JSON.parse(body).rajaongkir.results;
        const dataMap = data.map((value) => {
          return {
            name: value.type + " " + value.city_name,
            province: value.province,
          };
        });
        db.query(
          `INSERT INTO cities_data (name, province) VALUES ?`,
          [dataMap.map((value) => [value.name, value.province])],
          (error, results) => {
            if (error) {
              return res.status(500).send({
                success: false,
                message: error,
              });
            } else {
              return res.status(200).send(results);
            }
          }
        );
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // GET Province
  getProvince: async (req, res) => {
    try {
      db.query(
        `SELECT province FROM cities_data 
                GROUP BY province 
                ORDER BY province ASC;`,
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send(results);
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // GET City
  getCities: async (req, res) => {
    try {
      const { province } = req.body;
      db.query(
        `SELECT name FROM cities_data 
                WHERE province=${db.escape(province)};`,
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send(results);
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
