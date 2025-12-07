export const CustomJumbotron = ({ titulo, subtitulo }) => {
  const subtituloPorDefecto =
    "Eleva tu setup con notebooks, sillas gamers, monitores, consolas y todo lo que necesitas para jugar al máximo.";
  return (
    <section>
      <div className=" text-center  d-flex justify-content-center">
        <div className="col-lg-8 ">
          <h1 className="display-3 fw-bold text-shadow">{titulo}</h1>
          <p className="lead fs-4">{subtitulo || subtituloPorDefecto}</p>
        </div>
      </div>
    </section>
  );
};
