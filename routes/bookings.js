const express = require('express');
const router = express.Router();

const bookingsModel = require('../models/bookings.js');

router.get('/', async (req, res) => {
    const bookings = await bookingsModel.getAllBookings();

    if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
        return res.json(bookings);
    }

    return res.json({ data: bookings });
});

router.post("/", async (req, res) => {
    const orderId = await bookingsModel.addBooking(req.body);

    if (Object.prototype.hasOwnProperty.call(orderId, 'errors')) {
        return res.json(orderId);
    }

    const bookings = await bookingsModel.getBookingByID(orderId);

    if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
        return res.json(bookings);
    }

    return res.json({ data: bookings });
});

router.get("/:booking_id", async (req, res) => {
    const bookings = await bookingsModel.getBookingByID(req.params.booking_id);

    if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
        return res.json(bookings);
    }

    return res.json({ data: bookings });
});

router.get('/post/:post_id', async (req, res) => {
    const bookings = await bookingsModel.getBookingsByPost(req.params.post_id);

    if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
        return res.json(bookings);
    }

    return res.json({ data: bookings });
});

router.get('/user/:username', async (req, res) => {
    const bookings = await bookingsModel.getBookingsByUsername(req.params.username);

    if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
        return res.json(bookings);
    }

    return res.json({ data: bookings });
});

module.exports = router;
