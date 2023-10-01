const { Types, Schema, model } = require('mongoose');

const patientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  visits: {
    type: Types.ObjectId,
    ref: 'Visit'
  }
}, {
  collection: 'patients',
  timestamps: true,
});

module.exports = model('Patient', patientSchema);