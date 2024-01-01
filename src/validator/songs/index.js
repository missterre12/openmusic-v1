const InvariantError = require('../../exceptions/InvariantError');
const { SongPayloadSchema } = require('./schema');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    return validationResult;
  },
};

module.exports = SongsValidator;