<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impresiones Cary</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <main>
    <header>
      <h1>Impresiones Cary</h1>
      <br>
      <p>Su lugar de confianza para impresiones de calidad.</p>
    </header>
    <article>
      <h2>Seleccione sus fotos</h2>
      <form method="post" enctype="multipart/form-data">
        <div>
          <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
          <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple />
        </div>
        <div class="preview">
          <p>No files currently selected for upload</p>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <div class="precios-class">
        <h4>Precios de impresión</h4>
        <ul>
          <li>
            <p>Impresión en blanco y negro:</p> <span>20 CUP por impresión</span>
          </li>
          <li>
            <p>Impresión a color:</p> <span>30 CUP por impresión</span>
          </li>
        </ul>
      </div>
    </article>
    <aside>
      <h3>Horario de atención</h3>
      <ul>
        <li>
          <p>Lunes - Viernes</p>
          <span>7:00 AM - 6:00 PM</span>
        </li>
        <li>
          <p>Sábado - Domingo</p>
          <span>7:00 AM - 6:00 PM</span>
        </li>
      </ul>
      <br>
      <h3>Métodos de Contacto</h3>
      <ul>
        <li>
          <p>Correo: </p>
          <a href="mailto:bryanlenier@gmail.com">bryanlenier@gmail.com</a>
          <button type="button" onclick="location.href='mailto:bryanlenier@gmail.com'">Ir</button>
        </li>
        <li>
          <p> WhatsApp: </p>
          <a href="https://wa.me/5358505864">+53 58505864</a>
          <button type="button" onclick="location.href=`https://wa.me/5358505864`">Ir</button>
        </li>
        <li>
          <p>Telegram:</p>
          <a href="https://t.me/Hacedor03">@Hacedor03</a>
          <button type="button" onclick="location.href=`https://t.me/Hacedor03`">Ir</button>
        </li>
      </ul>
      <br>
      
      <h3>Pago en Linea</h3>
      <ul>
        <li>
            <p>Número de Tarjeta:</p>
            <span id="tarjeta">1234-4567-7890</span>
            <button type="button" onclick="copyToClipboard('tarjeta')">Copiar</button>
        </li>
        <li>
            <p>En zona:</p>
            <span id="enZona">@Hacedor</span>
            <button type="button" onclick="copyToClipboard('enZona')">Copiar</button>
        </li>
    </ul>
      
    </aside>
    <footer>
      <p>&copy; 2024 Impresiones Cary. Todos los derechos reservados.</p>
    </footer>
  </main>
  <script src="index.js" defer></script>
</body>

</html>