class EliminarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  async ejecutar(id) {
    return this.usuarioRepository.eliminar(id);
  }
}
module.exports = EliminarUsuario;
