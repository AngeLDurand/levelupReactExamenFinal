export const AdminTitle = ({ titulo, subtitulo }) => {
  return (
    <>
      <section>
        <div className=" text-center  d-flex justify-content-center">
          <div className="col-lg-8 ">
            <h1 className="display-3 fw-bold text-shadow">{titulo}</h1>
            <p className="lead fs-4">{subtitulo}</p>
          </div>
        </div>
      </section>
    </>
  );
};
