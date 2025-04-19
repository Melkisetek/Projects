"use strict";
const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
menu === null || menu === void 0 ? void 0 : menu.addEventListener("click", () => {
    barraLateral === null || barraLateral === void 0 ? void 0 : barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral === null || barraLateral === void 0 ? void 0 : barraLateral.classList.contains("max-barra-lateral")) {
        (menu === null || menu === void 0 ? void 0 : menu.children[0]).style.display = "none";
        (menu === null || menu === void 0 ? void 0 : menu.children[1]).style.display = "block";
    }
    else {
        (menu === null || menu === void 0 ? void 0 : menu.children[0]).style.display = "block";
        (menu === null || menu === void 0 ? void 0 : menu.children[1]).style.display = "none";
    }
    if (window.innerWidth <= 320) {
        barraLateral === null || barraLateral === void 0 ? void 0 : barraLateral.classList.add("mini-barra-lateral");
        main === null || main === void 0 ? void 0 : main.classList.add("min-main");
        spans.forEach((span) => {
            span.classList.add("oculto");
        });
    }
});
palanca === null || palanca === void 0 ? void 0 : palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo === null || circulo === void 0 ? void 0 : circulo.classList.toggle("prendido");
});
cloud === null || cloud === void 0 ? void 0 : cloud.addEventListener("click", () => {
    barraLateral === null || barraLateral === void 0 ? void 0 : barraLateral.classList.toggle("mini-barra-lateral");
    main === null || main === void 0 ? void 0 : main.classList.toggle("min-main");
    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });
});
