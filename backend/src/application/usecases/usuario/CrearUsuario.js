const { v4: uuidv4 } = require('uuid');
const Usuario = require('../../../domain/Usuario');

class CrearUsuario {
  constructor(usuarioRepository, passwordHasher) {
    this.usuarioRepository = usuarioRepository;
    this.passwordHasher = passwordHasher;
  }

  async ejecutar({ nombre, email, password, rol }) {
    Usuario.validarPassword(password);

    const existente = await this.usuarioRepository.obtenerPorEmail(email);
    if (existente) throw new Error('El email ya está registrado');

    const passwordHash = await this.passwordHasher.hash(password);

    const usuario = new Usuario({
      id: uuidv4(),
      nombre,
      email,
      passwordHash,
      rol,
    });

    return this.usuarioRepository.crear(usuario);
  }
}

module.exports = CrearUsuario;
