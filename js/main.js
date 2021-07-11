const _ = require("underscore");
const moment = require("moment");

const formulario = document.querySelector('#formulario');
const contenido = document.querySelector('#contenido');
const diasDiv = document.querySelector('#dias');
const todayp = document.querySelector('#today');

// Fechas
const hoy = moment().format('ll');
const mañana = moment().add(1, 'days').format('dddd');
const pasadom = moment().add(2, 'days').format('dddd');
const pasadom2 = moment().add(3, 'days').format('dddd');


document.addEventListener('DOMContentLoaded', () => {
    todayp.textContent = hoy;
    formulario.addEventListener('submit', sendCityPerHour);
});


function conectarApiPorHoras(ciudad){

    const count = 5;
    const appId = '2c08e8b1b6fcbe8974c2c190ac49d00f';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&cnt=24&appid=${appId}`;

    //Mostramos un spinner

    // consultamos la api
    fetch(url)
            .then( response => {
                return response.json();
            })
            .then( data => {

                const {list, city } = data;
                
                const day1 =_.without(list, list[9],list[10],list[11],list[12],list[13],list[14],list[15],list[16],list[17],list[18],list[19],list[20],list[21],list[22],list[23],list[24]);
                const day2 =_.without(list, list[1],list[2],list[3],list[4],list[5],list[6],list[7],list[8],list[17],list[18],list[19],list[20],list[21],list[22],list[23],list[24]);
                const day3 =_.without(list, list[1],list[2],list[3],list[4],list[5],list[6],list[7],list[8],list[9],list[10],list[11],list[12],list[13],list[14],list[15],list[16]);

                // creaHtml(day1, day2, day3, city);
                creaHtml(data);
            });
}

function climaActual(ciudad){

    const appIdClima = '2c08e8b1b6fcbe8974c2c190ac49d00f';
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appIdClima}`;

    fetch(urlClima)
            .then(response => {
                return response.json();
            })
            .then( data => {
                console.log(data);
                const {  main: { temp } } = data;
                kelvinCentigrados(temp);
                diaActual(data);
            });
}




function sendCityPerHour(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;

    if(ciudad === ''){
        console.log('Debes introducir una ciudad válida');
        return;
    }

    conectarApiPorHoras(ciudad);
    climaActual(ciudad);
}

function creaHtml(dia1, dia2, dia3, ciudad ){

    while (dias.firstChild) {
        dias.removeChild(dias.firstChild);
    }
    console.log(hoy);
    
    const dia1Div = document.createElement('div');
    const dia2Div = document.createElement('div');
    const dia3Div = document.createElement('div');

    dia1Div.innerHTML = `
        <div class="py-4 mx-4">
            <a href="#contenido-hora" id="dia1" class="cursor-pointer">${mañana}</a> 
        </div>
    `;
    dia2Div.innerHTML = `
        <div class="py-4 mx-4">
            <a href="#contenido-hora" id="dia2" class="cursor-pointer">${pasadom}</a> 
        </div>
    `;
    dia3Div.innerHTML = `
        <div class="py-4 mx-4">
            <a href="#contenido-hora" id="dia3" class="cursor-pointer">${pasadom2}</a> 
        </div>
    `;
    

    dias.appendChild(dia1Div);
    dias.appendChild(dia2Div);
    dias.appendChild(dia3Div);

}

function diaActual(data){
    const {weather} = data;
    const weather2 = weather[0];
    const { description, icon, main } = weather2; // Como esta el clima
    console.log(icon);

    const { name, sys: { country}, main: { temp } } = data;
    const centigrados = kelvinCentigrados(temp); //Conversion a centigrados
    limpiarHtml();
    switch (description) {
        case 'clear sky':
            const card = document.createElement('div');
            card.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card); 
            break;
        case 'few clouds':
            const card2 = document.createElement('div');
            card2.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card2); 
            break;
        case 'scattered clouds':
            const card3 = document.createElement('div');
            card3.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card3); 
            break;
        case 'broken clouds':
            const card4 = document.createElement('div');
            card4.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card4); 
            break;
        case 'shower rain':
            const card5 = document.createElement('div');
            card5.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card5); 
            break;
        case 'rain':
            const card6 = document.createElement('div');
            card6.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card6); 
            break;
        case 'thunderstorm':
            const card7 = document.createElement('div');
            card7.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 m-0 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card7); 
            break;
        case 'snow':
            const card8 = document.createElement('div');
            card8.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 m-0 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card8); 
            break;
        case 'mist':
            const card9 = document.createElement('div');
            card9.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 m-0 mx-auto text-white">
            </div>
            </div>
            `;
            contenido.appendChild(card9);
            break;
        case 'overcast clouds':
            const card10 = document.createElement('div');
            card10.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 m-0 mx-auto text-white">
            </div>
            </div>
            `;
            contenido.appendChild(card10);
            creaHtml(); 
            break;
        default:    
            const card11 = document.createElement('div');
            card11.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize ">${ description }</p></div>
            </div>
            `;
            contenido.appendChild(card11);
            break;
    }
    formulario.reset();

}

function kelvinCentigrados(temp){
        return parseInt(temp - 273.15);
}

function limpiarHtml(){
    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild);
    }
}
