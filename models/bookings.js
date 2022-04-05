const database = require("../db/database.js");

const bookings = {
    getAllBookings: async function getAllBookings() {
        let db;

        try {
            db = await database.openDb();

            const query = "SELECT * FROM bookings";
            const rows = await db.all(query);

            return rows;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "/bookings",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    },
    getBookingsByPost: async function getBookingsByPost(postId) {
        let db;

        try {
            db = await database.openDb();

            const query = "SELECT * FROM bookings WHERE postId = ?";
            const rows = await db.all(query, postId);

            return rows;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "/bookings",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    }
};

module.exports = bookings;
