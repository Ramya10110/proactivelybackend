const db = require('../models');

const fieldLocks = {}; // { formId: { fieldName: userId } }

function setupCollabSocket(server) {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    socket.on('joinForm', async ({ formId, userId }) => {
      socket.join(`form_${formId}`);
      const response = await db.Response.findOne({ where: { formId } });
      socket.emit('initForm', response ? response.values : {});
    });

    socket.on('editField', async ({ formId, fieldName, value, userId }) => {
      fieldLocks[formId] = fieldLocks[formId] || {};
      if (fieldLocks[formId][fieldName] && fieldLocks[formId][fieldName] !== userId) {
        socket.emit('lockError', { fieldName });
        return;
      }
      fieldLocks[formId][fieldName] = userId;

      // Update the DB
      const response = await db.Response.findOne({ where: { formId } });
      const values = { ...response.values, [fieldName]: value };
      await response.update({ values });

      io.to(`form_${formId}`).emit('fieldUpdated', { fieldName, value, userId });
    });

    socket.on('unlockField', ({ formId, fieldName, userId }) => {
      if (fieldLocks[formId]?.[fieldName] === userId) {
        delete fieldLocks[formId][fieldName];
        io.to(`form_${formId}`).emit('fieldUnlocked', { fieldName });
      }
    });

    socket.on('disconnect', () => {
      // Optionally clear locks for this user
    });
  });
}

module.exports = { setupCollabSocket };
