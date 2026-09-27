class UsuarioRepositoryPort {
  async crear(usuario) { throw new Error('No implementado'); }
  async obtenerPorId(id) { throw new Error('No implementado'); }
  async obtenerPorEmail(email) { throw new Error('No implementado'); }
  async listar() { throw new Error('No implementado'); }
  async actualizar(id, datos) { throw new Error('No implementado'); }
  async eliminar(id) { throw new Error('No implementado'); }
}
module.exports = UsuarioRepositoryPort;
