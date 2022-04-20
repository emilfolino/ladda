const express = require('express');
const router = express.Router();

const authModel = require('../models/auth.js');

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/login",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    const result = await authModel.login(email, password);

    if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
        return res.status(result.errors.status).json(result);
    }

    return res.json({ data: result });
});

router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/login",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    const result = await authModel.register(email, password);

    if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
        return res.status(result.errors.status).json(result);
    }

    return res.json({ data: result });
});

module.exports = router;
