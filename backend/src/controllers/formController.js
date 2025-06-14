const db = require('../models');

exports.joinForm = async (req, res) => {
  const { inviteCode } = req.body;
  const form = await db.Form.findOne({ where: { inviteCode } });
  if (!form) return res.status(404).json({ message: 'Form not found' });
  res.json({ form });
};

exports.getFormResponse = async (req, res) => {
  const { formId } = req.params;
  const response = await db.Response.findOne({ where: { formId } });
  if (!response) return res.status(404).json({ message: 'Response not found' });
  res.json({ response });
};
