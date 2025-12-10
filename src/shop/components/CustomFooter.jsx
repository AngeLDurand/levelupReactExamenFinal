// Componente encargado de mostrar el pie de página de la tienda.

//Tiene tres columnas: información de la marca, enlaces rápidos, y datos de contacto.

//Bootstrap se encarga de que el diseño sea responsivo y se adapte a móvil y escritorio usando clases como d-flex, justify-content-center justify-content-md-start
export const CustomFooter = () => {
  // Calculamos el año actual para mantener el copyright actualizado.
  const year = new Date().getFullYear();

  return (
    // "mt-auto" empuja el footer al final de la pantalla si hay poco contenido.
    <footer className=" mt-auto border-top">
      <div className="container py-4 text-center text-md-start">
        <div className="row gy-4">
          {/* ----------------------------
              Columna 1: Marca / Descripción
             ---------------------------- */}
          <div className="col-md-4 ">
            <h5 className="fw-bold">LevelUp Gamer</h5>
            <p className="small mb-0">
              Tu tienda gamer para llevar tu setup al siguiente nivel.
            </p>
          </div>

          {/* ----------------------------
              Columna 2: Enlaces rápidos
              (simples botones informativos)
             ---------------------------- */}
          <div className="col-md-4">
            <h6 className="fw-bold">Enlaces</h6>
            {/* Lista horizontal en móviles, vertical en escritorio */}
            <ul className="list-unstyled small mb-0 d-flex gap-2 justify-content-center justify-content-md-start">
              <li>
                <a href="#" className="link-dark text-decoration-none">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="link-dark text-decoration-none">
                  Notebooks
                </a>
              </li>
              <li>
                <a href="#" className="link-dark text-decoration-none">
                  Consolas
                </a>
              </li>
              <li>
                <a href="#" className="link-dark text-decoration-none">
                  Sillas
                </a>
              </li>
            </ul>
          </div>

          {/* ----------------------------
              Columna 3: Información de contacto
              + íconos de redes sociales simulados con badges
             ---------------------------- */}
          <div className="col-md-4">
            <h6 className="fw-bold">Contacto</h6>
            <p className="small mb-1">Email: contacto@levelupgamer.com</p>
            <p className="small mb-2">WhatsApp: +569 21212121</p>
            <div className="d-flex gap-2 small justify-content-center justify-content-md-start">
              <span className="badge text-bg-light">Instagram</span>
              <span className="badge text-bg-light">Facebook</span>
              <span className="badge text-bg-light">Twitch</span>
            </div>
          </div>
        </div>

        {/* Línea divisoria entre contenido y copyright */}
        <hr className="border-secondary my-3" />

        {/* Sección inferior con el año dinámico */}
        <div className="d-flex justify-content-center small text-secondary">
          <span>© {year} LevelUp Gamer. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};
