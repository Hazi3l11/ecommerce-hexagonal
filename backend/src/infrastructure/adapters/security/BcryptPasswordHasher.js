const bcrypt = require('bcrypt');
const PasswordHasherPort = require('../../../application/ports/PasswordHasherPort');

class BcryptPasswordHasher extends PasswordHasherPort {
  async hash(passwordPlano) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(passwordPlano, salt);
  }

  async comparar(passwordPlano, hash) {
    return bcrypt.compare(passwordPlano, hash);
  }
}

module.exports = BcryptPasswordHasher;
