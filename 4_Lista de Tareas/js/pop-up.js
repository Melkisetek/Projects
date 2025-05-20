
    function abrirPopup(){
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    } 

    let cerrarPopup = ()=>{
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }