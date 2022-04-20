const express = require('express');
const router = express.Router();

const bookingsModel = require('../models/bookings.js');
const authModel = require('../models/auth.js');

async function doCheckToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const result = await authModel.checkToken(token);

    if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
        return res.status(result.errors.status).json(result);
    }

    return next();
}

router.get('/',
    async (req, res, next) => await doCheckToken(req, res, next),
    async (req, res) => {
        const bookings = await bookingsModel.getAllBookings();

        if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
            return res.json(bookings);
        }

        return res.json({ data: bookings });
    }
);

router.post("/",
    async (req, res, next) => await doCheckToken(req, res, next),
    async (req, res) => {
        const orderId = await bookingsModel.addBooking(req.body);

        if (Object.prototype.hasOwnProperty.call(orderId, 'errors')) {
            return res.json(orderId);
        }

        const bookings = await bookingsModel.getBookingByID(orderId);

        if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
            return res.json(bookings);
        }

        return res.status(201).json({ data: bookings });
    }
);

router.get("/:booking_id",
    async (req, res, next) => await doCheckToken(req, res, next),
    async (req, res) => {
        let bookings = await bookingsModel.getBookingByID(req.params.booking_id);

        if (bookings === undefined) {
            bookings = [];
        }

        if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
            return res.json(bookings);
        }

        return res.json({ data: bookings });
    }
);

router.get('/post/:post_id',
    async (req, res, next) => await doCheckToken(req, res, next),
    async (req, res) => {
        const bookings = await bookingsModel.getBookingsByPost(req.params.post_id);

        if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
            return res.json(bookings);
        }

        return res.json({ data: bookings });
    }
);

router.get('/user/:user_id',
    async (req, res, next) => await doCheckToken(req, res, next),
    async (req, res) => {
        const bookings = await bookingsModel.getBookingsByUsername(req.params.user_id);

        if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
            return res.json(bookings);
        }

        return res.json({ data: bookings });
    }
);

module.exports = router;
