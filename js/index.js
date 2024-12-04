function buscar() {
    let tarjetas = document.querySelector("#ConteinerCard");
    let busqueda = document.querySelector("#nPokemon").value;
    let contenedor = document.querySelector("body");

    if (busqueda >= 1) {
        let url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;
        var objXMLHttpRequest = new XMLHttpRequest();

        objXMLHttpRequest.onreadystatechange = function () {
            if (objXMLHttpRequest.readyState === 4) {
                if (objXMLHttpRequest.status === 200) {
                    let json = JSON.parse(objXMLHttpRequest.responseText);
                    let nombre = json.name;
                    let uriImg = json.sprites.other.home.front_default;

                    let tipos = json.types.map(t => t.type.name);
                    let tipoSeleccionado = tipos.length > 1
                        ? tipos[Math.floor(Math.random() * tipos.length)]
                        : tipos[0];

                    contenedor.className = ""; 
                    contenedor.classList.add(`Fondo${tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1)}`);

                    let html = `
                        <div style="display: flex; align-items: center; border: none;">
                            <div class="image-container" style="flex: 1; text-align: center;">
                                <img src="${uriImg}" class="card-img-top" alt="${nombre}">
                            </div>
                            <div class="card-body" style="flex: 2;">
                                <h5 class="card-title Tipo${tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1)}">${nombre} (#${json.id})</h5>
                                <p class="card-text Tipo${tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1)}">
                                    <strong>Tipo(s):</strong> ${tipos.join(", ")}<br>
                                    <strong>Altura:</strong> ${json.height / 10} m<br>
                                    <strong>Peso:</strong> ${json.weight / 10} kg<br>
                                    <strong>Habilidades:</strong> ${json.abilities.map(a => a.ability.name).join(", ")}<br>
                                    <strong>Experiencia Base:</strong> ${json.base_experience}
                                </p>
                            </div>
                        </div>`;
                    tarjetas.innerHTML = html;
                } else {
                    alert("Error Code: " + objXMLHttpRequest.status);
                    alert("Error Message: " + objXMLHttpRequest.statusText);
                }
            }
        };
        objXMLHttpRequest.open("GET", url);
        objXMLHttpRequest.send();
    } else {
        alert("Debe ingresar un número mayor o igual a 1 para obtener un Pokémon válido");
    }
}