const router = require('express').Router();
const Patient = require('../schema/patient.schema');

router.get('/patient-info/:id', async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findById(id)
    .populate('visits')
    .exec();

  if (!patient) {
    return res.status(400).json({ error: 'Patient not found' });
  }

  return res.status(200).json({ ok: true, data: patient });
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender } = req.body;

  if (!firstName || !lastName || !dateOfBirth) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const findExistingUser = await Patient.findOne({ firstName, lastName });

  if (findExistingUser) {
    return res.status(400).json({ error: 'Patient already exists' });
  }

  const newPatient = new Patient({
    firstName,
    lastName,
    dateOfBirth,
    gender,
  });
  const savePatient = await newPatient.save();

  return res.status(200).json({ ok: true, data: savePatient });
});

module.exports = router;