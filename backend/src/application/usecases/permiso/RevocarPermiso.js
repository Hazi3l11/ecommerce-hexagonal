class RevocarPermiso {
  constructor(permisoRepository) {
    this.permisoRepository = permisoRepository;
  }
  async ejecutar({ usuarioId, modulo }) {
    return this.permisoRepository.revocar(usuarioId, modulo);
  }
}
module.exports = RevocarPermiso;
