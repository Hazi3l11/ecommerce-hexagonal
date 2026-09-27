class PasswordHasherPort {
  async hash(passwordPlano) { throw new Error('No implementado'); }
  async comparar(passwordPlano, hash) { throw new Error('No implementado'); }
}
module.exports = PasswordHasherPort;
