function abrirPopup(){
  (document.getElementById('popup') as HTMLElement).style.display= 'block';
  (document.getElementById('overlay') as HTMLElement).style.display= 'block';
}

function cerrarPopup(){
    (document.getElementById('popup') as HTMLElement).style.display= 'none';
    (document.getElementById('overlay') as HTMLElement).style.display= 'none';
}