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

router.get('/:post_id', async (req, res) => {
    const bookings = await bookingsModel.getBookingsByPost(req.params.post_id);

    if (Object.prototype.hasOwnProperty.call(bookings, 'errors')) {
        return res.json(bookings);
    }

    return res.json({ data: bookings });
});

module.exports = router;
