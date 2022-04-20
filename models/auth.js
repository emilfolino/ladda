const database = require("../db/database.js");
const bcrypt = require('bcrypt');
const jwt = require("jwt-promisify");

const auth = {
    login: async function login(email, password) {
        let db;

        try {
            db = await database.openDb();

            const query = "SELECT *, ROWID as id FROM users WHERE email = ?";
            const user = await db.get(query, email);

            if (user === undefined) {
                return {
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "User not found",
                        detail: "User with provided email not found."
                    }
                };
            }

            try {
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    const payload = {
                        email: user.email,
                        userId: user.id,
                    };
                    const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

                    return {
                        data: {
                            type: "success",
                            message: "User logged in",
                            user: payload,
                            token: jwtToken
                        }
                    };
                }

                return {
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "Wrong password",
                        detail: "Password is incorrect."
                    }
                };
            } catch (e) {
                return {
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: e.message,
                    }
                }
            }
        } catch (error) {
            return {
                errors: {
                    status: 500,
                    path: "/login",
                    title: error.message,
                    description: error.message,
                }
            };
        } finally {
            await db.close();
        }
    },

    register: async function register(email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            let db;

            try {
                db = await database.openDb();
                const query = "INSERT INTO users (email, password) VALUES (?, ?)";

                const result = await db.run(query, email, hashedPassword);

                return {
                    message: "User successfully registered.",
                };
            } catch (e) {
                return {
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "Database error",
                        detail: e.message
                    }
                };
            } finally {
                await db.close();
            }
        } catch (e) {
            return {
                errors: {
                    status: 500,
                    source: "/register",
                    title: "bcrypt error",
                    detail: e.message,
                }
            };
        }
    },

    checkToken: async function checkToken(token) {
        if (token) {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);

                return {
                    data: "Token verified.",
                    ...decoded,
                };
            } catch (e) {
                return {
                    errors: {
                        status: 500,
                        source: "",
                        title: "Failed authentication",
                        detail: err.message
                    }
                };
            }
        }

        return {
            errors: {
                status: 401,
                source: "",
                title: "No token",
                detail: "No token provided in request headers"
            }
        };
    }
};

module.exports = auth;
