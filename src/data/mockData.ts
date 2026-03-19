import projectEducation from "@/assets/project-education.jpg";
import projectWater from "@/assets/project-water.jpg";
import projectClimate from "@/assets/project-climate.jpg";
import projectHealth from "@/assets/project-health.jpg";
import projectCrisis from "@/assets/project-crisis.jpg";

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
    id: "edu-kenya-001",
    title: "Escuelas Solares para Kenia Rural",
    description: "Construimos aulas alimentadas por energía solar en comunidades sin acceso a electricidad, brindando educación digital a 500 niños.",
    longDescription: "Este proyecto lleva educación digital a las comunidades más remotas de Kenia. Con paneles solares y tabletas educativas, transformamos aulas oscuras en centros de aprendizaje conectados. Cada escuela beneficia a más de 100 niños que anteriormente no tenían acceso a recursos educativos modernos.",
    category: "Educación",
    image: projectEducation,
    goalUSDC: 100000,
    raisedUSDC: 67500,
    executedUSDC: 45000,
    verified: true,
    orgName: "SolarLearn Foundation",
    donors: 342,
    daysLeft: 28,
    milestones: [
      { id: 1, title: "Compra de Paneles Solares", description: "Adquisición de 50 paneles solares de alta eficiencia", status: "completed", amount: 20000, invoiceHash: "QmX7b...3kF9", txHash: "0x8a4f...c2d1", date: "2025-11-15" },
      { id: 2, title: "Instalación Eléctrica", description: "Cableado e instalación en 5 escuelas rurales", status: "completed", amount: 15000, invoiceHash: "QmR3k...7mN2", txHash: "0x3b7e...a8f4", date: "2026-01-20" },
      { id: 3, title: "Compra de Tabletas", description: "200 tabletas educativas con contenido precargado", status: "in-progress", amount: 10000 },
      { id: 4, title: "Capacitación Docente", description: "Formación de 25 profesores en herramientas digitales", status: "pending", amount: 12500 },
      { id: 5, title: "Monitoreo y Evaluación", description: "Seguimiento del impacto educativo durante 6 meses", status: "pending", amount: 10000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectEducation, caption: "Niños usando tabletas por primera vez en la escuela de Mombasa", milestoneId: 1, date: "2025-12-01" },
      { id: 2, type: "photo", url: projectClimate, caption: "Instalación de paneles solares en la escuela de Kisumu", milestoneId: 2, date: "2026-01-25" },
    ],
  },
  {
    id: "water-eth-002",
    title: "Agua Limpia para Etiopía",
    description: "Perforación de pozos de agua potable con sistemas de filtración en 10 aldeas rurales que dependen de fuentes contaminadas.",
    longDescription: "Más de 5,000 personas en comunidades rurales de Etiopía dependen de fuentes de agua contaminadas. Este proyecto perfora pozos seguros con sistemas de filtración modernos, reduciendo las enfermedades transmitidas por el agua en un 80%.",
    category: "Salud",
    image: projectWater,
    goalUSDC: 75000,
    raisedUSDC: 52000,
    executedUSDC: 38000,
    verified: true,
    orgName: "AquaVida Global",
    donors: 218,
    daysLeft: 45,
    milestones: [
      { id: 1, title: "Estudios Geológicos", description: "Análisis de suelo en las 10 aldeas", status: "completed", amount: 8000, invoiceHash: "QmT8n...2pK5", txHash: "0x1c9d...f3e7", date: "2025-10-10" },
      { id: 2, title: "Perforación de Pozos", description: "Excavación de 10 pozos profundos", status: "completed", amount: 20000, invoiceHash: "QmL5w...9xB3", txHash: "0x7f2a...b5c8", date: "2026-01-05" },
      { id: 3, title: "Sistemas de Filtración", description: "Instalación de filtros de alta capacidad", status: "in-progress", amount: 12000 },
      { id: 4, title: "Capacitación Comunitaria", description: "Entrenamiento en mantenimiento de los sistemas", status: "pending", amount: 10000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectWater, caption: "Comunidad celebrando la apertura del primer pozo", milestoneId: 2, date: "2026-01-10" },
    ],
  },
  {
    id: "climate-br-003",
    title: "Energía Solar Comunitaria en Brasil",
    description: "Instalación de micro-redes solares en favelas para reducir la dependencia de combustibles fósiles y empoderar comunidades.",
    longDescription: "Las comunidades marginadas de Brasil pagan hasta un 40% de sus ingresos en electricidad. Este proyecto instala micro-redes solares comunitarias, reduciendo costos energéticos y emisiones de carbono mientras crea empleos locales.",
    category: "Crisis Climática",
    image: projectClimate,
    goalUSDC: 150000,
    raisedUSDC: 89000,
    executedUSDC: 55000,
    verified: true,
    orgName: "GreenGrid LatAm",
    donors: 567,
    daysLeft: 60,
    milestones: [
      { id: 1, title: "Evaluación de Sitios", description: "Análisis técnico de 8 comunidades", status: "completed", amount: 10000, invoiceHash: "QmV2j...8nR6", txHash: "0x4e8b...d7a2", date: "2025-09-20" },
      { id: 2, title: "Adquisición de Equipos", description: "Compra de paneles e inversores", status: "completed", amount: 45000, invoiceHash: "QmH9p...4tW1", txHash: "0x6a3c...e9b5", date: "2025-12-15" },
      { id: 3, title: "Instalación Fase 1", description: "Instalación en 4 comunidades", status: "in-progress", amount: 35000 },
      { id: 4, title: "Instalación Fase 2", description: "Instalación en las 4 comunidades restantes", status: "pending", amount: 35000 },
      { id: 5, title: "Capacitación Técnica", description: "Formación de técnicos locales", status: "pending", amount: 15000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectClimate, caption: "Primera micro-red operando en la comunidad de Paraisópolis", milestoneId: 2, date: "2026-01-02" },
    ],
  },
  {
    id: "health-ind-004",
    title: "Clínicas Móviles en India Rural",
    description: "Despliegue de unidades médicas móviles para atender a 20,000 personas en zonas sin acceso a hospitales.",
    longDescription: "En las regiones rurales de India, millones de personas caminan horas para recibir atención médica básica. Nuestras clínicas móviles llevan doctores, medicinas y diagnóstico directamente a sus comunidades.",
    category: "Salud",
    image: projectHealth,
    goalUSDC: 200000,
    raisedUSDC: 124000,
    executedUSDC: 90000,
    verified: true,
    orgName: "HealthBridge India",
    donors: 891,
    daysLeft: 35,
    milestones: [
      { id: 1, title: "Adquisición de Vehículos", description: "Compra y equipamiento de 3 unidades móviles", status: "completed", amount: 60000, invoiceHash: "QmK4r...6mS8", txHash: "0x2d5f...c4e1", date: "2025-08-30" },
      { id: 2, title: "Equipamiento Médico", description: "Instrumental y medicinas para 6 meses", status: "completed", amount: 30000, invoiceHash: "QmN7t...1pX4", txHash: "0x9b1a...f6d3", date: "2025-11-01" },
      { id: 3, title: "Contratación Personal", description: "6 doctores y 12 enfermeras", status: "in-progress", amount: 40000 },
      { id: 4, title: "Operaciones Q1 2026", description: "Primer trimestre de servicio activo", status: "pending", amount: 35000 },
      { id: 5, title: "Operaciones Q2 2026", description: "Segundo trimestre y evaluación de impacto", status: "pending", amount: 35000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectHealth, caption: "Clínica móvil atendiendo pacientes en Rajastán", milestoneId: 1, date: "2025-12-20" },
    ],
  },
  {
    id: "crisis-sy-005",
    title: "Ayuda de Emergencia - Refugiados Sirios",
    description: "Distribución de kits de supervivencia con alimentos, agua y medicinas para 3,000 familias desplazadas.",
    longDescription: "Miles de familias sirias siguen desplazadas y necesitan ayuda urgente. Este proyecto distribuye kits de supervivencia que incluyen alimentos para 30 días, agua potable, medicinas básicas y mantas térmicas.",
    category: "Emergencia",
    image: projectCrisis,
    goalUSDC: 80000,
    raisedUSDC: 71000,
    executedUSDC: 62000,
    verified: true,
    orgName: "Crisis Relief Network",
    donors: 1203,
    daysLeft: 12,
    milestones: [
      { id: 1, title: "Adquisición de Kits", description: "Compra de 3,000 kits de supervivencia", status: "completed", amount: 35000, invoiceHash: "QmW3s...5nT7", txHash: "0x5c8e...a2f9", date: "2025-10-25" },
      { id: 2, title: "Logística y Transporte", description: "Envío a puntos de distribución", status: "completed", amount: 15000, invoiceHash: "QmB6v...2kM9", txHash: "0x8d4b...c7e3", date: "2025-12-10" },
      { id: 3, title: "Distribución Fase 1", description: "Entrega a 1,500 familias", status: "completed", amount: 12000, invoiceHash: "QmF1x...9pQ4", txHash: "0x3a7f...d5b8", date: "2026-02-01" },
      { id: 4, title: "Distribución Fase 2", description: "Entrega a las 1,500 familias restantes", status: "in-progress", amount: 10000 },
    ],
    impactProofs: [
      { id: 1, type: "photo", url: projectCrisis, caption: "Voluntarios distribuyendo kits en el campo de refugiados", milestoneId: 3, date: "2026-02-05" },
    ],
  },
  {
    id: "edu-mx-006",
    title: "Bibliotecas Digitales en México",
    description: "Creación de 15 bibliotecas digitales comunitarias en zonas indígenas de Oaxaca con acceso gratuito a internet.",
    longDescription: "Las comunidades indígenas de Oaxaca tienen acceso limitado a información y educación. Este proyecto crea espacios comunitarios con computadoras, internet satelital y contenido educativo en lenguas originarias.",
    category: "Educación",
    image: projectEducation,
    goalUSDC: 60000,
    raisedUSDC: 23000,
    executedUSDC: 12000,
    verified: false,
    orgName: "BiblioTech MX",
    donors: 156,
    daysLeft: 90,
    milestones: [
      { id: 1, title: "Diagnóstico Comunitario", description: "Mapeo de necesidades en 15 comunidades", status: "completed", amount: 5000, invoiceHash: "QmJ5m...3rU2", txHash: "0x1f6d...b8c4", date: "2026-01-15" },
      { id: 2, title: "Equipamiento Tecnológico", description: "Compra de computadoras y antenas", status: "in-progress", amount: 25000 },
      { id: 3, title: "Instalación y Conectividad", description: "Montaje en las 15 comunidades", status: "pending", amount: 20000 },
      { id: 4, title: "Capacitación y Lanzamiento", description: "Formación de voluntarios locales", status: "pending", amount: 10000 },
    ],
    impactProofs: [],
  },
];
