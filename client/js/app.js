
// 1. Configuración de Tailwind (Necesaria para el CDN)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                gs: {
                    blue: '#003366',
                    light: '#004c99'
                }
            }
        }
    }
}

// 2. Lógica de la Aplicación
let apsData = [];

// Función para abrir/cerrar sidebar en móvil
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar.classList.contains('-translate-x-full')) {
        // Abrir
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    } else {
        // Cerrar
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

// Inicialización
async function init() {
    try {
        const res = await fetch('/api/accesspoints');
        if (!res.ok) throw new Error('API Error');
        apsData = await res.json();

        apsData.sort((a, b) => {
        // 1. Quitamos las letras ("GWN", "LR", "E") y dejamos solo números
        const numA = parseInt(a.model.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.model.replace(/\D/g, '')) || 0;
        
        // 2. Restamos B - A para orden descendente (El número mayor primero)
        return numB - numA;
        });

        render(apsData);
    } catch (error) {
        console.log("Usando datos de ejemplo (API no encontrada)");
        // Datos de fallback
        apsData = [
            { model: 'GWN7664', technology: 'Wi-Fi 6', category: 'interior', throughput: '3.55Gbps', clients: 512, coverage: 175, antennas: '4x4:4', ports: ['1G', '2.5G'], psePorts: 0, description: 'High-performance Wi-Fi 6 access point.', imageUrl: 'https://via.placeholder.com/300' },
            { model: 'GWN7660', technology: 'Wi-Fi 6', category: 'interior', throughput: '1.77Gbps', clients: 256, coverage: 175, antennas: '2x2:2', ports: ['1G', '1G'], psePorts: 0, description: 'Enterprise-grade Wi-Fi 6 access point.', imageUrl: 'https://via.placeholder.com/300' },
            { model: 'GWN7605', technology: 'Wi-Fi 5', category: 'interior', throughput: '1.27Gbps', clients: 100, coverage: 165, antennas: '2x2:2', ports: ['1G', '1G'], psePorts: 0, description: 'Affordable 802.11ac Wave-2 access point.', imageUrl: 'https://via.placeholder.com/300' }
        ];
        render(apsData);
    }
}

// Helpers
function groupPorts(portsArray) {
    if (!portsArray || portsArray.length === 0) return {};
    const counts = {};
    portsArray.forEach(p => counts[p] = (counts[p] || 0) + 1);
    return counts; 
}

function getGbps(str) {
    if(!str) return 0;
    const match = str.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
}

function parseMimo(fullString, bandType) {
    if (!fullString) return 0;
    const s = fullString.toLowerCase();
    if (s.includes('&')) return parseInt(s.charAt(0)) || 0;
    if (s.includes('+')) {
        const parts = s.split('+');
        const relevantPart = parts.find(part => {
            if (bandType === '5g') return part.includes('5ghz') || part.includes('5/6');
            if (bandType === '2.4g') return part.includes('2.4');
            return false;
        });
        if (relevantPart) return parseInt(relevantPart.trim().charAt(0)) || 0;
    }
    return parseInt(s.charAt(0)) || 0;
}

// Renderizado
function render(items) {
    const container = document.getElementById('lista-aps');
    const contador = document.getElementById('contador');
    const contadorMobile = document.getElementById('contador-mobile');
    
    if(contador) contador.innerText = items.length;
    if(contadorMobile) contadorMobile.innerText = items.length;
    
    if(items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full bg-white p-12 rounded-xl border-2 border-dashed border-gray-200 text-center">
                <p class="text-gray-500 font-bold text-lg">No Results</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gs-blue text-white text-sm font-bold rounded hover:bg-gs-light transition">Reset Filters</button>
            </div>`;
        return;
    }

    container.innerHTML = items.map(ap => {
        const isWifi7 = ap.technology && ap.technology.includes('7');
        const isWifi6 = ap.technology && ap.technology.includes('6');
        const isOutdoor = ap.category.toLowerCase().includes('exterior') || ap.category.toLowerCase().includes('outdoor');
        const isPtp = ap.category.toLowerCase().includes('ptp') || ap.category.toLowerCase().includes('bridge');
        
        let badgeClass = isWifi7 ? 'bg-purple-100 text-purple-700 border-purple-200' : (isWifi6 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-50 text-blue-600 border-blue-100');
        
        // Lógica de visualización (Badge y Botones)
        const datasheetLink = ap.datasheet || '#';
        const datasheetTarget = ap.datasheet ? '_blank' : '_self';
        const btnStyle = ap.datasheet ? 'text-gs-blue hover:bg-gs-blue hover:text-white border-gs-blue' : 'text-gray-300 border-gray-200 cursor-not-allowed';

        let envBadge = '', envText = 'INDOOR AP';
        if (isPtp) {
            envBadge = '<span class="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded bg-orange-600/90 text-white flex items-center gap-1.5 backdrop-blur-sm shadow-sm">PTP BRIDGE</span>';
            envText = 'LONG RANGE BRIDGE';
        } else if (isOutdoor) {
            envBadge = '<span class="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded bg-slate-800/90 text-white flex items-center gap-1.5 backdrop-blur-sm">OUTDOOR</span>';
            envText = 'OUTDOOR AP';
        }

        const portGroups = groupPorts(ap.ports);
        const portsHtml = Object.entries(portGroups).map(([type, count]) => {
            let color = type.includes('10G') ? 'bg-purple-50 text-purple-700 border-purple-100 font-bold' : (type.includes('2.5G') ? 'bg-blue-50 text-blue-700 border-blue-100 font-semibold' : 'bg-white text-gray-600 border-gray-200');
            return `<span class="px-2.5 py-0.5 border rounded text-[10px] font-mono whitespace-nowrap ${color}">${type} <span class="ml-0.5 font-extrabold text-black/50">x${count}</span></span>`;
        }).join('');

        let pseHtml = '';
        if (ap.psePorts && ap.psePorts > 0) {
            pseHtml = `
            <div class="col-span-2 mt-2 pt-2 border-t border-orange-100 flex items-center justify-between bg-orange-50/50 p-2 rounded">
                <div class="flex items-center gap-1.5 text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[10px] font-bold uppercase tracking-wider">PSE Enabled</span>
                </div>
                <div class="text-[10px] font-mono text-gray-700 text-right leading-tight">
                    <span class="block font-bold">${ap.psePorts} Port${ap.psePorts > 1 ? 's' : ''} Out</span>
                    <span class="block text-orange-600 font-semibold">Max ${ap.psePower || 'N/A'}</span>
                </div>
            </div>`;
        }

        return `
        <div class="bg-white rounded-xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group h-full">
            <div class="relative h-48 md:h-56 p-6 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center group-hover:from-white transition-colors">
                <span class="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full border shadow-sm ${badgeClass} uppercase tracking-wider">${ap.technology || 'Wi-Fi'}</span>
                ${envBadge}
                <img src="${ap.imageUrl}" alt="${ap.model}" class="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 drop-shadow-sm">
            </div>
            <div class="p-5 md:p-6 flex-1 flex flex-col">
                <div class="mb-3">
                    <span class="text-[10px] font-bold text-gs-light uppercase tracking-[0.15em]">${envText}</span>
                    <h3 class="text-xl md:text-2xl font-bold text-slate-800 leading-tight mt-1 group-hover:text-gs-blue transition-colors">${ap.model}</h3>
                </div>
                <p class="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed min-h-[4.5em]">${ap.description}</p>
                <div class="bg-slate-50/80 rounded-lg border border-slate-100 p-4 grid grid-cols-2 gap-y-4 gap-x-4 text-xs mb-5 mt-auto backdrop-blur-sm">
                    <div class="flex flex-col"><span class="text-gray-400 uppercase font-bold text-[9px] tracking-wider mb-1">Throughput</span><span class="font-bold text-slate-700 text-sm">${ap.throughput}</span></div>
                    <div class="flex flex-col"><span class="text-gray-400 uppercase font-bold text-[9px] tracking-wider mb-1">Clients</span><span class="font-bold text-slate-700 text-sm">${ap.clients}+</span></div>
                    <div class="col-span-2 flex flex-col border-t border-slate-200/50 pt-3"><span class="text-gray-400 uppercase font-bold text-[9px] tracking-wider mb-1.5">Ports</span><div class="flex gap-1.5 flex-wrap">${portsHtml}</div></div>
                    <div class="flex flex-col border-t border-slate-200/50 pt-3"><span class="text-gray-400 uppercase font-bold text-[9px] tracking-wider mb-1">Antenas</span><span class="font-semibold text-slate-700 leading-tight text-[10px]">${ap.antennas || ap.mimo || '-'}</span></div>
                    <div class="flex flex-col border-t border-slate-200/50 pt-3"><span class="text-gray-400 uppercase font-bold text-[9px] tracking-wider mb-1">Range</span><span class="font-semibold text-slate-700">${ap.coverage} m</span></div>
                    ${pseHtml}
                </div>
                <div class="mt-auto pt-4 border-t border-gray-50">
                     <a href="${datasheetLink}" target="${datasheetTarget}" class="block w-full py-2 text-xs font-bold border rounded text-center transition-colors uppercase tracking-wider ${btnStyle}">${ap.datasheet ? 'DATASHEET' : 'NO LINK'}</a>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Filtros
function filtrar() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase().trim();
    const catVal = document.querySelector('input[name="cat"]:checked').value;
    const techVal = document.querySelector('input[name="tech"]:checked').value;
    
    const speedMin = parseFloat(document.getElementById('speed').value);
    const clientsMin = parseInt(document.getElementById('clients').value);
    const coverageMin = parseInt(document.getElementById('coverage').value);
    
    const selectedPorts = Array.from(document.querySelectorAll('.ports-check:checked')).map(cb => cb.value);
    const pseOnly = document.getElementById('pseCheck').checked;
    
    const mimo5Val = document.getElementById('mimo5').value;
    const mimo24Val = document.getElementById('mimo24').value;

    const filtered = apsData.filter(ap => {
        const matchText = ap.model.toLowerCase().includes(busqueda) || (ap.description && ap.description.toLowerCase().includes(busqueda));
        
        const isOutdoor = ap.category.toLowerCase().includes('exterior') || ap.category.toLowerCase().includes('outdoor');
        const isPtp = ap.category.toLowerCase().includes('ptp') || ap.category.toLowerCase().includes('bridge');
        let matchCat = (catVal === 'all') || (catVal === 'ptp' && isPtp) || (catVal === 'exterior' && isOutdoor && !isPtp) || (catVal === 'interior' && !isOutdoor && !isPtp);

        const matchTech = (techVal === 'all') || (ap.technology && ap.technology.includes(techVal));
        const matchSpeed = getGbps(ap.throughput) >= speedMin;
        const matchClients = (ap.clients || 0) >= clientsMin;
        const matchCoverage = (ap.coverage || 0) >= coverageMin;
        const matchPorts = selectedPorts.length === 0 || selectedPorts.some(port => ap.ports && ap.ports.includes(port));
        
        let matchPse = true;
        if (pseOnly) matchPse = (ap.psePorts && ap.psePorts > 0);

        const antennaString = ap.antennas || ap.mimo || "";
        let matchMimo5 = (mimo5Val === 'all') || (parseMimo(antennaString, '5g') === parseInt(mimo5Val));
        let matchMimo24 = (mimo24Val === 'all') || (parseMimo(antennaString, '2.4g') === parseInt(mimo24Val));

        return matchText && matchCat && matchTech && matchSpeed && matchClients && matchCoverage && matchPorts && matchPse && matchMimo5 && matchMimo24;
    });

    render(filtered);
}

// Iniciar aplicación al cargar
document.addEventListener('DOMContentLoaded', init);