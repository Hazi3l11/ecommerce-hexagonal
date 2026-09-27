const jwt = require('jsonwebtoken');

class AutenticarUsuario {
  constructor(usuarioRepository, passwordHasher) {
    this.usuarioRepository = usuarioRepository;
    this.passwordHasher = passwordHasher;
  }

  async ejecutar({ email, password }) {
    const usuario = await this.usuarioRepository.obtenerPorEmail(email);
    if (!usuario) throw new Error('Credenciales inválidas');

    const esValido = await this.passwordHasher.comparar(password, usuario.passwordHash);
    if (!esValido) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return { token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } };
  }
}

module.exports = AutenticarUsuario;
