const database = require("../db/database.js");

const bookings = {
    getAllBookings: async function getAllBookings() {
        let db;

        try {
            db = await database.openDb();

            const query = "SELECT b.startDate, b.hours, b.postId, u.email FROM bookings b INNER JOIN users u ON u.ROWID = b.userId";
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

            const query = "SELECT b.startDate, b.hours, b.postId, u.email FROM bookings b INNER JOIN users u ON u.ROWID = b.userId WHERE postId = ?";
            const rows = await db.all(query, postId);

            return rows;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "/bookings/:post_id",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    },
    getBookingsByUsername: async function getBookingsByUsername(userId) {
        let db;

        try {
            db = await database.openDb();

            const query = "SELECT b.startDate, b.hours, b.postId, u.email FROM bookings b INNER JOIN users u ON u.ROWID = b.userId WHERE b.userId = ?";
            const rows = await db.all(query, userId);

            return rows;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "/bookings/:username",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    },

    addBooking: async function addBooking(body) {
        let db;

        try {
            db = await database.openDb();

            const query = "INSERT INTO bookings (startDate, hours, userId, postId) VALUES (?, ?, ?, ?)";
            const result = await db.run(
              query,
              body.start,
              body.hours,
              body.userId,
              body.post,
            );

            return result.lastID;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "POST /bookings",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    },

    getBookingByID: async function getBookingByID(id) {
        let db;

        try {
            db = await database.openDb();
            const result = await db.get('SELECT * FROM bookings WHERE ROWID = ?', id);

            return result;
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "POST /bookings",
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
