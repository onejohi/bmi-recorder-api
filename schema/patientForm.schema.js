const { Types, Schema, model } = require('mongoose');

const patientFormSchema = new Schema({
  formType: {
    type: String,
    enum: ['underweight', 'overweight', 'normal'],
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: { type: String },
      options: [],
      answer: { type: String },
    }
  ],
  comments: {
    type: String,
    required: false,
  },
}, {
  collection: 'patientForms',
  timestamps: true,
});

module.exports = model('PatientForm', patientFormSchema);