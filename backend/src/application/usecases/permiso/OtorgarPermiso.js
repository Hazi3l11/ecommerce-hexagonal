class OtorgarPermiso {
  constructor(permisoRepository) {
    this.permisoRepository = permisoRepository;
  }
  async ejecutar({ usuarioId, modulo }) {
    const modulosValidos = ['productos', 'pedidos'];
    if (!modulosValidos.includes(modulo)) {
      throw new Error(`Módulo inválido. Usa uno de: ${modulosValidos.join(', ')}`);
    }
    return this.permisoRepository.otorgar(usuarioId, modulo);
  }
}
module.exports = OtorgarPermiso;
