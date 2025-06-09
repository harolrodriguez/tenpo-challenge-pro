**Principios Arquitectónicos Clave:**

- **Contexto Público/Privado:** Gestionado mediante `react-router-dom` y un componente `ProtectedRoute` que verifica el estado de autenticación (almacenado en Zustand). Se utilizan `PublicLayout` y `PrivateLayout` para estructurar las vistas.
- **Gestión de Estado:**
  - **Autenticación:** Zustand (`auth.store.ts`) para el token y estado de autenticación, con persistencia en `localStorage`.
  - **Datos del Servidor:** TanStack Query para todo lo relacionado con el fetching de películas, manejo de caché, estados de carga/error y scroll infinito.
- **Fetching de Datos:** Axios para las llamadas HTTP, con una instancia configurada para la API de TMDB y para enviar el fake-token de la aplicación.
- **Renderizado de Listas Largas:**
  - **Requisito "2000 elementos":** Se abordó implementando un **scroll infinito** con TanStack Query. La API de TMDB pagina los resultados (20 por página). En lugar de cargar 2000 de golpe, se cargan progresivamente.
  - **Virtualización:** Se utiliza TanStack Virtual para renderizar solo las filas de películas visibles, optimizando drásticamente el rendimiento. Para pantallas con múltiples columnas, se virtualizan "filas de grid", donde cada fila contiene el número apropiado de películas según el ancho de la pantalla.
- **Responsividad:** Lograda mediante las utilidades responsivas de Tailwind CSS y `grid-cols-*` dinámicas.

## Buenas Prácticas Implementadas

- **Tipado Fuerte con TypeScript:** En todo el proyecto para mejorar la robustez y mantenibilidad.
- **Componentes Reutilizables:** Fomentado por React y `shadcn/ui`.
- **Separación de Responsabilidades:** Clara distinción entre UI, lógica de negocio, servicios de API y gestión de estado.
- **Manejo de Errores:** Implementado en las llamadas a API y en la UI para informar al usuario.
- **Estados de Carga:** Uso de skeletons (`MovieCardSkeleton`) y spinners para una mejor UX durante la carga de datos.
- **Optimización de Rendimiento:**
  - Virtualización de listas.
  - Memoización de componentes (`React.memo` en `MovieCard`).
  - Uso de `useMemo` y `useCallback` donde es apropiado.
  - Caching de datos con TanStack Query.
- **Código Limpio:** Buscando claridad, legibilidad y siguiendo principios como DRY (Don't Repeat Yourself).
- **Accesibilidad (a11y):** `shadcn/ui` proporciona una base sólida para componentes accesibles. Se han utilizado atributos `aria-label` donde es relevante.
- **README Detallado:** Como este mismo archivo, para facilitar la comprensión y ejecución del proyecto.

## Propuesta de Mejora Teórica (Llamadas al Backend)

Aunque la API de TMDB es pública y no la controlamos, si tuviéramos un backend propio para esta aplicación, una mejora significativa sería:

- **Backend con Paginación Eficiente y Filtrado Avanzado:** Asegurar que el backend pueda manejar eficientemente la paginación y ofrecer opciones de filtrado/ordenación robustas para que el frontend no tenga que traer datos innecesarios.
- **GraphQL (Opcional):** Para aplicaciones con necesidades de datos complejas y variadas entre vistas, GraphQL permitiría al frontend solicitar exactamente los datos que necesita por pantalla, reduciendo el over-fetching y under-fetching.
- **Optimización de Imágenes:** Si las imágenes fueran nuestras, un servicio de optimización y redimensionamiento de imágenes (CDN con transformación de imágenes) sería crucial para servir el tamaño adecuado según el dispositivo y la resolución, mejorando los tiempos de carga.

Para la API de TMDB, ya estamos usando su paginación. La mejora principal sería si la propia API ofreciera más flexibilidad o granularidad en sus respuestas para evitar cargar campos que no siempre se usan.

---

Espero que esta solución cumpla con las expectativas. ¡Gracias de nuevo por la oportunidad!

Atentamente,

**Harol Rodriguez Rojas**

- 📧 Email: [harol.rodriguez28@gmail.com](mailto:harol.rodriguez28@gmail.com)
- 🔗 LinkedIn: [linkedin.com/in/harolrodriguez](https://www.linkedin.com/in/harolrodriguez/)
- 🐙 GitHub: [github.com/harolrodriguez](https://github.com/harolrodriguez)
