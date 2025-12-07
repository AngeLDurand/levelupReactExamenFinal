export const CustomFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className=" mt-auto border-top">
      <div className="container py-4 text-center text-md-start">
        <div className="row gy-4">
          {/* Columna 1: Marca */}
          <div className="col-md-4 ">
            <h5 className="fw-bold">LevelUp Gamer</h5>
            <p className="small mb-0">
              Tu tienda gamer para llevar tu setup al siguiente nivel.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="col-md-4">
            <h6 className="fw-bold">Enlaces</h6>
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

          {/* Columna 3: Contacto / redes */}
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

        <hr className="border-secondary my-3" />

        <div className="d-flex justify-content-center small text-secondary">
          <span>© {year} LevelUp Gamer. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};
