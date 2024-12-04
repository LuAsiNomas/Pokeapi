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

                    let tipos = json.types.map(t => t.type.name).join(", "); //tipo
                    let habilidades = json.abilities.map(a => a.ability.name).join(", "); //habilidades
                    let altura = json.height / 10; // metros
                    let peso = json.weight / 10; //kilos
                    let experiencia = json.base_experience;

                    let tipoSeleccionado = tipos.split(", ")[Math.floor(Math.random() * tipos.split(", ").length)]; //separa tipos
                    contenedor.className = "";
                    contenedor.classList.add(`Fondo${tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1)}`); //selecciona tipo

                    let html = `
                        <div style="width: 18rem;">
                            <img src="${uriImg}" class="card-img-top" alt="${nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${nombre} (#${json.id})</h5>
                                <p class="card-text">
                                    <strong>Tipo(s):</strong> ${tipos}<br>
                                    <strong>Altura:</strong> ${altura} m<br>
                                    <strong>Peso:</strong> ${peso} kg<br>
                                    <strong>Habilidades:</strong> ${habilidades}<br>
                                    <strong>Experiencia Base:</strong> ${experiencia}
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