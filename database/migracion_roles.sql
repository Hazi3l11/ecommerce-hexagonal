-- Renombrar el rol por defecto de 'cliente' a 'usuario'
ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS usuarios_rol_check;
ALTER TABLE usuarios ADD CONSTRAINT usuarios_rol_check CHECK (rol IN ('usuario', 'admin'));
ALTER TABLE usuarios ALTER COLUMN rol SET DEFAULT 'usuario';
UPDATE usuarios SET rol = 'usuario' WHERE rol = 'cliente';

-- Tabla de permisos: qué usuario tiene acceso a qué módulo
CREATE TABLE IF NOT EXISTS permisos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    modulo VARCHAR(20) NOT NULL CHECK (modulo IN ('productos', 'pedidos')),
    creado_en TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (usuario_id, modulo)
);
