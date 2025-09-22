# README — Prueba Técnica: Carrito de Compras (Front React 17 + Back .NET 8)

> Implementación completa de un **carrito de compras** con frontend en **React 17 (JS)** y backend en **.NET 8 (API REST)**, cumpliendo los requisitos funcionales, de estructura y de entrega descritos en el documento de la prueba.&#x20;

---

## 🎯 Objetivo

Desarrollar una aplicación web que permita **buscar, visualizar y gestionar productos** en un carrito, y exponer un **CRUD de carrito/órdenes** en una API .NET 8. Al **culminar una compra**, el backend debe **registrar un log** de compra exitosa.&#x20;

---

## 🧱 Stack Tecnológico

### Frontend

- **React 17** (JavaScript)
- **Estado / Hooks** (useState/useReducer; Context opcional)
- **Axios o Fetch** para comunicación HTTP
- **UI**: libre (Material UI opcional)&#x20;

### Backend

- **.NET 8** (o superior) — **API REST**
- **Diseño orientado a interfaces** + **Inyección de dependencias**
- Capas: **Controladores, Servicios, DTOs, Interfaces y Repositorio**
- **Logging** de compra exitosa al cerrar la orden&#x20;

### Entrega

- **Git** como medio de entrega (README y guías de ejecución).&#x20;

---

## 📂 Estructura de Proyecto

```
/ (raíz del repo)
├─ frontend/                      # React 17 + Vite/CRA
│  ├─ src/
│  │  ├─ api/                     # Comucacion y servicios
│  │  ├─ components/              # Presentacionales
│  │  ├─ hooks/                   # Hooks personalizados
│  │  ├─ services/                # Comunicación (Axios)
│  │  ├─ contex/                  # Contexts
│  │  ├─ pages/                   # Vistas
│  │  └─ utils/                   # helpers (formatCurrency, etc.)
│  ├─ App.jsx
│  ├─ index.css                   # Configuracion global de estilos, tailwind
│  └─ main.jsx
│
├─ backend/                       # .NET 8 Web API
│  ├─ Controllers/                # Controladores (Controllers)
│  ├─ data/logs                   # Carpeta donde se guardan logs (JSON/Texto)
│  ├─ Dtos                        # Request/Response DTOs
│  ├─ Logging/                    # Logica y servicio de Logging
│  ├─ Middlewares                 # Custom middlewares para manejar las peticiones.
│  ├─ Repositories/               # Interfaces/Contratos
│  ├─ Models/                     # Entidades
│  ├─ Services/                   # Repositorios, persistencia (en memoria/archivo)
│  ├─ seed/                       # Contiene el archivo con la base de datos en JSON
│  └─ Program.cs / appsettings.json
│
├─ data/
│  └─ catalogo.json               # JSON de prueba (BDD en memoria)
│
├─ README.md                      # Este archivo
└─ .gitignore
```

> La separación **Contenedor, Componente, Hook y Comunicación** se refleja en `frontend/src/`. Las capas **Controladores, Servicios, DTOs, Interfaces y Repositorio** están en `backend/`.&#x20;

---

## ✅ Criterios de Aceptación (Checklist)

**Carrito (Front):**

- [x] Agregar artículo → se actualiza nombre y precio en el carrito.&#x20;
- [x] Aumentar cantidad desde el carrito → actualiza precio parcial y total.&#x20;
- [x] Agregar el mismo artículo varias veces → **un solo ítem** con **cantidad acumulada** y **total correcto**.&#x20;
- [x] Agregar diferentes tipos de artículos → mostrar **nombre, imagen, precio** por ítem y **total global**.&#x20;
- [x] Eliminar algunos ítems → total recalculado. Eliminar todos → total **cero** y lista vacía.&#x20;
- [x] Click en ítem del carrito → **ventana emergente** con más información.&#x20;

**Backend (API):**

- [x] CRUD del carrito/órdenes.
- [x] Al culminar una compra, **guardar log de compra exitosa**.&#x20;

**Datos:**

- [x] Cargar **JSON** de prueba como **BDD en memoria** (ver `data/products.json`).&#x20;

---

## 🧪 JSON de prueba (catálogo)

- El documento provee un **JSON de categorías y productos** (ej.: “Abonos Orgánicos”, “Analgésicos”, etc.).
- Este JSON se incluye en `seed/products.json` y el backend lo carga **en memoria** al iniciar.&#x20;

> Nota: El JSON original contiene campos como `caprId`, `catalogoProd[]`, `cproId`, `cproNombre`, etc. Úsese para poblar el catálogo inicial.&#x20;

---

## 🚀 Puesta en Marcha

### Requisitos

- **Node.js 18+** y **npm**
- **.NET SDK 8+**
- **VS Code** (Front) / **Visual Studio 2022** o VS Code + C# (Back).&#x20;

### 1) Backend (.NET 8)

```bash
cd backend
dotnet restore
dotnet build -c Release
dotnet run
# API por defecto en http://localhost:5017 (ajusta según el profile/launchSettings)
```

**Configuración**

- `appsettings.json`:

  - `OrderLog`:

    - `FilePath`: `data/logs/orders.jsonl`

### 2) Frontend (React 17)

```bash
cd frontend
npm install
npm run dev
# puede usarse pnpm por rapidez
# App en http://localhost:5173 (según Vite/CRA)
```

**Variables Front**

- `VITE_API_BASE_URL=http://localhost:5017` (o el puerto que exponga su API)
- Se puede alternar entre **local (mock JSON)** y **backend real** cambiando un flag o env `VITE_API_MODE`: `backend` o `mock`.

---

## 🔗 Contrato de la API (Referencia)

> Rutas orientativas; los nombres pueden variar, manteniendo el espíritu CRUD y el log de compra.

### Catálogo

- `GET /api/catalog/categories` → listado de categorías
- `GET /api/catalog/products` → listado de productos (query por `caprId`, búsqueda libre)

### Carrito

- `GET /api/cart/{cartId}`
- `POST /api/cart/{cartId}/items` → `{"id": number, "quantity": number, "imageUrl": string}`
- `PUT /api/cart/{cartId}/items/{productId}` → cambia cantidad
- `DELETE /api/cart/{cartId}/items/{productId}`
- `DELETE /api/cart/{cartId}/items` → vaciar carrito

### Orden

- `POST /api/orders` → Crea orden desde un `cartId` y datos de cliente/pago (simulados)

  - **Efecto colateral**: registra **log** de compra exitosa (ver sección Logging).

**DTOs sugeridos**

- `CreateOrderRequest { cartId: guid }`
- `CreateOrderResponse { orderNumber: string, createdAt: date, total: number }`

---

## 🧾 Logging de Compra Exitosa

- Al **crear una orden** (checkout exitoso), el servicio debe ejecutar:

  - `ILogger<OrderService>.LogInformation(...)`
  - **Guardar archivo** en `backend/data/logs/` (p.ej., `orders.jsonl`), con eventos **JSON por línea**:

    ```json
    {
      "timestamp": "2025-09-21T23:59:59Z",
      "orderNumber": "ORD-20250921235959-ABC12345",
      "total": 123.45,
      "itemsCount": 3,
      "cartId": "ABC12345"
    }
    ```

- Este requerimiento está **exigido** por la prueba (guardar en un log la compra exitosa).&#x20;

---

## 🧭 Flujo de Usuario (Front)

1. **Home / Catálogo**: búsqueda por nombre/categoría; listado de cards.
2. **Agregar al carrito**: botón “Agregar”; si el producto ya existe, **incrementa cantidad**.
3. **Carrito**: ver **ítems (nombre, imagen, precio, cantidad)** y **total**; **+/-** para cantidad; **eliminar** ítem o **vaciar** carrito.
4. **Detalle emergente**: click en ítem del carrito → **modal** con info extra.
5. **Checkout**: completar datos de pedido/pago (simulados), enviar a `/api/orders`.
6. **Éxito**: mostrar confirmación y limpiar carrito. (El **log** se guarda en backend).&#x20;

---

## 🧩 Decisiones de Arquitectura

- **Front**

  - **Componentes**: UI pura (presentacional).
  - **Hooks**: `useCart`, `useCatalog` (lógica reutilizable).
  - **Servicios/Api**: capa de comunicación; permite **cambiar entre mock/local y backend real** sin tocar la UI.

- **Back**

  - **Interfaces/Implementaciones**.
  - **Repositorios en memoria** alimentados por `data/catalogo.json`.
  - **Servicios**: contienen reglas (incrementar cantidades, totales, cierre de compra y log).
  - **Controladores**: exponen endpoints concisos.

---

## 🧰 Scripts Útiles

### Frontend

- `npm run dev` – Desarrollo
- `npm run build` – Producción
- `npm run preview` – Vista previa build

### Backend

- `dotnet run` – Desarrollo
- `dotnet build` – Build Prod

---

## 🔒 Manejo de Errores

- Front: toasts/alerts ante errores HTTP, bloqueo de botones con `isProcessing` durante checkout.

---

## 📎 Anexos

- **Documento base de la prueba**: requisitos funcionales, tecnologías y estructura de proyecto.&#x20;
- **JSON de prueba**: incluido en `data/catalogo.json`.&#x20;

---

## 💡 Extras (Opcionales)

- Persistencia del carrito en **LocalStorage**.
- **Swagger** en backend.

---

**¡Listo!** Con este README puedes clonar, levantar el front y el back, verificar el flujo completo del carrito y confirmar el **log de compra exitosa** conforme a los requisitos de la prueba.&#x20;
