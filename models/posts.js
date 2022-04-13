const database = require("../db/database.js");

const posts = {
    getAllPosts: async function getAllPosts() {
        let db;

        try {
            db = await database.openDb();

            const query = "SELECT *, ROWID as id FROM posts";
            const rows = await db.all(query);

            return rows;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "/posts",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    }
};

module.exports = posts;
