// Componente visual que sirve como "portada" o banner principal de la tienda.
// Recibe un título y un subtítulo; si no viene un subtítulo, usamos uno por defecto.

//Es puramente visual y no tiene lógica compleja;

export const CustomJumbotron = ({ titulo, subtitulo }) => {
  const subtituloPorDefecto =
    "Eleva tu setup con notebooks, sillas gamers, monitores, consolas y todo lo que necesitas para jugar al máximo.";
  return (
    <section>
      {/* Contenedor centrado vertical y horizontalmente */}
      <div className=" text-center  d-flex justify-content-center">
        <div className="col-lg-8 ">
          {/* Título principal del jumbotron */}
          <h1 className="display-3 fw-bold text-shadow">{titulo}</h1>
          {/* Subtítulo: si no se envía uno, usamos el subtítulo por defecto */}
          <p className="lead fs-4">{subtitulo || subtituloPorDefecto}</p>
        </div>
      </div>
    </section>
  );
};
