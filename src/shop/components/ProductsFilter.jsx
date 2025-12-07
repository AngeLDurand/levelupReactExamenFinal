const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "notebooks", label: "notebooks" },
  { id: "consolas", label: "consolas" },
  { id: "sillasgamers", label: "sillas" },
  { id: "accesorios", label: "accesorios" },
  { id: "monitores", label: "monitores" },
];

export const ProductsFilter = ({ currentCategory, onChangeCategory }) => {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            className={
              "btn btn-sm rounded-pill px-3 " +
              (isActive ? "btn-dark text-white" : "btn-outline-secondary")
            }
            onClick={() => onChangeCategory(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
