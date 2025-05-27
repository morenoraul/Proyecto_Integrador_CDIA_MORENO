## Evidencia 1
## React  + Vite + Tailwind + Axios

Este proyecto es una aplicación WEB  desarrollada con React que consume la API de DummyJSON para mostrar productos en formato de tarjetas. La interfaz está diseñada utilizando Tailwind CSS para lograr un estilo moderno y responsivo.

### Características

- Consulta productos desde la API de DummyJSON.
- Muestra el título y precio de cada producto en una tarjeta.
- Búsqueda de productos por nombre (Filtracion de datos dentro de la Evidencia N°2).
- Estilos responsivos y modernos con Tailwind CSS.

### Tecnologías Utilizadas

⚙️React: Biblioteca de JavaScript para construir interfaces de usuario.
⚙️Vite: Herramienta de construcción que proporciona una experiencia de desarrollo extremadamente rápida.
⚙️Tailwind CSS: Framework de CSS de utilidad que permite un desarrollo rápido y flexible del diseño.
⚙️Axios: Cliente HTTP basado en promesas para realizar peticiones al API de DummyJSON.
⚙️DummyJSON: API REST gratuita para obtener datos de productos de prueba.


### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala React-Vite

> npm create vite@latest 
◇  Package name:
│  EV1-proyecto-RS
◇  Select a framework:
│  React
◇  Select a variant:
│  JavaScript + SWC
└  Done. Now run:

3. Dirigite al proyecto creado anteriormente
    ```bash
    cd EV1-proyecto-rs
    ```
4. Instala las dependencias:
   ```bash
   npm install
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

6. Instala tailwind

    ```bash
    npm install tailwindcss @tailwindcss/vite
    ```

7. Instala axios

    ```bash
    npm install axios
    ```

8. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

### Estructura principal

- `src/App.jsx`: Componente principal, obtiene y muestra los productos.
- `src/componentes/ProductoCard.jsx`: Componente para mostrar cada producto (opcional).
- `src/main.jsx`: Punto de entrada de la aplicación.