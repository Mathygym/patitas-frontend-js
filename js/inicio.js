/*
se ejecuta cuando la pagina ha cargado completamente (DOM,CSS,JS , IMAGENES.ETCCC)
eN caso desdeas ejecutar l js se haya carhgado el dom
document.addEventListener('DOMContentLoaded', {})
En la iimportaciopn del scrip, agregando el atributp "defer"
*/

window.addEventListener('load',function(){
   // this.alert("jejejejejeje se cargo")
   //referenciar elemetons de la pagina

   const tipoDocumento = this.document.getElementById("tipoDocumento");
   const numeroDocumento = this.document.getElementById("numeroDocumento");
   const password = this.document.getElementById("password");
   const btnIngresar = this.document.getElementById("btnIngresar");
   const msgError = this.document.getElementById("msgError");

   //implemetar listener
   btnIngresar.addEventListener('click',function(){

    if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' ||
         numeroDocumento.value === null || numeroDocumento.value.trim() === '' || password.value === null
        || password.value.trim() === ''){
            //mostrar el error

            mostrarAlerta("Error debe completar completamente sus credenciales");
            return;
        }
        ocultarAlerta();

        //consumir auntenticar
        autenticar();
   });
});

function mostrarAlerta(mensaje){
    msgError.innerHTML = mensaje;
            msgError.style.display = "block";
}

function ocultarAlerta(){
    msgError.innerHTML = '';
            msgError.style.display = 'none';
}

 async function autenticar(){
    const url = 'http://localhost:8084/login/autenticar-async';
    const data = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value
    };
    try {

        const response = await fetch(url,{
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        });
        if(!response.ok){
            mostrarAlerta('Error :Ocurrio un problema en la autenticacion ');
            throw new Error(`Error : ${response.statusText}`);
        }
        //validar respuesta del servivio
        const result = await response.json();
        console.log('Respuesta del servidor : ',result);

        if(result.codigo ==='00'){
            const userData = {
                nombreUsuario: result.nombreUsuario,
                tipoDocumento: tipoDocumento.value, // Agregar tipo de documento
                numeroDocumento: numeroDocumento.value, // Agregar número de documento
                // Agrega cualquier otro dato que necesites
            };
            console.log(userData); // Verifica que los datos estén bien
           localStorage.setItem('result', JSON.stringify(userData));
            window.location.replace('principal.html');

        }else{
            mostrarAlerta(result.mensaje);
        }
        
    } catch (error) {
        console.error('Error : Ocurrio un problema no identificado', error);
        mostrarAlerta('Error : Ocurrio un problema no identificado ');
    }
}