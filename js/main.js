import { _ } from '/home/david/.cache/typescript/4.3/node_modules/@types/underscore/index';
import { moment } from '/home/david/weather-app/node_modules/moment/ts3.1-typings/moment';

const formulario = document.querySelector('#formulario');
const contenido = document.querySelector('#contenido');
const diasDiv = document.querySelector('#dias');
const todayp = document.querySelector('#today');
const contenidoHora = document.querySelector('#contenido-hora');

// Fechas
const hoy = moment().format('ll');
const mañana = moment().add(1, 'days').format('MMM Do YY');
const pasadom = moment().add(2, 'days').format('MMM Do YY');
const pasadom2 = moment().add(3, 'days').format('MMM Do YY');


document.addEventListener('DOMContentLoaded', () => {
    todayp.textContent = hoy;
    formulario.addEventListener('submit', sendCityPerHour);

});


function conectarApiPorHoras(ciudad){

    const appId = '2c08e8b1b6fcbe8974c2c190ac49d00f';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&cnt=18&appid=${appId}`;

    //Mostramos un spinner

    // consultamos la api
    fetch(url)
            .then( response => {
                return response.json();
            })
            .then( data => {
                mostrarHoras(data);
            });
}

function climaActual(ciudad){

    const appIdClima = '2c08e8b1b6fcbe8974c2c190ac49d00f';
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appIdClima}`;
    spinner();
    setTimeout(() => {
        fetch(urlClima)
            .then(response => {
                return response.json();
            })
            .then( data => {

                if (data.cod === "404") {
                    alerta(`No se encontro una ciudad con el nombre: ${ciudad}`);
                    return;
                }
                const {  main: { temp } } = data;
                kelvinCentigrados(temp);
                diaActual(data);
            }).catch(err => {
                console.log(err);
            });
    }, 1700);
    
}

function sendCityPerHour(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;

    if(ciudad === ''){
        alerta('Debes introducir una ciudad válida.');
        return;
    }

    conectarApiPorHoras(ciudad);
    climaActual(ciudad);
}


function mostrarHoras(data){

    const {list} = data;
    while (contenidoHora.firstChild) {
        contenidoHora.removeChild(contenidoHora.firstChild);
    }

    list.forEach(( {weather, dt_txt}) => {
        const clima = weather[0];
        const { description, icon } = clima; 
        const horaDiv = document.createElement('div');
        horaDiv.innerHTML = `
        <div class="mx-4 text-xs text-center">
            <p class="">${dt_txt}</p>
            <p class="capitalize">${description}</p>
        </div>
        `;
        switch (description) {
            case 'light rain':
                const img = document.createElement('img');
                    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img);
                break;
            case 'clear sky':
                const img2 = document.createElement('img');
                    img2.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img2.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img2);
                break;
            case 'few clouds':
                const img3 = document.createElement('img');
                    img3.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img3.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img3);
                break;
            case 'scattered clouds':
                const img4 = document.createElement('img');
                    img4.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img4.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img4);
                break;
            case 'broken clouds':
                const img5 = document.createElement('img');
                    img5.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img5.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img5);
                break;
            case 'shower rain':
                const img6 = document.createElement('img');
                    img6.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img6.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img6);
                break;
            case 'overcast clouds':
                const img7 = document.createElement('img');
                    img7.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img7.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img7);
                break;
            case 'rain':
                const img8 = document.createElement('img');
                    img8.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img8.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img8);
                break;
            case 'thunderstorm':
                const img9 = document.createElement('img');
                    img9.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img9.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img9);
                break;
            case 'snow':
                const img10 = document.createElement('img');
                    img10.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img10.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img10);
                break;
            case 'mist':
                const img11 = document.createElement('img');
                    img11.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img11.classList.add('w-20', 'h-20', 'mx-auto');
                    horaDiv.appendChild(img11);
                break;
            case 'moderate rain':
            const img12 = document.createElement('img');
                img12.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                img12.classList.add('w-20', 'h-20', 'mx-auto');
                horaDiv.appendChild(img12);
                break;
            default:
                const img13 = document.createElement('img');
                    img13.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    img13.alt = 'Unavailable';
                    horaDiv.appendChild(img13);
                break;
        }
        contenidoHora.appendChild(horaDiv);    
    });
        
}


function diaActual(data){
    const {weather} = data;
    const weather2 = weather[0];
    const { description, icon, main } = weather2; // Como esta el clima

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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card); 
            break;
        case 'haze':
            const card13 = document.createElement('div');
            card13.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
            </div>
            </div>
            `;
            contenido.appendChild(card13); 
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 mx-auto">
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
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
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 m-0 mx-auto text-white">
            </div>
            </div>
            `;
            contenido.appendChild(card10);
            break;
        case 'light rain':
            const card12 = document.createElement('div');
            card12.innerHTML = `
            <div class="">
            <div>
                <h2 class="text-3xl mb-2" style="color: #111827;">${ name }, ${country }</h2>
                <p class="text-7xl">${ centigrados }&#8451;</p>
            </div>
            <div class="pt-10">
                <p class="capitalize text-3xl opacity-70" style="color: #111827;">${ description }</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="h-28 w-28 m-0 mx-auto text-white">
            </div>
            </div>
            `;
            contenido.appendChild(card12);
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
                <p class="capitalize opacity-70" style="color: #111827;">${ description }</p></div>
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

function alerta(mensaje){
    limpiarHtml();
    const alertExist = document.querySelector('.text-red-700');

    if (!alertExist) {
        const divAlerta = document.createElement('div');
    divAlerta.classList.add('py-2', 'px-4', 'text-red-800','border','border-red-800', 'text-xl', 'bg-red-400', 'text-center', 'rounded');
    divAlerta.textContent = mensaje;

    contenido.appendChild(divAlerta);

    setTimeout(() => {
        divAlerta.remove();
    }, 3000);
    }
}

function spinner(){

    limpiarHtml();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('lds-spinner');

    divSpinner.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    `;

    contenido.appendChild(divSpinner);
}
