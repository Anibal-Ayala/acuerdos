const contratosList = document.getElementById("contratos");
const agregarBtn = document.getElementById("agregarContrato");

let contratos = JSON.parse(localStorage.getItem('contratos'))||[];









function renderizarContratos() {
  contratosList.innerHTML = "";

  contratos.forEach((contrato, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
       <img src=" ${contrato.img}">
        ${contrato.nombre}
        (Vence: ${contrato.fechaVencimiento})
        <button class = "verDescripcion btn btn-success" >Ver Descripción</button> 
         <button class = "modificarContrato  btn btn-warning">Modificar</button>
        <button class = "eliminarContrato  btn btn-danger">Eliminar</button>
        `;
    contratosList.appendChild(li);


    const verDescripcionBtn = li.querySelector(".verDescripcion");
    verDescripcionBtn.addEventListener("click", () => {
      const descripcionDiv = document.createElement("div");
      descripcionDiv.classList.add("descripcion");
      descripcionDiv.textContent = contrato.descripcion;
      li.appendChild(descripcionDiv);

      verDescripcionBtn.style.display = "none";
      descripcionDiv.style.display = "block";

      const cerrarBtn = document.createElement("button");
      cerrarBtn.textContent = " ❌";
      cerrarBtn.classList.add("cerrar");
      descripcionDiv.appendChild(cerrarBtn);

      cerrarBtn.addEventListener("click", () => {
        descripcionDiv.style.display = "none";
        cerrarBtn.remove();
        verDescripcionBtn.style.display = "";
      });
    });

    const eleminarBtn = li.querySelector(".eliminarContrato");
    eleminarBtn.addEventListener("click", () => {
      if (confirm("¿Estas seguro de eliminar este contrato?")) {
        const index = contratos.indexOf(contrato);
        contratos.splice(index, 1);
        renderizarContratos();
        
        guardarContratosEnLocalStorage ()
alert("Contrato eliminado");
      }
    });

    const modificarBtn = li.querySelector(".modificarContrato");
    modificarBtn.addEventListener("click", () => {
      editarContrato(index);
      guardarContratosEnLocalStorage ();
    }
  );
  });
}






function verificarContratosVencidos (){

contratos.forEach((contrato, index ) =>{
    
    const fechaVencimiento = new Date(contrato.fechaVencimiento);
    const hoy = new Date();
    const diferenciaEnDias = Math.ceil(
      (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24)
    );

    if (diferenciaEnDias === 7) {
      alert("El contrato con " + contrato.nombre + " esta próximo a vencer!");
    } else if (diferenciaEnDias < 7 && diferenciaEnDias > 0) {

        /*enviarCorreo(contrato)*/
      alert(
        "El contrato con " + contrato.nombre +  " vencerá en " +  diferenciaEnDias +  " dias!"
      );


    } else if (diferenciaEnDias <= 0) {
      alert("El contrato con " + contrato.nombre + " se encuentra vencido! ❌ ");
    }
});
 

}


function guardarContratosEnLocalStorage () {
  localStorage.setItem('contratos', JSON.stringify(contratos))
}



renderizarContratos();

setTimeout(verificarContratosVencidos,3000)








function editarContrato (index) {

  let contrato = contratos[index]

  let nuevaDescripcion = prompt('Ingrese la nueva descripción:', contrato.descripcion);
  let nuevaFecha = prompt('Ingrese la nueva fecha de vencimiento', contrato.fechaVencimiento);

  if(nuevaDescripcion !==null && nuevaFecha !==null){
    contrato.descripcion = nuevaDescripcion;
    contrato.fechaVencimiento = nuevaFecha;
    alert('Contrato modificado con exito✅✅')
    renderizarContratos()
    guardarContratosEnLocalStorage ()
  }else{
    alert('Por favor, complete todo los campos')
  }
}

 




agregarBtn.addEventListener("click", () => {
  const nuevoNombre = prompt("Ingrese el nombre del nuevo contrato");
  const nuevaFecha = prompt("Ingrese la fecha de vencimiento(AAAA-MM-DD)");
  const nuevaDescripcion = prompt("Ingrese la descripción del contrato");
  const nuevaImagen = prompt ("Ingrese la URL de la imagen(opcional)")

  if (nuevoNombre && nuevaFecha && nuevaDescripcion) {
    const nuevoContrato = {
      nombre: nuevoNombre,
      fechaVencimiento: nuevaFecha,
      descripcion: nuevaDescripcion,
      img : nuevaImagen
    };
    contratos.push(nuevoContrato);
   renderizarContratos();

 
    alert("Contrato agregado con éxito✅✅");
  } else {
    alert("Por favor, complete todos los campos");
  }   
  guardarContratosEnLocalStorage();
});
 



/*  function enviarCorreo(contrato) {
  fetch('/enviar-correo', {
    method: 'POST',
    headers: {
        'Content-Type': 'appliction/json'
    },
    body: JSON.stringify(contrato)
  })
  .then(response => {
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error=>{
    console.log('Error:', error);
  })
}
*/