const container = document.getElementsByClassName("container")[0];
fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((res) => res.json())
    .then((datos) => {
        marketRates(datos);
    });

function marketRates(data) {
    data.forEach(({ casa }, i) => {
        if ([2, 5, 8].includes(i)) return;
        const divGobal = document.createElement("div");
        divGobal.classList.add("card");

        divGobal.appendChild(addHead(casa));
        divGobal.appendChild(addBody(casa));
        divGobal.appendChild(addFooter(casa));

        container.appendChild(divGobal);
    });
}

function addBuy(casa) {
    const divBuy = document.createElement("div");
    const divValue = document.createElement("div");

    divBuy.classList.add("buy");
    divValue.classList.add("value");

    divBuy.innerHTML = `<span>Compra</span>`;
    divValue.textContent = casa.compra;
    divBuy.appendChild(divValue);
    return divBuy;
}



function addHead(casa) {
    const divhead = document.createElement("div");
    divhead.classList.add("head", "card-header");

    const divTitle = document.createElement("div");
    const divIcon = document.createElement("div");
    divTitle.classList.add("title");
    divIcon.classList.add("icon");

    divTitle.textContent = casa.nombre;

    divhead.appendChild(divTitle);
    divhead.appendChild(divIcon);
    return divhead;
}

function addBody(casa) {
    const divBody = document.createElement("div");
    const divSale = addSale(casa);
    divBody.classList.add("card-body");
    casa.compra != "No Cotiza" ?
        divBody.appendChild(addBuy(casa)) :
        (divSale.style.margin = 0);
    divBody.appendChild(divSale);
    return divBody;
}

function addSale(casa) {
    const divSale = document.createElement("div");
    const divValue2 = document.createElement("div");
    divSale.classList.add("sale");
    divValue2.classList.add("value");

    divSale.innerHTML = `<span>Venta</span>`;
    divValue2.textContent = casa.venta;
    divSale.appendChild(divValue2);
    return divSale;
}

function addFooter(casa) {
    const divFooter = document.createElement("div");
    divFooter.classList.add("footer");
    const divDate = document.createElement("div");
    divFooter.appendChild(variation(casa))
    divDate.textContent = "Actualizado: " + new Date().toLocaleString();
    divDate.classList.add("card-footer", "text-muted");
    divFooter.appendChild(divDate);
    return divFooter;
}

function variation(casa) {
    const divContent = document.createElement("div")
    console.log(casa.variacion > 0);
    if (casa.variacion != undefined) {
        divContent.innerHTML =
            (casa.variacion[0] == "-") ?
            `<img src = "img/caret-down-fill.svg" alt=""/> <spam>VARIACIÓN </spam> ${casa.variacion}` :
            `<img src = "img/caret-up-fill.svg" alt=""/>  <spam>VARIACIÓN +</spam> ${casa.variacion}`;
    }
    return divContent
}