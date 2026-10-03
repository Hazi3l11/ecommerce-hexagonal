function escapeHtml(valor = '') {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatoMoneda(valor) {
  return Number(valor).toFixed(2);
}

function generarFilas(items) {
  return items.map((item) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee;">
        ${escapeHtml(item.nombre)}
      </td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
        ${item.cantidad}
      </td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
        $${formatoMoneda(item.precioUnitario)}
      </td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
        $${formatoMoneda(item.cantidad * item.precioUnitario)}
      </td>
    </tr>
  `).join('');
}

function plantillaComprobante({ usuario, pedido, items, total }) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;color:#1e293b;">
        <div style="max-width:700px;margin:auto;">
          <h1 style="color:#6d28d9;">
            Confirmación de pedido
          </h1>

          <p>Hola <strong>${escapeHtml(usuario.nombre)}</strong>,</p>

          <p>
            Hemos registrado correctamente tu pedido.
          </p>

          <p>
            <strong>Pedido:</strong> ${escapeHtml(pedido.id)}<br>
            <strong>Estado:</strong> Pendiente de Pago
          </p>

          <h2>Detalle de compra</h2>

          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f8fafc;">
                <th style="padding:10px;text-align:left;">Producto</th>
                <th style="padding:10px;">Cantidad</th>
                <th style="padding:10px;text-align:right;">Precio</th>
                <th style="padding:10px;text-align:right;">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              ${generarFilas(items)}
            </tbody>
          </table>

          <h2 style="text-align:right;">
            Total: $${formatoMoneda(total)}
          </h2>

          <div style="
            background:#f3f1ff;
            padding:20px;
            border-radius:10px;
            margin-top:25px;
          ">
            <h2>Instrucciones de pago</h2>

            <p>
              Realiza una transferencia bancaria con los siguientes datos:
            </p>

            <p>
              <strong>Banco:</strong> ${escapeHtml(process.env.PAYMENT_BANK)}<br>
              <strong>Titular:</strong> ${escapeHtml(process.env.PAYMENT_HOLDER)}<br>
              <strong>Cuenta:</strong> ${escapeHtml(process.env.PAYMENT_ACCOUNT)}<br>
              <strong>CLABE:</strong> ${escapeHtml(process.env.PAYMENT_CLABE)}<br>
              <strong>Referencia:</strong> ${escapeHtml(process.env.PAYMENT_REFERENCE_PREFIX)}-${escapeHtml(pedido.id.slice(0, 8))}
            </p>

            <p>
              Una vez realizado el pago, conserva tu comprobante.
            </p>
          </div>

          <p style="margin-top:30px;color:#64748b;">
            Este correo fue generado automáticamente por el sistema de Ecommerce.
          </p>
        </div>
      </body>
    </html>
  `;
}

function plantillaAdministrador({ usuario, pedido, items, total }) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;color:#1e293b;">
        <div style="max-width:700px;margin:auto;">
          <h1 style="color:#6d28d9;">
            Nuevo pedido recibido
          </h1>

          <p>
            Se ha registrado un nuevo pedido en el sistema.
          </p>

          <p>
            <strong>ID:</strong> ${escapeHtml(pedido.id)}<br>
            <strong>Cliente:</strong> ${escapeHtml(usuario.nombre)}<br>
            <strong>Email:</strong> ${escapeHtml(usuario.email)}<br>
            <strong>Estado:</strong> Pendiente de Pago
          </p>

          <h2>Productos</h2>

          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f8fafc;">
                <th style="padding:10px;text-align:left;">Producto</th>
                <th style="padding:10px;">Cantidad</th>
                <th style="padding:10px;text-align:right;">Precio</th>
              </tr>
            </thead>

            <tbody>
              ${items.map((item) => `
                <tr>
                  <td style="padding:10px;border-bottom:1px solid #eee;">
                    ${escapeHtml(item.nombre)}
                  </td>
                  <td style="padding:10px;text-align:center;border-bottom:1px solid #eee;">
                    ${item.cantidad}
                  </td>
                  <td style="padding:10px;text-align:right;border-bottom:1px solid #eee;">
                    $${formatoMoneda(item.cantidad * item.precioUnitario)}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2 style="text-align:right;">
            Total: $${formatoMoneda(total)}
          </h2>
        </div>
      </body>
    </html>
  `;
}

module.exports = {
  plantillaComprobante,
  plantillaAdministrador,
};