const router = require('express').Router();

router.get('/patient-info/:id', (req, res) => res.json({ ok: true }));

router.post('/register', (req, res) => res.json({ ok: true }));

module.exports = router;