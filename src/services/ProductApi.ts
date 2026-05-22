//estructura de un producto
export type Product = {
    id?: number;
    title: string;
    price: number;
};

// URL de la API que se consumirá
const URL = "https://fakestoreapi.com/products";

// ==========================================
// GET -> OBTENER PRODUCTOS
// ==========================================

// async indica que la función trabajará con procesos asíncronos
// Promise<Product[]> significa:
// "la función devolverá una promesa con un arreglo de productos"
export const getProducts = async (): Promise<Product[]> => {
    try {

        // fetch realiza petición HTTP
        // await espera la respuesta del servidor
        const response = await fetch(URL);

        // si falla, se genera un error
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }

        // convierte la respuesta JSON a objeto JavaScript
        const data = await response.json();

        // retorna los datos obtenidos
        return data;
    } catch (error) {
        console.error(error);
        // muestra el error en consola
        throw error;
        //lanza el error a quien llamo a la funcion
    }
};

// ==========================================
// POST -> CREAR PRODUCTOS
// ==========================================

// product: Product
// recibe un objeto de tipo Product

// Promise<Product>
// devolverá una promesa con un producto
export const createProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                // indica que se enviará JSON
                "Content-Type": "application/json",
            },
            // JSON.stringify convierte objeto JS a texto JSON
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Error al crear producto");
        }

        // convierte respuesta JSON a objeto JS
        const data = await response.json();

        // retorna los datos obtenidos
        return data;
    } catch (error) {
        // muestra error en consola
        console.error(error);
        // relanza error
        throw error;
    }
};