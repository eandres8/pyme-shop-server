<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# 🚀 Pyme-Shop-server

**Descripción breve:**
Backend desarrollado con **NestJS**, **TypeScript** y **TypeORM**. Este proyecto maneja usuarios, autenticación, productos, pedidos y pagos, siguiendo principios de **DDD** (Domain-Driven Design) y con tests unitarios y de integración con **Jest**.

---

## 🔹 Tabla de Contenidos

* [Tecnologías](#-tecnologías)
* [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
* [Instalación](#-instalación)
* [Ejecución](#-ejecución)
* [Testing](#-testing)
* [Carpetas Principales](#-carpetas-principales)
* [Contribuciones](#-contribuciones)
* [Licencia](#-licencia)

---

## 💻 Tecnologías

* **Node.js 24** – Runtime de servidor
* **NestJS** – Framework backend modular y escalable
* **TypeScript** – Tipado estático
* **TypeORM** – ORM para manejo de base de datos
* **PostgreSQL / MySQL / SQLite** – Base de datos (ajustar según proyecto)
* **Jest** – Testing unitario y de integración
* **class-validator / class-transformer** – Validación y transformación de DTOs
* **Passport + JWT** – Autenticación y autorización
* **EventEmitter2** – Sistema de eventos internos

---

## 🏗 Arquitectura del Proyecto

El proyecto sigue la arquitectura **modular y basada en dominio con arquitectura hexagonal y scream architecture**:

```
src/
│
├─ features/
│   └─ orders/         # Órdenes y carrito
│     ├─ domain/             # Entidades de negocio
│     ├─ infrastructure/     # Modelos de base de datos, adapters
│     └─ application/        # Casos de uso / services / mappers
│   ├─ auth/           # Login, registro, JWT, roles
│   ├─ users/          # Usuarios, repositorios, servicios
│   ├─ products/       # Productos, repositorios, servicios
│   └─ payments/       # Pagos y webhooks
├─ main.ts             # Entry point de NestJS
├─ app.module.ts       # Módulo raíz
└─ config/             # Variables de entorno y configuración
```

* **Features**: Contienen servicios, DTOs, repositorios y controladores relacionados a un dominio.
* **Domain**: Entidades y objetos de valor que representan el núcleo de negocio.
* **Infrastructure**: Modelos TypeORM, adaptadores y mappers para persistencia.
* **Application**: Casos de uso y lógica de negocio (services, mappers).
* **Shared**: Helpers, validaciones, logs y objetos de resultado (`Result`).

---

## ⚡ Instalación

Clona el repositorio y usa **pnpm** o **npm**:

```bash
# Clonar el repositorio
git clone git@github.com:eandres8/pyme-shop-server.git
cd pyme-shop-server

# Instalar dependencias
pnpm install
# o con npm
# npm install
```

Configura las variables de entorno en `.env`:

```env
# Ejemplo de configuración
PORT=3001

# DB
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=example_db

# auth
JWT_SECRET=
JWT_EXPIRATION_TIME=1d
```

---

## ▶️ Ejecución

Para ejecutar el proyecto en modo desarrollo con **hot reload**:

```bash
pnpm start:dev
```

Para construir el proyecto para producción:

```bash
pnpm build
pnpm start
```

Servidor por defecto: **[http://localhost:3000](http://localhost:3000)**

Tambien es posible levantar el servidor de manera local con el comando docker

```bash
docker compose -f docker-compose.dev.yml up --build
```

### 🚨🚨
Es imporntante lanzar el comando de las migraciones para crear y poblar la base de datos

```bash
pnpm migration:run
```

### 📑
La documentación de los recursos estan publicados y documentados en la URL

```bash
http://localhost:3000/api/docs
```

---

## 🧪 Testing

El proyecto usa **Jest** para pruebas unitarias e integración:

```bash
# Ejecutar tests unitarios
pnpm test

# Ejecutar tests con watch
pnpm test:watch

# Ver cobertura
pnpm test:cov
```

* Las pruebas se encuentran en las carpetas `__tests__` o con extensión `.spec.ts`.
* Se recomienda cubrir controladores, servicios y mappers críticos.

---

## 📁 Carpetas Principales

| Carpeta           | Descripción                                                 |
| ----------------- | ----------------------------------------------------------- |
| `features/`       | Módulos o dominios: auth, users, products, orders, payments |
| `domain/`         | Entidades y objetos de valor                                |
| `infrastructure/` | Modelos TypeORM, mappers y adaptadores                      |
| `application/`    | Casos de uso, servicios, mappers                            |
| `shared/`         | Helpers, utils, resultados (`Result`), constantes           |
| `config/`         | Configuración de entorno                                    |
| `main.ts`         | Punto de entrada                                            |
| `app.module.ts`   | Módulo raíz de NestJS                                       |

---

## 🤝 Contribuciones

1. Fork del repositorio
2. Crear una rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Hacer commit de tus cambios: `git commit -m "Agrega nueva funcionalidad"`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.
Ver el archivo [LICENSE](LICENSE) para más detalles.


