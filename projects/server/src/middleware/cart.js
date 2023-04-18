const { db, dbQuery } = require("../config/db");

module.exports = {
  differentStoreAddToCart: async (req, res, next) => {
    const { branch_name } = req.body;
    const checkStore = await dbQuery(
      `SELECT b.name AS branch_name FROM cart_item c JOIN product p ON c.product_id = p.id JOIN branch b ON p.branch_id = b.id WHERE c.cart_id=${req.decript.cart_id} AND c.is_delete=0`
    );
    if (checkStore.length) {
      if (checkStore[0].branch_name !== branch_name) {
        return res
          .status(202)
          .send("Different store, waiting for cart delete confirmation");
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
