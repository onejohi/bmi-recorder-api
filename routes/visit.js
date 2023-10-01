const router = require('express').Router();

router.get('/all', (req, res) => res.json({ ok: true }));

router.post('/update-vitals', (req, res) => res.json({ ok: true }));

module.exports = router;