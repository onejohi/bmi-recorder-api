const { Types, Schema, model } = require('mongoose');

const visitSchema = new Schema({
  patient: {
    type: Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bodyMassIndex: {
    type: Number,
    required: true,
  },
  patientForm: {
    type: Types.ObjectId,
    ref: 'PatientForm'
  },
}, {
  collection: 'visits',
  timestamps: true,
});

module.exports = model('Visit', visitSchema);