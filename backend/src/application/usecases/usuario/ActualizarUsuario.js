class ActualizarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  async ejecutar(id, datos) {
    return this.usuarioRepository.actualizar(id, datos);
  }
}
module.exports = ActualizarUsuario;
