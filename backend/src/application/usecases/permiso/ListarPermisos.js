class ListarPermisos {
  constructor(permisoRepository) {
    this.permisoRepository = permisoRepository;
  }
  async ejecutar(usuarioId) {
    return this.permisoRepository.listarPorUsuario(usuarioId);
  }
}
module.exports = ListarPermisos;
