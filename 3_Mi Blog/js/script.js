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

