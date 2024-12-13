
const mapa=document.getElementById('maparaderos');

const map = L.map(mapa).setView([14.61945, -90.49712], 13);

const rutaSelector=document.getElementById('paraderos');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const getData = async()=>{
    const responseParaderos = await fetch(URL,'./data/Paraderos_RUTA.json');
    const dataParaderos = await responseParaderos.json();
    paraderos = dataParaderos.features;

    const getLine = (nameLine) => paraderos.filter(paradero => paradero.properties.linea.includes(nameLine))

    const paraderosRUTA1 = getLine("linea 1");  
    const paraderosRUTA2 = getLine("linea 2");
    const paraderosRUTA3 = getLine("linea 3");

    rutaSelector.addEventListener('change', (e)=>{
        if(e.target.value = 'Ruta1'){
            L.geoJSON(paraderosRUTA1)
            .addTo(map)
        }
        else if(e.target.value='Ruta2'){
            L.geoJSON(paraderosRUTA2)
            .addTo(map)
        }
        else if(e.target.value='Ruta3'){
            L.geoJSON(paraderosRUTA3)
            .addTo(map)
        }
        else if(e.target.value='all'){
            L.geoJSON(paraderosRUTA1)
            .addTo(map)

            L.geoJSON(paraderosRUTA2)
            .addTo(map)

            L.geoJSON(paraderosRUTA3)
            .addTo(map)
        }
    })
}

getData();