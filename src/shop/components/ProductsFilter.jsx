// Lista de categorías disponibles para filtrar productos.
// Cada categoría tiene un "id" (valor interno) y un "label" (texto visible para el usuario).
const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "notebooks", label: "notebooks" },
  { id: "consolas", label: "consolas" },
  { id: "sillasgamers", label: "sillas" },
  { id: "accesorios", label: "accesorios" },
  { id: "monitores", label: "monitores" },
];

/*Este componente genera los botones que permiten filtrar productos por categoría.
Define una lista de categorías y crea dinámicamente un botón por cada una.
El botón cambia de estilo según si es la categoría activa y, al hacer clic, avisa al componente padre cuál categoría seleccionar.
No realiza filtrado por sí mismo: solo emite la intención del usuario; el componente padre se encarga de filtrar realmente los productos.*/

export const ProductsFilter = ({ currentCategory, onChangeCategory }) => {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      {/* Recorremos la lista de categorías y generamos un botón por cada una */}
      {CATEGORIES.map((cat) => {
        // Determinamos si este botón corresponde a la categoría activa actual
        const isActive = currentCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            // Cambiamos el estilo dependiendo de si la categoría está seleccionada o no
            className={
              "btn btn-sm rounded-pill px-3 " +
              (isActive ? "btn-dark text-white" : "btn-outline-secondary")
            }
            // Cuando el usuario hace clic, informamos al componente padre qué categoría eligió
            onClick={() => onChangeCategory(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
