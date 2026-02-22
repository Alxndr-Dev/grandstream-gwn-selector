# 📞 Grandstream Product Finder (MERN Stack)

<p align="center">
  <img src="https://www.grandstream.com/hs-fs/hubfs/raw_assets/public/Grandstream_Feb_2021/images/logo-grandstream-low-web.png?width=450&height=153&name=logo-grandstream-low-web.png" width="400" alt="Grandstream Logo">
</p>

> **Selector inteligente de terminales IP Grandstream.** Filtra por conectividad, tipo de pantalla y capacidad de cuentas SIP en tiempo real.

Este proyecto es una aplicación **Full-Stack** diseñada para ayudar a integradores y preventas a encontrar el teléfono ideal dentro del ecosistema de Grandstream.

---

## 🚀 Características

- 🔍 **Búsqueda en tiempo real**: Filtra por modelo o descripción.
- 📡 **Filtros avanzados**:
  - **Conectividad**: Wi-Fi, Bluetooth y soporte PoE.
  - **Pantalla**: Selección entre pantallas a Color (Multicolor) o Monocromáticas.
  - **Capacidad**: Slider dinámico para filtrar por número mínimo de cuentas SIP.
- 📱 **Diseño Responsivo**: Interfaz moderna construida con **Tailwind CSS** siguiendo la línea de diseño oficial de Grandstream.
- ⚡ **Arquitectura Robusta**: Backend en Node.js con persistencia de datos en MongoDB Atlas.

---

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología |
| :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS, JavaScript (Vanilla ES6) |
| **Backend** | Node.js, Express.js |
| **Base de Datos** | MongoDB Atlas (Mongoose) |
| **Despliegue** | GitHub Codespaces / Render |

---

## 📂 Estructura del Proyecto

```text
├── client/
│   └── index.html      # Interfaz de usuario y lógica de filtrado
├── server/
│   ├── config/db.js    # Conexión a MongoDB
│   ├── models/         # Esquemas de Mongoose
│   ├── routes/         # Endpoints de la API
│   ├── seed.js         # Script para poblar la base de datos
│   └── server.js       # Punto de entrada de la aplicación
└── .env                # Variables de entorno (no incluido en el repo)