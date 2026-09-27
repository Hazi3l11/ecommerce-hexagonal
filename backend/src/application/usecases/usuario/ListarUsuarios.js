class ListarUsuarios {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  async ejecutar() {
    return this.usuarioRepository.listar();
  }
}
module.exports = ListarUsuarios;
