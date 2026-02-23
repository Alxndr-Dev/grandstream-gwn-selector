const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AccessPoint = require('./models/accesspoints');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const accessPoints = [
  // ==========================================
  //         INDOOR WI-FI 6 (AX)
  // ==========================================
  {
    model: "GWN7660",
    category: "Interior",
    technology: "Wi-Fi 6",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [36, 40, 44, 48, 149, 153, 157, 161],
    clients: 256,
    coverage: 175,
    ports: ["Gigabit", "Gigabit"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "1.77 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7662/GWN7662_thumbnail.png",
    description: "Efficient enterprise-grade 802.11ax Wi-Fi 6 access point with 2x2:2 MIMO.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7660/Datasheet_GWN7660_English.pdf"
  },
  {
    model: "GWN7664",
    category: "Interior",
    technology: "Wi-Fi 6",
    antennas: "4x4:4 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [36, 40, 42, 44, 46, 48, 149, 153, 157],
    clients: 750,
    coverage: 175,
    ports: ["Gigabit", "2.5G"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "3.55 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7662/GWN7662_thumbnail.png",
    description: "High-performance Wi-Fi 6 AP with 4x4:4 MU-MIMO and 2.5G Port.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7664/Datasheet_GWN7664_English.pdf"
  },
  {
    model: "GWN7664E",
    category: "Indoor",
    technology: "Wi-Fi 6",
    antennas: "4x4:4 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 512,
    coverage: 175,
    ports: ["2.5G", "2.5G"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "6 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7660E%20web%20image-1.png",
    description: "High-Performance AX6000 Wi-Fi 6 Access Point with dual 2.5G ports.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7664E/Datasheet_GWN7664E_English.pdf"
  },
  {
    model: "GWN7662",
    category: "Indoor",
    technology: "Wi-Fi 6",
    antennas: "4x4:4 (5GHz), 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 175,
    ports: ["Gigabit", "2.5G"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "5.38 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7662/GWN7662_thumbnail.png",
    description: "Wi-Fi 6 Access Point with 5.38Gbps throughput.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7662/Datasheet_GWN7662_English.pdf"
  },
  {
    model: "GWN7660E",
    category: "Indoor",
    technology: "Wi-Fi 6",
    antennas: "3x3:2 (5GHz), 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 175,
    ports: ["Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "3 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7660E%20web%20image-1.png",
    description: "AX3000 Wi-Fi 6 Access Point with XTRA Range technology.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7660E/Datasheet_GWN7660E_English.pdf"
  },
  {
    model: "GWN7660EM",
    category: "Indoor",
    technology: "Wi-Fi 6",
    antennas: "3x3:2 (5GHz), 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 128,
    coverage: 120,
    ports: ["Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "3 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7660EM_6.png",
    description: "Wi-Fi 6 Extender and Access Point with Mesh support.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7660EM/Datasheet_GWN7660EM_English_12.4.2025%20v1.6.pdf"
  },

  // ==========================================
  //         WI-FI 6E (TRI-BAND)
  // ==========================================
  {
    model: "GWN7665",
    category: "Interior",
    technology: "Wi-Fi 6E",
    antennas: "2x2:2 (2.4GHz, 5GHz & 6GHz)",
    bands: ["2.4GHz", "5GHz", "6GHz"],
    channels: [36, 40, 48, 100, 104, 193, 197],
    clients: 384,
    coverage: 175,
    ports: ["Gigabit", "2.5G"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "5.4 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7665_Main%20Page%20Image.png",
    description: "Tri-Band Wi-Fi 6E Access Point for high-density congestion-free networks.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7665/Datasheet_GWN7665_English.pdf"
  },

  // ==========================================
  //         WI-FI 7 (BE)
  // ==========================================
  {
    model: "GWN7674",
    category: "Interior",
    technology: "Wi-Fi 7",
    antennas: "4x4:4 (5/6GHz) + 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz", "6GHz"],
    channels: [36, 40, 48, 100, 149, 1, 6, 11, 37, 53, 69],
    clients: 768,
    coverage: 175,
    ports: ["10G", "2.5G"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "21 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7674_1.png",
    description: "Flagship Wi-Fi 7 Tri-Band AP with 10 Gigabit networking.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7674/Datasheet_GWN7674_English.pdf"
  },
  {
    model: "GWN7672",
    category: "Indoor",
    technology: "Wi-Fi 7",
    antennas: "2x2:2 (2.4GHz), 2x2:2 (5GHz), 2x2:2 (6GHz)",
    bands: ["2.4GHz", "5GHz", "6GHz"],
    channels: [], 
    clients: 384,
    coverage: 175,
    // Estandarizado para coincidir con tu app
    ports: ["5G", "5G"], 
    psePorts: 0,
    psePower: null,
    throughput: "11 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7672_2-1.png",
    description: "Enterprise-grade Wi-Fi 7 access point with tri-band 2x2:2 MIMO and support for 6GHz.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7672/Datasheet_GWN7672_English.pdf"
  },
  {
    model: "GWN7670",
    category: "Indoor",
    technology: "Wi-Fi 7",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 175,
    ports: ["2.5G", "2.5G"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "3.6 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7670_2.png",
    description: "Enterprise-grade 2x2 Wi-Fi 7 Access Point.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7670/Datasheet_GWN7670_English.pdf"
  },

  // ==========================================
  //         OUTDOOR / LONG RANGE
  // ==========================================
  // NUEVO MODELO AÑADIDO: GWN7605CLR
  {
    model: "GWN7605CLR",
    category: "Exterior",
    technology: "Wi-Fi 5",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 100,
    coverage: 150,
    ports: ["Gigabit", "Gigabit"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "1.27 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7605CLR_1.png", // Imagen referencial cilíndrica
    description: "Outdoor cylindrical long-range Wi-Fi 5 access point designed for sleek installations.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7605CLR/Datasheet_GWN7605CLR_English.pdf"
  },
  {
    model: "GWN7630LR",
    category: "Exterior",
    technology: "Wi-Fi 5",
    antennas: "4x4:4 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [36, 40, 44, 48, 149, 153, 157, 161, 165],
    clients: 200,
    coverage: 300,
    ports: ["Gigabit", "Gigabit"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "2.33 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7630LR_antenna.png",
    description: "High-performance 4x4:4 outdoor long-range access point.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/Datasheet_GWN7630LR_English.pdf"
  },
  {
    model: "GWN7605LR",
    category: "Exterior",
    technology: "Wi-Fi 5",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [36, 40, 44, 48],
    clients: 100,
    coverage: 250,
    ports: ["Gigabit", "Gigabit"], 
    psePorts: 0,
    psePower: "0W",
    throughput: "1.27 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7605LR_antennas.png",
    description: "Outdoor long-range Wi-Fi access point tailored for extended coverage.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/Datasheet_GWN7605LR_English.pdf"
  },
  {
    model: "GWN7670LR",
    category: "Outdoor Long-Range",
    technology: "Wi-Fi 7",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 350,
    ports: ["2.5G", "2.5G"], // Estandarizado (SFP removido para que el filtro lo atrape)
    psePorts: 0,
    psePower: null,
    throughput: "3.6 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7670LR_1-1.png",
    description: "Long-Range Wi-Fi 7 Access Point for outdoor links.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7670LR/Datasheet_GWN7670LR_English.pdf"
  },
  {
    model: "GWN7664ELR",
    category: "Outdoor Long-Range",
    technology: "Wi-Fi 6",
    antennas: "4x4:4 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 512,
    coverage: 300,
    ports: ["2.5G", "2.5G"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "6 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7664ELR_1.png",
    description: "High-Performance Outdoor Long-Range Wi-Fi 6 Access Point.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7664ELR/Datasheet_GWN7664ELR_English.pdf"
  },
  {
    model: "GWN7664LR",
    category: "Outdoor Long-Range",
    technology: "Wi-Fi 6",
    antennas: "4x4:4 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 750,
    coverage: 300,
    ports: ["Gigabit", "2.5G"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "3.55 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/gwn7664lr_wifi6_thumbnail.png",
    description: "Outdoor Long-Range Wi-Fi 6 Access Point with high throughput.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7664LR/Datasheet_GWN7664LR_English.pdf"
  },
  {
    model: "GWN7660ELR",
    category: "Outdoor Long-Range",
    technology: "Wi-Fi 6",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 300,
    ports: ["Gigabit", "2.5G"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "3 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN7660ELR/GWN7660ELR-1-wifi6.png",
    description: "Long-Range Wi-Fi 6 Access Point for outdoor environments.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7660ELR/Datasheet_GWN7660ELR_English.pdf"
  },
  {
    model: "GWN7660LR",
    category: "Outdoor Long-Range",
    technology: "Wi-Fi 6",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 500,
    coverage: 250,
    ports: ["Gigabit", "Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "1.77 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN7660LR/gwn7660lr_wifi6_thumbnail3.png",
    description: "Weatherproof Long-Range Wi-Fi 6 Access Point.",
    datasheet : "https://www.grandstream.com/hubfs/Product_Documentation/GWN7660LR/Datasheet_GWN7660LR_English.pdf"
  },

  // ==========================================
  //         IN-WALL / HOSPITALITY
  // ==========================================
  {
    model: "GWN7670WM",
    category: "In-Wall",
    technology: "Wi-Fi 7",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 175,
    ports: ["2.5G", "Gigabit", "Gigabit", "Gigabit"], // Estandarizado
    psePorts: 0,
    psePower: null,
    throughput: "3.6 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7670WM_1-1.png",
    description: "In-Wall Wi-Fi 7 Access Point with 2.5G port and ultra-thin design.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7670WM/Datasheet_GWN7670WM_English.pdf"
  },
  {
    model: "GWN7661E",
    category: "In-Wall",
    technology: "Wi-Fi 6",
    antennas: "3x3:2 (5GHz), 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 100,
    ports: ["Gigabit", "Gigabit", "Gigabit", "Gigabit"],
    psePorts: 2,
    psePower: "12W",
    throughput: "3 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7661/GWN7661_thumbnail.png",
    description: "In-Wall Wi-Fi 6 Access Point with 3Gbps throughput and PSE output.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7661E/Datasheet_GWN7661E_English.pdf"
  },
  {
    model: "GWN7661",
    category: "In-Wall",
    technology: "Wi-Fi 6",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 500,
    coverage: 100,
    ports: ["Gigabit", "Gigabit", "Gigabit", "Gigabit"],
    psePorts: 2,
    psePower: "6W",
    throughput: "1.77 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7661/GWN7661_thumbnail.png",
    description: "In-Wall Wi-Fi 6 Access Point designed for hotels and apartments.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7661/Datasheet_GWN7661_English.pdf"
  },
  {
    model: "GWN7624",
    category: "In-Wall",
    technology: "Wi-Fi 5",
    antennas: "4x4:4 (5GHz), 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 200,
    coverage: 100,
    ports: ["Gigabit", "Gigabit", "Gigabit", "Gigabit"],
    psePorts: 2,
    psePower: "6W",
    throughput: "2.03 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7624%20WEBSITE%20image.png",
    description: "In-Wall 802.11ac Wave-2 Wi-Fi Access Point with PSE.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7624/Datasheet_GWN7624_English.pdf"
  },
  {
    model: "GWN7603",
    category: "Interior",
    technology: "Wi-Fi 5",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [36, 40, 44, 48],
    clients: 80,
    coverage: 100,
    ports: ["Gigabit", "Gigabit", "Gigabit", "Gigabit"], 
    psePorts: 1, 
    psePower: "6W",
    throughput: "1.18 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN%20Ready%20Made%20Campaign/GWN%20Buyers%20Guide%20Campaign/Links/GWN7602_front-1-1.png",
    description: "Compact AP with integrated 4-port Gigabit switch and PSE output.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7603/Datasheet_GWN7603_English.pdf"
  },
  {
    model: "GWN7604",
    category: "Indoor", 
    technology: "Wi-Fi 5",
    antennas: "2x2:2 (2.4GHz), 3x3:2 (5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 256,
    coverage: 100,
    ports: ["Gigabit", "Gigabit", "Gigabit", "Gigabit"],
    psePorts: 2,
    psePower: "12W",
    throughput: "1.18 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7604_Webpage%202.png",
    description: "Compact Wi-Fi Access Point with 4 Gigabit ports and PSE.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7604/Datasheet_GWN7604_English.pdf"
  },

  // ==========================================
  //         INDOOR WI-FI 5 (WAVE 2)
  // ==========================================
  {
    model: "GWN7630",
    category: "Indoor",
    technology: "Wi-Fi 5",
    antennas: "4x4:4 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 200,
    coverage: 175,
    ports: ["Gigabit", "Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "2.33 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Social%20Media%20Assets%20Global/Social%20Meta%20Images/Grandstream%20Website%20Meta%20Images/GWN7630%20Meta%20Image.png",
    description: "High-Performance 4x4:4 802.11ac Wave-2 Wi-Fi Access Point.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/datasheet_gwn7630_english.pdf"
  },
  {
    model: "GWN7625",
    category: "Indoor",
    technology: "Wi-Fi 5",
    antennas: "4x4:4 (5GHz), 2x2:2 (2.4GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 200,
    coverage: 165,
    ports: ["Gigabit", "Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "2.03 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7615_front.png",
    description: "802.11ac Wave-2 Wi-Fi Access Point for medium user density.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7625/Datasheet_GWN7625_English.pdf"
  },
  {
    model: "GWN7615",
    category: "Indoor",
    technology: "Wi-Fi 5",
    antennas: "3x3:3 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 200,
    coverage: 175,
    ports: ["Gigabit", "Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "1.75 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Product%20Images/GWN/GWN7615_front.png",
    description: "Enterprise Performance 802.11ac Wave-2 Wi-Fi Access Point.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/Datasheet_GWN7615_English.pdf"
  },
  {
    model: "GWN7605",
    category: "Indoor",
    technology: "Wi-Fi 5",
    antennas: "2x2:2 (2.4GHz & 5GHz)",
    bands: ["2.4GHz", "5GHz"],
    channels: [],
    clients: 100,
    coverage: 165,
    ports: ["Gigabit", "Gigabit"],
    psePorts: 0,
    psePower: null,
    throughput: "1.27 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/Social%20Media%20Assets%20Global/Social%20Meta%20Images/Grandstream%20Website%20Meta%20Images/GWN7630%20Meta%20Image.png",
    description: "Affordable 802.11ac Wave-2 Wi-Fi Access Point.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/Datasheet_GWN7605_English.pdf"
  },

  // ==========================================
  //         POINT TO POINT (PTP)
  // ==========================================
  {
    model: "GWN7302",
    category: "PTP",
    technology: "Wi-Fi 6",
    antennas: "2x2:2 (5GHz)",
    bands: ["5GHz"],
    channels: [149, 153, 157, 161, 165],
    clients: 128,
    coverage: 5000,
    ports: ["Gigabit", "Gigabit"], 
    psePorts: 1, 
    psePower: "25W", 
    throughput: "2.4 Gbps",
    imageUrl: "https://www.grandstream.com/hubfs/GWN7302_1-1.png",
    description: "Long-Range Wi-Fi 6 Bridge (PtP/PtMP) for outdoor links up to 5km.",
    datasheet: "https://www.grandstream.com/hubfs/Product_Documentation/GWN7302/Datasheet_GWN7302_English.pdf"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB Atlas...");
    
    // Limpieza
    await AccessPoint.deleteMany({});
    console.log("Colección limpiada.");

    // Carga
    await AccessPoint.insertMany(accessPoints);
    console.log(`Base de datos GWN cargada con éxito! (${accessPoints.length} equipos)`);
    
    process.exit();
  } catch (err) {
    console.error("Error al cargar a la DB:", err);
    process.exit(1);
  }
};

seedDB();