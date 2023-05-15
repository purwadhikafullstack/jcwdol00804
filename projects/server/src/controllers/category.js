const { db, dbQuery } = require("../config/db");

module.exports = {
    // Get categories
    getCategories: async (req, res) => {
        try {
            const { branch_id } = req.decript;
            db.query(`SELECT * FROM category 
                WHERE branch_id=${branch_id}
                ORDER BY is_delete ASC`,
                (error, results) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            message: error,
                        });
                    };
                    return res.status(200).send({
                        success: true,
                        data: results,
                    });
                }
            );
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Add new category
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const { branch_id } = req.decript;
            const checkName = await dbQuery(
                `Select name from category 
                WHERE name=${db.escape(name)}
                AND branch_id=${db.escape(branch_id)};`
            );
            if (checkName.length) {
                return res.status(409).send({
                    success: false,
                    message: "Category name is already exist",
                });
            } else {
                db.query(
                    "INSERT INTO category SET ?", { name, branch_id },
                    (error, results, fields) => {
                        if (error) {
                            return res.status(500).send({
                                success: false,
                                message:
                                    "Failed add category"
                            });
                        };
                        return res.status(200).send({
                            success: true,
                            message:
                                `${name} has been added`
                        });
                    }
                );
            };
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Edit category name
    editCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const { id } = req.params;
            const { branch_id } = req.decript;
            const checkName = await dbQuery(
                `Select name from category WHERE name=${db.escape(name)} 
                AND branch_id=${db.escape(branch_id)};`
            );
            if (name === "") {
                return res.status(500).send({
                    success: false,
                    message: "Please insert a new category name"
                });
            };
            if (checkName.length) {
                return res.status(409).send({
                    success: false,
                    message: "Category name is already exist",
                });
            } else {
                db.query(`UPDATE category SET ? WHERE id=${id}`, { name },
                    (error, results, fields) => {
                        if (error) {
                            return res.status(500).send({
                                success: false,
                                message:
                                    "Please insert the new name"
                            });
                        }
                        return res.status(200).send({
                            success: true,
                            message:
                                `Name changed into "${name}"`
                        });
                    }
                );
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    // Delete category
    deleteCategory: async (req, res) => {
        const { id } = req.params;
        db.query(`UPDATE category SET is_delete=1 WHERE id= ?`, [id],
            (error, results) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message:
                            "Error delete category"
                    });
                }
                return res.status(200).send({
                    success: true,
                    message:
                        `Category deleted`
                });
            });
    },
    // Restore category
    restoreCategory: async (req, res) => {
        const { id } = req.params;
        db.query(`UPDATE category SET is_delete=0 WHERE id= ?`, [id],
            (error, results) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message:
                            "Error restore category"
                    });
                }
                return res.status(200).send({
                    success: true,
                    message:
                        `Category restored`
                });
            });
    },
    // Category detail
    getCategoryDetail: async (req, res) => {
        try {
            const { id } = req.params;
            db.query(`SELECT * FROM category WHERE id= ?`, [id],
                (error, results) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            message: error,
                        });
                    };
                    return res.status(200).send(results);
                });
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    // Upload category image
    uploadCategoryImg: async (req, res) => {
        try {
            const { id } = req.params;
            db.query(`UPDATE category SET ? WHERE id=${id}`,
                { category_img: `/imgCategory/${req.files[0].filename}` },
                (error, results) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            message: error,
                        });
                    }
                    return res.status(200).send({
                        success: true,
                        message: "Success updated image",
                    });
                }
            );
        } catch (error) {
            return res.status(500).send(error)
        };
    },
    // Fetch category by Branch name
    fetchCategories: async (req, res) => {
        try {
            const { branch_name } = req.query;
            db.query(
                `SELECT c.id, c.name, c.category_img, b.name AS branch_id, c.is_delete
                FROM category c
                JOIN branch b ON c.branch_id= b.id
                WHERE c.is_delete=0 
                AND b.name='${branch_name}'
                LIMIT 5;`,
                (error, results) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            message: error,
                        });
                    }
                    return res.status(200).send({
                        success: true,
                        data: results,
                    });
                }
            );
        } catch (error) {
            return res.status(500).send(error);
        }
    },
}
