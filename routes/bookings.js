const express = require('express');
const router = express.Router();

const bookingsModel = require('../models/bookings.js');

router.get('/', async (req, res) => {
    const bookings = await bookingsModel.getAllBookings();

    return res.json({ data: bookings });
});

module.exports = router;
