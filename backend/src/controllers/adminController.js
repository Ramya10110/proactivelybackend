const db = require('../models');
const { nanoid } = require('nanoid');

exports.createForm = async (req, res) => {
  try {
    const { name, fields } = req.body;
    if (!Array.isArray(fields) || fields.length === 0) return res.status(400).json({ message: 'Fields required' });
    const inviteCode = nanoid(8);
    const form = await db.Form.create({
      name,
      fields,
      inviteCode,
      adminId: req.user.id
    });
    // Create empty response
    await db.Response.create({ formId: form.id, values: {} });
    res.json({ form });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getForms = async (req, res) => {
  const forms = await db.Form.findAll({ where: { adminId: req.user.id } });
  res.json({ forms });
};
