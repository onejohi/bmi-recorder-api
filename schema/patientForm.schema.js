const { Types, Schema, model } = require('mongoose');

const patientFormSchema = new Schema({
  formType: {
    type: String,
    enum: ['underweight', 'overweight', 'normal'],
    required: true,
    unique: true,
  },
  questions: [
    {
      question: { type: String },
      options: [],
    }
  ],
}, {
  collection: 'patientForms',
  timestamps: true,
});

module.exports = model('PatientForm', patientFormSchema);