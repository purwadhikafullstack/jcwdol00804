const request = require("request");
const { db, dbQuery } = require("../config/db");
const { geocode } = require("opencage-api-client");
const e = require("express");

module.exports = {
  // Get Address
  getAddress: async (req, res) => {
    try {
      db.query(
        `SELECT * from address 
                WHERE user_id=${db.escape(req.decript.id)}
                AND is_delete=0
                ORDER BY is_main DESC`,
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
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // Add Address
  addAddress: async (req, res) => {
    try {
      const { address, city, province, zipcode } = req.body;
      if (province === "") {
        return res.status(406).send({
          success: false,
          message: "Please select province"
        });
      };
      if (city === "" || city === "Select City") {
        return res.status(406).send({
          success: false,
          message: "Please select city"
        });
      };
      if (address === "" || zipcode === "") {
        return res.status(406).send({
          success: false,
          message: "Please fill the empty field"
        });
      };
      const geoResults = await geocode({
        q: `${address}, ${city}, ${province}`,
        countrycode: "id",
        key: process.env.OPENCAGE_KEY,
      });
      const { lat, lng } = geoResults.results[0].geometry;
      db.query(
        `INSERT INTO address
                (address, city, province, zipcode, user_id, lat, lng)
                VALUES (
                ${db.escape(address)},
                ${db.escape(city)},
                ${db.escape(province)},
                ${db.escape(zipcode)},
                ${db.escape(req.decript.id)},
                ${lat},
                ${lng});`,
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send({
            success: true,
            message: "Success add address",
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // Delete Address (soft delete)
  deleteAddress: async (req, res) => {
    try {
      const addressId = req.params.id;
      db.query(
        "UPDATE address SET is_delete=1 WHERE id= ?",
        [addressId],
        (error, results) => {
          if (error) {
            res.status(500).send({
              success: false,
              message: `Delete address failed,
              please contact administrator`,
            });
          }
          return res.status(200).send({
            success: true,
            message: "Success delete address",
            data: results,
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // Set Main Address
  setMain: (req, res) => {
    try {
      const addressId = req.params.id;
      const userId = req.decript.id;
      db.query(
        `UPDATE address SET is_main = CASE
              WHEN id = ${addressId} 
              THEN 1
              ELSE 0
              END
              WHERE user_id = ${userId}`,
        (error, results) => {
          if (error) {
            res.status(500).send(error);
          }
          return res.status(200).send({
            success: true,
            message: "Success updated your main address",
            data: results,
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAvailableCourier: async (req, res) => {
    try {
      const { origin, destination, weight } = req.query;
      const getCourier = (courier) => {
        return new Promise(async (resolve, reject) => {
          try {
            const originCity = await dbQuery(
              `SELECT id from cities_data WHERE name=${db.escape(origin)}`
            );
            const destinationCity = await dbQuery(
              `SELECT id from cities_data WHERE name=${db.escape(destination)}`
            );
            let options = {
              method: "POST",
              url: "https://api.rajaongkir.com/starter/cost",
              headers: { key: process.env.RAJAONGKIR_KEY },
              form: {
                origin: String(originCity[0].id),
                destination: String(destinationCity[0].id),
                weight: Number(weight),
                courier,
              },
            };
            request(options, (err, response, body) => {
              if (err) throw new Error(err);
              const data = JSON.parse(body).rajaongkir.results[0];
              resolve(data);
            });
          } catch (error) {
            reject(error);
          }
        });
      };
      let courier = ["jne", "pos", "tiki"];
      Promise.all(
        courier.map(async (val) => {
          const data = await getCourier(val);
          return data;
        })
      ).then((results) => {
        return res.status(200).send(results);
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getDetailAddress: (req, res) => {
    try {
      const { id } = req.params;
      db.query(`SELECT * FROM address WHERE id=${db.escape(id)}`,
        (error, results) => {
          if (error) {
            res.status(500).send(error);
          };
          return res.status(200).send(results);
        });
    } catch (error) {
      return res.status(500).send(error);
    };
  },
  editDetailAddress: (req, res) => {
    try {
      const { id } = req.params;
      const { address, province, city, zipcode } = req.body;
      if (province === "") {
        return res.status(406).send({
          success: false,
          message: "Please select province"
        });
      };
      if (city === "" || city === "Select City") {
        return res.status(406).send({
          success: false,
          message: "Please select city"
        });
      };
      if (address === "" || zipcode === "") {
        return res.status(406).send({
          success: false,
          message: "Please fill the empty field"
        });
      };
      db.query(`UPDATE address SET ? WHERE id=${db.escape(id)}`,
        { address, province, city, zipcode },
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send({
            success: true,
            message: "Success updated your address",
          });
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};
