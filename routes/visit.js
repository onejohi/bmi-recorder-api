const router = require('express').Router();
const { Types } = require('mongoose');
const Visit = require('../schema/visit.schema');
const PatientForm = require('../schema/patientForm.schema');

router.get('/all', async (req, res) => {
  const visits = await Visit.find().populate('patient').exec();

  return res.status(200).json({ ok: true, data: visits });
});

router.get('/vitals-form/:type', async (req, res) => {
  const patientForm = await PatientForm.findOne({ formType: req.params.type }).exec();

  return res.status(200).json({ ok: true, data: patientForm })
})

router.post('/update-vitals', async (req, res) => {
  const { patientId, date, height, weight, bodyMassIndex } = req.body;

  if (!patientId) {
    return res.status(400).json({ error: 'Patient does not exist' });
  }

  if (bodyMassIndex > 0 && bodyMassIndex <= 18) {
    const form = await PatientForm.findOne({ formType: 'underweight'}).exec();
    const newVisitation = new Visit({
      patient: new Types.ObjectId(patientId),
      date,
      height,
      weight,
      bodyMassIndex,
      patientForm: form._id,
    });
    const savedVisit = await newVisitation.save();
    return res.status(200).json({ ok: true, data: savedVisit });
  }

  if (bodyMassIndex > 18 && bodyMassIndex <= 25) {
    const form = await PatientForm.findOne({ formType: 'normal'}).exec();
    const newVisitation = new Visit({
      patient: new Types.ObjectId(patientId),
      date,
      height,
      weight,
      bodyMassIndex,
      patientForm: form._id,
    });
    const savedVisit = await newVisitation.save();
    return res.status(200).json({ ok: true, data: savedVisit });
  }

  if (bodyMassIndex > 25) {
    const form = await PatientForm.findOne({ formType: 'overweight'}).exec();
    const newVisitation = new Visit({
      patient: new Types.ObjectId(patientId),
      date,
      height,
      weight,
      bodyMassIndex,
      patientForm: form._id,
    });
    const savedVisit = await newVisitation.save();
    return res.status(200).json({ ok: true, data: savedVisit });
  }
});

router.post('/fill-form/:formId', async (req, res) => {
  const { formId } = req.params;
  const { questions } = req.body;

  if (!formId) {
    return res.status(400).json({ error: 'Form does not exist' });
  }

  // find visit by ID and update questions
  const visit = await Visit.findById(formId).exec();
  visit.questions = questions;
  const savedVisit = await visit.save();

  return res.status(200).json({ ok: true, data: savedVisit });
});

module.exports = router;