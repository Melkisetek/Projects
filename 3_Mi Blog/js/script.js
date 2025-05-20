function deshabilitarFormulario(){
   let formulario =  document.getElementById('formulario');

    formulario.querySelectorAll('input').forEach(input =>{
        input.disabled = true;
    });
    formulario.querySelectorAll('textarea').forEach(input=>{
        input.disabled = true;
    });

    alert('¡Hola! Esta acción no se encuentra disponible ahora.')
}

//menu desplegable
document.querySelector('.menu').addEventListener('click', function() {
    var nav = document.querySelector('.contenedor nav');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
   
});

