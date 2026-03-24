# 🌍 ImpactSphere Connect

**Plataforma de crowdfunding de impacto social con trazabilidad on-chain.**

ImpactSphere Connect permite a organizaciones publicar causas sociales y recibir donaciones en criptoactivos (AVAX) de forma completamente transparente, respaldadas por smart contracts en la blockchain de Avalanche.

---

## ✨ Características Principales

| Característica | Descripción |
|---|---|
| **Donaciones On-Chain** | Los usuarios conectan su wallet (MetaMask u otra inyectada) y donan AVAX directamente al smart contract `DonationBox`. |
| **Trazabilidad Radical** | Cada proyecto muestra una línea de tiempo de hitos con estado (completado / en progreso / pendiente) y links a transacciones en el explorador. |
| **Pruebas de Impacto** | Feed de evidencias (fotos, documentos) que demuestran el uso real de los fondos recaudados. |
| **Verificación KYC** | Las organizaciones verificadas muestran una insignia de confianza. |
| **Liberación por Hitos** | Los fondos se liberan progresivamente conforme se cumplen los hitos del proyecto. |

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **TypeScript**
- **Vite** como bundler y dev server
- **Tailwind CSS** para estilos
- **shadcn/ui** (Radix UI) como librería de componentes
- **React Router DOM** para enrutamiento SPA
- **TanStack React Query** para cache de datos
- **Recharts** para visualización de datos
- **Lucide React** para iconografía

### Blockchain
- **Wagmi v3** + **Viem** para interacción con la blockchain
- **Ethers.js v6** como utilidad adicional
- **Hardhat** para compilación y despliegue de contratos
- **Red**: Avalanche Fuji C-Chain (testnet, chain ID `43113`)

### Smart Contract
- **`DonationBox.sol`** (Solidity ^0.8.20) — Contrato que:
  - Acepta AVAX nativo vía función `donate()` y `receive()`
  - Registra el total recaudado (`totalReceived`)
  - Mapea las contribuciones por dirección (`contributions`)
  - Emite el evento `Donated` en cada donación

### Testing
- **Vitest** para tests unitarios
- **Playwright** para tests end-to-end

---

## 📁 Estructura del Proyecto

```
impactsphere-connect/
├── contracts/
│   └── DonationBox.sol          # Smart contract de donaciones
├── scripts/                     # Scripts de despliegue (Hardhat)
├── src/
│   ├── blockchain/
│   │   ├── wagmiConfig.ts       # Configuración de Wagmi (Fuji chain)
│   │   └── donationBox.ts       # ABI y dirección del contrato
│   ├── components/
│   │   ├── Header.tsx           # Barra de navegación con conexión de wallet
│   │   ├── Hero.tsx             # Sección hero de la landing
│   │   ├── ProjectCard.tsx      # Tarjeta de proyecto con progreso
│   │   ├── DonationPanel.tsx    # Panel lateral para donar AVAX
│   │   ├── MilestoneTimeline.tsx # Línea de tiempo de hitos
│   │   ├── ImpactFeed.tsx       # Feed de pruebas de impacto
│   │   └── ui/                  # Componentes shadcn/ui
│   ├── data/
│   │   └── mockData.ts          # Datos de ejemplo de proyectos
│   ├── pages/
│   │   ├── Index.tsx            # Página principal (listado de proyectos)
│   │   ├── ProjectDetail.tsx    # Detalle de proyecto + donación
│   │   └── NotFound.tsx         # Página 404
│   └── App.tsx                  # Enrutador principal
├── hardhat.config.cjs           # Configuración de Hardhat
├── .env.example                 # Variables de entorno de ejemplo
└── package.json
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** >= 18
- **npm**, **yarn** o **bun**
- Una wallet compatible (MetaMask recomendado)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/YORCH12/impactsphere-connect.git
cd impactsphere-connect

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env
```

### Configurar Variables de Entorno

Edita el archivo `.env` con los valores necesarios:

```env
# RPC de Avalanche Fuji (testnet)
FUJI_RPC_URL=https://api.avax-testnet.xyz/ext/bc/C/rpc

# Clave privada del deployer (solo para despliegue)
PRIVATE_KEY=0x...

# Dirección del contrato desplegado (para el frontend)
VITE_DONATIONBOX_ADDRESS=0xTuDireccionDelContrato
```

### Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Despliegue del Smart Contract

```bash
# Compilar el contrato
npm run compile:contracts

# Desplegar en Avalanche Fuji
npm run deploy:fuji
```

Después de desplegar, copia la dirección del contrato en `VITE_DONATIONBOX_ADDRESS` dentro de tu `.env`.

---

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests en modo watch
npm run test:watch
```

---

## 📄 Rutas de la Aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Index | Landing con hero, barra de confianza y grid de causas destacadas |
| `/project/:id` | ProjectDetail | Detalle del proyecto con hitos, pruebas de impacto y panel de donación |
| `*` | NotFound | Página 404 |

---

## 🔗 Flujo de Donación

1. El usuario navega al detalle de un proyecto.
2. Conecta su wallet (MetaMask) a la red Avalanche Fuji.
3. Ingresa la cantidad de AVAX a donar (montos rápidos: 0.01, 0.05, 0.1, 0.5).
4. Confirma la transacción en su wallet.
5. El smart contract registra la donación y emite el evento `Donated`.
6. El panel se actualiza mostrando el nuevo total on-chain.

---

## 📜 Licencia

MIT
