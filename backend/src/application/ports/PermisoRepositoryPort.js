class PermisoRepositoryPort {
  async otorgar(usuarioId, modulo) { throw new Error('No implementado'); }
  async revocar(usuarioId, modulo) { throw new Error('No implementado'); }
  async listarPorUsuario(usuarioId) { throw new Error('No implementado'); }
  async tieneAcceso(usuarioId, modulo) { throw new Error('No implementado'); }
}
module.exports = PermisoRepositoryPort;
