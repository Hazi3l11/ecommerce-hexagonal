class Usuario {
  constructor({ id, nombre, email, passwordHash, rol = 'usuario', creadoEn }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.passwordHash = passwordHash;
    this.rol = rol;
    this.creadoEn = creadoEn;
  }

  static validarPassword(passwordPlano) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(passwordPlano)) {
      throw new Error(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número'
      );
    }
    return true;
  }
}

module.exports = Usuario;
