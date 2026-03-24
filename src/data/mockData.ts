import projectRescue from "@/assets/project-education.jpg";
import projectShelter from "@/assets/project-water.jpg";
import projectSupplies from "@/assets/project-climate.jpg";
import projectMedical from "@/assets/project-health.jpg";
import projectReconstruction from "@/assets/project-crisis.jpg";

export interface Milestone {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  amount: number;
  invoiceHash?: string;
  txHash?: string;
  date?: string;
}

export interface ImpactProof {
  id: number;
  type: "photo" | "video";
  url: string;
  caption: string;
  milestoneId: number;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  goalUSDC: number;
  raisedUSDC: number;
  executedUSDC: number;
  verified: boolean;
  orgName: string;
  donors: number;
  daysLeft: number;
  milestones: Milestone[];
  impactProofs: ImpactProof[];
}

export const projects: Project[] = [
  {
    id: "rescue-cdmx-001",
    title: "Rescate y Búsqueda en Col. Roma",
    description: "Operaciones de rescate con equipo especializado para localizar sobrevivientes atrapados en edificios colapsados de la Colonia Roma.",
    longDescription: "Tras el terremoto de magnitud 7.1 que sacudió la Ciudad de México, múltiples edificios colapsaron en la Colonia Roma. Este proyecto financia brigadas de rescate con perros entrenados, equipo de corte y sensores sísmicos para localizar y extraer sobrevivientes de entre los escombros.",
    category: "Rescate",
    image: projectRescue,
    goalUSDC: 120000,
    raisedUSDC: 98000,
    executedUSDC: 72000,
    verified: true,
    orgName: "Topos CDMX",
    donors: 1542,
    daysLeft: 5,
    milestones: [
      { id: 1, title: "Equipo de Rescate", description: "Adquisición de herramientas de corte, sensores y equipo de protección", status: "completed", amount: 30000, invoiceHash: "QmX7b...3kF9", txHash: "0x8a4f...c2d1", date: "2026-03-15" },
      { id: 2, title: "Brigadas Caninas", description: "Despliegue de 12 unidades caninas especializadas en búsqueda", status: "completed", amount: 22000, invoiceHash: "QmR3k...7mN2", txHash: "0x3b7e...a8f4", date: "2026-03-17" },
      { id: 3, title: "Operaciones Nocturnas", description: "Iluminación y turnos nocturnos para búsqueda continua 24/7", status: "in-progress", amount: 20000 },
      { id: 4, title: "Apoyo Psicológico", description: "Atención psicológica para rescatistas y familias afectadas", status: "pending", amount: 25000 },
      { id: 5, title: "Evaluación Estructural", description: "Ingenieros evalúan edificios dañados para prevenir colapsos secundarios", status: "pending", amount: 23000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectRescue, caption: "Brigada de rescate extrayendo sobreviviente en Col. Roma Norte", milestoneId: 1, date: "2026-03-16" },
      { id: 2, type: "photo", url: projectSupplies, caption: "Voluntarios coordinando operaciones en zona cero", milestoneId: 2, date: "2026-03-18" },
    ],
  },
  {
    id: "shelter-cdmx-002",
    title: "Refugios de Emergencia en Xochimilco",
    description: "Instalación de refugios temporales con servicios básicos para 2,000 familias desplazadas por el sismo en Xochimilco.",
    longDescription: "Miles de familias en Xochimilco perdieron sus hogares tras el terremoto. Este proyecto instala refugios temporales dignos con acceso a agua potable, sanitarios, cocinas comunitarias y espacios seguros para niños.",
    category: "Refugio",
    image: projectShelter,
    goalUSDC: 85000,
    raisedUSDC: 61000,
    executedUSDC: 45000,
    verified: true,
    orgName: "Techo México",
    donors: 876,
    daysLeft: 18,
    milestones: [
      { id: 1, title: "Carpas y Lonas", description: "Compra de 500 carpas resistentes y lonas impermeables", status: "completed", amount: 18000, invoiceHash: "QmT8n...2pK5", txHash: "0x1c9d...f3e7", date: "2026-03-14" },
      { id: 2, title: "Sanitarios Portátiles", description: "Instalación de 80 unidades sanitarias en 4 campamentos", status: "completed", amount: 12000, invoiceHash: "QmL5w...9xB3", txHash: "0x7f2a...b5c8", date: "2026-03-16" },
      { id: 3, title: "Cocinas Comunitarias", description: "Montaje de 10 cocinas comunitarias con gas y utensilios", status: "in-progress", amount: 15000 },
      { id: 4, title: "Espacios para Niños", description: "Áreas seguras de juego y apoyo emocional infantil", status: "pending", amount: 20000 },
      { id: 5, title: "Gestión de Campamentos", description: "Coordinación logística durante 3 meses", status: "pending", amount: 20000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectShelter, caption: "Familias recibiendo carpas en campamento de Xochimilco", milestoneId: 1, date: "2026-03-15" },
    ],
  },
  {
    id: "supplies-cdmx-003",
    title: "Víveres y Agua para Tlalpan",
    description: "Distribución masiva de alimentos, agua potable y artículos de primera necesidad a comunidades afectadas en Tlalpan.",
    longDescription: "Las colonias populares de Tlalpan quedaron aisladas tras el sismo, sin acceso a tiendas ni servicios básicos. Este proyecto organiza centros de acopio y rutas de distribución para llevar agua, alimentos no perecederos y artículos de higiene a más de 5,000 personas.",
    category: "Ayuda Humanitaria",
    image: projectSupplies,
    goalUSDC: 60000,
    raisedUSDC: 47000,
    executedUSDC: 35000,
    verified: true,
    orgName: "Cruz Roja Mexicana",
    donors: 2103,
    daysLeft: 10,
    milestones: [
      { id: 1, title: "Compra de Víveres", description: "Adquisición de 10,000 despensas familiares", status: "completed", amount: 15000, invoiceHash: "QmV2j...8nR6", txHash: "0x4e8b...d7a2", date: "2026-03-13" },
      { id: 2, title: "Agua Potable", description: "20,000 litros de agua embotellada y pipas", status: "completed", amount: 10000, invoiceHash: "QmH9p...4tW1", txHash: "0x6a3c...e9b5", date: "2026-03-14" },
      { id: 3, title: "Artículos de Higiene", description: "Kits sanitarios para 2,000 familias", status: "in-progress", amount: 10000 },
      { id: 4, title: "Distribución Fase 2", description: "Segunda ronda de entregas a zonas de difícil acceso", status: "pending", amount: 15000 },
      { id: 5, title: "Monitoreo Nutricional", description: "Seguimiento del estado nutricional de niños y adultos mayores", status: "pending", amount: 10000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectSupplies, caption: "Voluntarios distribuyendo despensas en Tlalpan", milestoneId: 1, date: "2026-03-14" },
    ],
  },
  {
    id: "medical-cdmx-004",
    title: "Atención Médica de Emergencia en Coyoacán",
    description: "Hospitales de campaña y brigadas médicas para atender heridos y enfermos en zonas afectadas de Coyoacán.",
    longDescription: "Los hospitales de Coyoacán están saturados tras el sismo. Este proyecto despliega hospitales de campaña con médicos, enfermeras y medicamentos para atender fracturas, heridas, infecciones y crisis de salud mental en las colonias más golpeadas.",
    category: "Salud",
    image: projectMedical,
    goalUSDC: 150000,
    raisedUSDC: 112000,
    executedUSDC: 85000,
    verified: true,
    orgName: "Médicos Sin Fronteras MX",
    donors: 1891,
    daysLeft: 14,
    milestones: [
      { id: 1, title: "Hospital de Campaña", description: "Montaje de 2 hospitales de campaña con quirófano móvil", status: "completed", amount: 45000, invoiceHash: "QmK4r...6mS8", txHash: "0x2d5f...c4e1", date: "2026-03-13" },
      { id: 2, title: "Medicamentos", description: "Abastecimiento de medicinas esenciales para 3 meses", status: "completed", amount: 25000, invoiceHash: "QmN7t...1pX4", txHash: "0x9b1a...f6d3", date: "2026-03-15" },
      { id: 3, title: "Personal Médico", description: "Contratación de 15 médicos y 30 enfermeras voluntarias", status: "in-progress", amount: 35000 },
      { id: 4, title: "Salud Mental", description: "Programa de atención psicológica para 1,000 afectados", status: "pending", amount: 25000 },
      { id: 5, title: "Rehabilitación", description: "Terapia física para pacientes con fracturas y lesiones", status: "pending", amount: 20000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectMedical, caption: "Equipo médico atendiendo pacientes en hospital de campaña, Coyoacán", milestoneId: 1, date: "2026-03-14" },
    ],
  },
  {
    id: "rebuild-cdmx-005",
    title: "Reconstrucción de Viviendas en Iztapalapa",
    description: "Reconstrucción de 200 viviendas dañadas y reforzamiento estructural antisísmico en colonias vulnerables de Iztapalapa.",
    longDescription: "Iztapalapa, la alcaldía más poblada de CDMX, sufrió daños severos en cientos de viviendas. Este proyecto reconstruye hogares con técnicas antisísmicas modernas, asegurando que las familias regresen a casas más seguras que las originales.",
    category: "Reconstrucción",
    image: projectReconstruction,
    goalUSDC: 250000,
    raisedUSDC: 89000,
    executedUSDC: 42000,
    verified: true,
    orgName: "Hábitat para la Humanidad MX",
    donors: 634,
    daysLeft: 90,
    milestones: [
      { id: 1, title: "Evaluación de Daños", description: "Dictamen estructural de 500 viviendas afectadas", status: "completed", amount: 15000, invoiceHash: "QmW3s...5nT7", txHash: "0x5c8e...a2f9", date: "2026-03-18" },
      { id: 2, title: "Demolición Segura", description: "Retiro controlado de estructuras en riesgo de colapso", status: "in-progress", amount: 30000 },
      { id: 3, title: "Materiales de Construcción", description: "Compra de acero, concreto y materiales antisísmicos", status: "pending", amount: 80000 },
      { id: 4, title: "Reconstrucción Fase 1", description: "Construcción de las primeras 100 viviendas", status: "pending", amount: 75000 },
      { id: 5, title: "Reconstrucción Fase 2", description: "Construcción de las 100 viviendas restantes", status: "pending", amount: 50000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectReconstruction, caption: "Ingenieros evaluando daños estructurales en Iztapalapa", milestoneId: 1, date: "2026-03-19" },
    ],
  },
  {
    id: "schools-cdmx-006",
    title: "Escuelas Temporales en Gustavo A. Madero",
    description: "Aulas temporales para que 3,000 niños continúen sus estudios mientras se reconstruyen las escuelas dañadas.",
    longDescription: "Más de 50 escuelas en Gustavo A. Madero resultaron dañadas por el sismo, dejando a miles de niños sin acceso a educación. Este proyecto instala aulas temporales con mobiliario, materiales didácticos y apoyo psicopedagógico.",
    category: "Educación",
    image: projectRescue,
    goalUSDC: 45000,
    raisedUSDC: 18000,
    executedUSDC: 8000,
    verified: false,
    orgName: "Educación Sin Muros",
    donors: 245,
    daysLeft: 60,
    milestones: [
      { id: 1, title: "Diagnóstico Escolar", description: "Evaluación de daños en 50 escuelas del municipio", status: "completed", amount: 5000, invoiceHash: "QmJ5m...3rU2", txHash: "0x1f6d...b8c4", date: "2026-03-20" },
      { id: 2, title: "Aulas Prefabricadas", description: "Instalación de 30 aulas temporales", status: "in-progress", amount: 20000 },
      { id: 3, title: "Mobiliario y Materiales", description: "Escritorios, pizarrones y material didáctico", status: "pending", amount: 12000 },
      { id: 4, title: "Apoyo Psicopedagógico", description: "Psicólogos escolares para atención de trauma infantil", status: "pending", amount: 8000 },
    ],
    impactProofs: [],
  },
];
