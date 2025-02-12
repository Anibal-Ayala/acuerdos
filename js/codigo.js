


const contratosList = document.getElementById("contratos");
const agregarBtn = document.getElementById("agregarContrato");

let contratos = JSON.parse(localStorage.getItem("contratos")) || [];

function renderizarContratos() {
  contratosList.innerHTML = "";

  contratos.forEach((contrato, index) => {
    const li = document.createElement("li");

    const fechaVencimiento = new Date(contrato.fechaVencimiento);
    const dia = fechaVencimiento.getDate();
    const mes = fechaVencimiento.getMonth () + 1 
    const anio = fechaVencimiento.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`

    li.innerHTML = `
       <img src=" ${contrato.img}">
        ${contrato.nombre}
        (Vence: ${fechaFormateada})
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
      cerrarBtn.textContent = "Cerrar";
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

        guardarContratosEnLocalStorage();
        alert("Contrato eliminado");
      }
    });

    const modificarBtn = li.querySelector(".modificarContrato");
    modificarBtn.addEventListener("click", () => {
      editarContrato(index,li);
      modificarBtn.disabled = true;
      modificarBtn.textContent = "Modificando..."
      guardarContratosEnLocalStorage();
    });
contratosList.appendChild (li);
  });
}

function verificarContratosVencidos() {
  contratos.forEach((contrato, index) => {
    const fechaVencimiento = new Date(contrato.fechaVencimiento);
    const hoy = new Date();
    const diferenciaEnDias = Math.ceil(
      (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24)
    );
    const diasRestantes = diferenciaEnDias  ;
    if  (diasRestantes <= 7 && diasRestantes > 0) {
      /*enviarCorreo(contrato)*/
      alert(
        "El contrato con " +
          contrato.nombre +
          " vencerá en " +
          diferenciaEnDias +
          " dias!"
      );
    } else if (diasRestantes <= 0) {
      alert(
        "El contrato con " + contrato.nombre + " se encuentra vencido! ❌ "
      );
    }
  });
}

function guardarContratosEnLocalStorage() {
  localStorage.setItem("contratos", JSON.stringify(contratos));
}

renderizarContratos();

setTimeout(verificarContratosVencidos, 3000);

function editarContrato(index, elementoLi) {

  let contrato = contratos [index];

  const nombreInput = document.createElement ("input");
  nombreInput.type = "text";
  nombreInput.value = contrato.nombre;
  nombreInput.placeholder = "Ingrese el nuevo nombre";


  const fechaInput = document.createElement("input");
  fechaInput.type = "texto";
  fechaInput.value = contrato.fechaVencimiento;
  fechaInput.placeholder = "Ingrese la nueva fecha (y-m-d)"
  fechaInput.id = "fechaInputEditar";


  const descripcionInput = document.createElement ("input");
  descripcionInput.type = "text";
  descripcionInput.value = contrato.descripcion;
  descripcionInput.placeholder = "Ingrese la nueva descripción";


  const imagenInput = document.createElement ("input");
  imagenInput.type = "text";
  imagenInput.value = contrato.img;
  imagenInput.placeholder = "Ingrese la URL de la imagen (opcional)";


  const formulario = document.createElement ("form");
  formulario.appendChild (nombreInput);
  formulario.appendChild(fechaInput);
  formulario.appendChild (descripcionInput);
  formulario.appendChild (imagenInput);

  const guardarBtn = document.createElement ("button");
  guardarBtn.textContent = "Guardar";
  formulario.appendChild(guardarBtn);

  formulario.addEventListener ("submit", (event)=>{
    event.preventDefault ();

    const nuevoNombre = nombreInput.value;
    const nuevaFecha = fechaInput.value;
    const nuevaDescripcion = descripcionInput.value;
    const nuevaImagen = imagenInput.value;


    if (nuevoNombre && nuevaFecha && nuevaDescripcion) {
      contrato.nombre = nuevoNombre;
      contrato.fechaVencimiento = nuevaFecha;
      contrato.descripcion = nuevaDescripcion;
      contrato.img = nuevaImagen;
      formulario.remove()
      const modificarBtn = elementoLi.querySelector(".modificarContrato");
      modificarBtn.disabled = false;
      modificarBtn.textContent = "Modificar"
      alert("Contrato modificado con éxito ✅✅");
      renderizarContratos();
      guardarContratosEnLocalStorage();
    } else{
      alert("Por favor, complete todos los campos")
    };
  })


 elementoLi.appendChild (formulario);

  flatpickr("#fechaInputEditar", {
    enableTime: false,
    dateFormat: "m-d-Y"
  })
}




agregarBtn.addEventListener("click", () => {

  const nombreInput = document.createElement ("input");
nombreInput.type = "text";
nombreInput.placeholder = "Ingrese nombre del contrato";

  const fechaInput = document.createElement ("input");
  fechaInput.type = "text"
  fechaInput.placeholder = "Ingrese la fecha de vencimiento (y-m-d)";
  fechaInput.id = "fechaInput";

  const descripcionInput = document.createElement ("input");
  descripcionInput.type = "text";
  descripcionInput.placeholder = "Ingrese la descripción";

  const imagenInput = document.createElement ("input");
  imagenInput.type = "text";
  imagenInput.placeholder = "Ingrese la URL de la imagen (opcional)"


  const formulario = document.createElement("form");
  formulario.appendChild(nombreInput);
  formulario.appendChild(fechaInput);
  formulario.appendChild(descripcionInput);
  formulario.appendChild(imagenInput);

  const guardarBtn = document.createElement ("button");
  guardarBtn.textContent = "Guardar";
  formulario.appendChild (guardarBtn);



  formulario.addEventListener ("submit", (event) => {
    event.preventDefault ();

    const nuevoNombre = nombreInput.value;
    const nuevaFecha = fechaInput.value;
    const nuevaDescripcion = descripcionInput.value;
    const nuevaImagen = imagenInput.value;

    if (nuevoNombre && nuevaFecha && nuevaDescripcion) {
      const nuevoContrato = {
        nombre: nuevoNombre,
        fechaVencimiento: nuevaFecha,
        descripcion: nuevaDescripcion,
        img: nuevaImagen,

      };
       formulario.remove()
      contratos.push (nuevoContrato);
      renderizarContratos();
      guardarContratosEnLocalStorage();
      alert("Contrato agregado con éxito ✅✅")
    } else {
      alert("Por favor, complete todos los campos")
      formulario.remove()
     
    }
  })

 

  agregarBtn.parentNode.insertBefore(formulario, agregarBtn.nextSibling);
flatpickr("#fechaInput", {
  enableTime: false,
  dateFormat:"m-d-Y"
})

})














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






agregarBtn.addEventListener("click", () => {
  const nuevoNombre = prompt("Ingrese el nombre del nuevo contrato");
let nuevaFecha = prompt('Ingrese la nueva fecha (y-m-d):');



  const nuevaDescripcion = prompt("Ingrese la descripción del contrato");
  const nuevaImagen = prompt("Ingrese la URL de la imagen(opcional)");

  if (nuevoNombre && nuevaFecha && nuevaDescripcion) {
    const nuevoContrato = {
      nombre: nuevoNombre,
      fechaVencimiento: nuevaFecha,
      descripcion: nuevaDescripcion,
      img: nuevaImagen,
    };
    contratos.push(nuevoContrato);
    renderizarContratos();

    alert("Contrato agregado con éxito✅✅");
  } else {
    alert("Por favor, complete todos los campos");
  }
  guardarContratosEnLocalStorage();
});







function editarContrato(index) {
  let contrato = contratos[index];

  let nuevaDescripcion = prompt(
    "Ingrese la nueva descripción:",
    contrato.descripcion
  );
  let nuevaFecha = prompt('Ingrese la nueva fecha (y-m-d):', contrato.fechaVencimiento); ;

  

  if (nuevaDescripcion !== null && nuevaFecha !== null) {
    contrato.descripcion = nuevaDescripcion;
    contrato.fechaVencimiento = nuevaFecha;
    alert("Contrato modificado con exito✅✅");
    renderizarContratos();
    guardarContratosEnLocalStorage();
  } else {
    alert("Por favor, complete todo los campos");
  }
}














  
*/
