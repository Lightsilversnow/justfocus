//See if the browser supports Service Workers, if so try to register one
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(function(registering) {
        // Registration was successful
        console.log("Browser: Service Worker registration is successful with the scope", registering.scope);
    }).catch(function(error) {
        //The registration of the service worker failed
        console.log("Browser: Service Worker registration failed with the error", error);
    });
} else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
}

//Functie activate gif
document.getElementById("startButton").addEventListener("click", start);
document.getElementById('startButton').addEventListener("click", showcharacter);
document.getElementById("continueButton").addEventListener("click", start);
document.getElementById("menu").addEventListener("click", hamburger);
document.getElementById("popContinue").addEventListener("click", vervolg);
document.getElementById("popupquit").addEventListener("click", quit);
document.getElementById("quityes").addEventListener("click", backtostart);
document.getElementById("quitno").addEventListener("click", backtomenu);

let menuswitch = document.getElementById("hamburgermenu");
let popmenu = document.getElementById("popupmenu");
let quitbutton = document.getElementById("quityesno");
let quitbutton2 = document.getElementById("popupquit");
let character = document.getElementById("canvas");
let invisiblelay = document.getElementById("invisiblelayer");
let infotext = document.getElementById("textfooter");
let backgroundpositionX = document.getElementById("background");
let background = document.getElementById("background");
let mainmenu = document.getElementById("mainmenu");
let logo = document.getElementById("logodiv");

//Startup values and classes
let opacitymenu = 0;
let popswitch = 0;
let quitmenu = 0;


//hamburger menu show en hide
if (opacitymenu == 0) {
    menuswitch.classList.add("hamburgerHide")
    menuswitch.classList.remove("hamburgerShow")
}

if (popswitch == 0) {
    popmenu.classList.remove("popShow")
    popmenu.classList.add("popHide")
}

if (quitmenu == 0) {
    quitbutton.classList.remove("quitShow")
    quitbutton.classList.add("quitHide")
}


//startknop
function start() {
    menuswitch.classList.remove("hamburgerHide")
    menuswitch.classList.add("hamburgerShow")
    document.getElementById('buttonsdiv').style.display = "none"
    infotext.style.display = "block"
    background.style.display = "block"
    mainmenu.style.background = "none"
    logo.style.display = "none"
}

// laat karakter zien na drukken startknop
function showcharacter() {
    canvas.style.display = "block"
}

//hamburger menu openen en sluiten
function hamburger() {
    popmenu.classList.add("popShow")
    popmenu.classList.remove("popHide")
    menuswitch.classList.add("hamburgerHide")
    menuswitch.classList.remove("hamburgerShow")
    quitbutton.classList.add("quitHide")
    quitbutton.classList.remove("quitShow")
    invisiblelay.style.display = "block";
    infotext.style.display = "none"
}

//continu knop in pauzescherm
function vervolg() {
    popmenu.classList.remove("popShow")
    popmenu.classList.add("popHide")
    menuswitch.classList.remove("hamburgerHide")
    menuswitch.classList.add("hamburgerShow")
    invisiblelay.style.display = "none";
    infotext.style.display = "block"

}

//afsluit knop in pauzescherm
function quit() {
    quitbutton.classList.remove("quitHide")
    quitbutton.classList.add("quitShow")
    mainmenu.style.background = "none"
}

//quitmenu yes knop
function backtostart() {
    window.location.href = 'https://justfocus.netlify.app/';
    canvas.style.display = "none"
    invisiblelay.style.display = "none";
}

// quitmenu no knop
function backtomenu() {
    quitbutton.classList.remove("quitShow")
    quitbutton.classList.add("quitHide")
}

//hieronder zit de scripts voor het geanimeerd lopen met de sprite

//sprite bepalen en laden
let img = new Image();
img.src = 'images/lopen.png';
img.onload = function() {
    init();
};

//sprite op canvas zetten met goede frame
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let touch;

//scale is voor op welke scale de spritesheet getoont moet worden
//width is de breedte van één afbeelding in de spritesheet
//height is de hoogte van de spirtesheet
const scale = 1;
const width = 255;
const height = 255;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

//we hebben 25 frames voor het lopen
const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

let currentLoopIndex = 0;
let frameCount = 0;
let x = 0;
let magBewegen = 1;

//touch event, touchstart is je vinger op het scherm is, touchend is als je vinger niet meer op het scherm is
document.getElementById("footerbar").addEventListener("touchstart", function() { touch = true });
document.getElementById("footerbar").addEventListener("touchend", function() { touch = false });


//sprite laten lopen als het scherm aangeraakt wordt
function step() {

    if (touch && magBewegen == 1) {
        // Laat de afbeelding verschuiven op de achtergrond
        if (magBewegen == 1) {
            x--;
            //px is een string die voor de css duidelijk maakt dat het om pixels gaat
            backgroundpositionX.style.backgroundPositionX = x + "px";
            console.log(x)
        }
        // als de x van de afbeelding op -1500 komt, dan gaat hij uit de if statement doordat hij magBewegen op 2 zet
        if (x <= -1500) {
            magBewegen = 2;
        }
        //frameCount is hoe snel de animatie gaat, hoe lager het getal, hoe sneller de code door de spritesheet gaat
        frameCount++;
        if (frameCount < 4) {
            window.requestAnimationFrame(step);
            return;
        }
        frameCount = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0, 0);
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length) {
            currentLoopIndex = 0;
        }
    }
    //als er niet meer op het scherm gedrukt wordt, dan maakt hij het scherm leeg en zet de eerste frame op het canvas
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(cycleLoop[0], 0, 0, 0);
        currentLoopIndex = 0;
    }
    window.requestAnimationFrame(step);

}


//vanaf blijven
function init() {
    window.requestAnimationFrame(step);
}