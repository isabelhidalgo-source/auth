// useState: manejar estados
// useEffect: ejecutar código automáticamente
import { useEffect, useState } from "react";

// Importa funciones del service
// getUsers: obtiene usuarios
// createUser: crea usuarios
// User: Estructura de un usuario
import { getProducts, createProduct, type Product } from "../services/ProductApi";

function ApiExample() {

  // ==========================================
  // ESTADOS
  // ==========================================
  // products almacena lista de productos [] valor inicial vacío
  const [products, setProducts] = useState<Product[]>([]);
  // loading controla si algo está cargando
  const [loading, setLoading] = useState(false);
  // error almacena mensajes de error
  const [error, setError] = useState("");
  // estado para input nombre
  const [name, setName] = useState("");
  // estado para input price
  const [price, setPrice] = useState("");

  // ==========================================
  // GET -> CARGAR PRODUCTOS
  // ==========================================

  // función asíncrona
  const loadProducts = async () => {
    try {
      // activa loading
      setLoading(true);
      // limpia errores anteriores
      setError("");

      // llama a la API
      const data = await getProducts();
      // cuando complete guarda productos en estado
      setProducts(data);
    } catch (error) {
      // mensaje de error
      setError("No se pudieron cargar los productos");
    } finally {
      // finally se ejecuta SIEMPRE
      // exista error o no
      // desactiva loading
      setLoading(false);
    }
  };

  // ==========================================
  // useEffect
  // ==========================================

  // se ejecuta automáticamente
  // cuando el componente se renderiza por primera vez
  useEffect(() => {
    // cargar productos
    loadProducts();
  }, []);
  // [] significa: ejecutar solo una vez

  // ==========================================
  // POST -> CREAR PRODUCTO
  // ==========================================
  // e: React.FormEvent
  // representa el evento del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    // evita recargar la página
    e.preventDefault();

    try {
      // objeto nuevo producto
      const newProduct = {
        title: name,
        price: parseFloat(price),
      };

      // llama API POST
      const createdProduct = await createProduct(newProduct);

      // agrega nuevo producto al array existente
      setProducts([...products, createdProduct]);

      // limpia inputs
      setName("");
      setPrice("");

      // mensaje éxito
      alert("Producto creado correctamente");
    } catch (error) {
      // mensaje error
      setError("Error al crear producto");
    }
  };

  return (
    <div>
      <h1>Fetch API con React + TypeScript</h1>

      <hr />

      <h2>Crear Producto</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">
          Guardar
        </button>
      </form>

      <hr />

      <h2>Lista de Productos</h2>

      {/* renderizado condicional */}
      {/* si loading es true muestra parrafo */}
      {loading && <p>Cargando productos...</p>}
      {/* loading ? <p>Cargando productos...</p> : null */}

      {/* si existe error */}
      {error && <p>{error}</p>}

      {/* lista productos */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default ApiExample;
