const contratosList = document.getElementById("contratos");
const agregarBtn = document.getElementById("agregarContrato");

let contratos = [
  {
    id: 1,
    nombre: "Coca Cola",
    fechaVencimiento: "2025-2-2",
    descripcion: "Descripción de coca cola",
    img: "https://gallery.exphosted.com/upload/admin/2024/05/10/20240510055643-eae01f39.png",
  },

  {
    id: 2,
    nombre: "Ipusa ",
    fechaVencimiento: "2025-1-27",
    descripcion: "Descripción  del contrato 2",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/IPUSA.jpg",
  },

  {
    id: 3,
    nombre: "Pontyn",
    fechaVencimiento: "2025-2-4",
    descripcion: "Descripción  del contrato 2",
    img: "https://cdn.shopify.com/s/files/1/0406/1259/3831/files/Quimica_10_480x480.jpg?v=1691100167",
  },

  {
    id: 4,
    nombre: "L.Gross",
    fechaVencimiento: "2025-11-30",
    descripcion: "Descripción  del contrato 2",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdualSvMnaVKMm1HkkKZ_b9d0S7r86olo7g&s",
  },

  {
    id: 5,
    nombre: "Pepsico",
    fechaVencimiento: "2025-5-30",
    descripcion: "Descripción  del contrato 2",
    img: "https://logowik.com/content/uploads/images/pepsico4720.jpg",
  },
];

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
        alert("Contrato eliminado");
      }
    });

    const modificarBtn = li.querySelector(".modificarContrato");
    modificarBtn.addEventListener("click", () => {
      editarContrato(index);
    });
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


function editarContrato (index) {

  let contrato = contratos[index]

  let nuevaDescripcion = prompt('Ingrese la nueva descripción:', contrato.descripcion);
  let nuevaFecha = prompt('Ingrese la nueva fecha de vencimiento', contrato.fechaVencimiento);

  if(nuevaDescripcion !==null && nuevaFecha !==null){
    contrato.descripcion = nuevaDescripcion;
    contrato.fechaVencimiento = nuevaFecha;
    alert('Contrato modificado con exito✅✅')
    renderizarContratos()
  }else{
    alert('Por favor, complete todo los campos')
  }
}

 


renderizarContratos();
setTimeout(verificarContratosVencidos,3000)


agregarBtn.addEventListener("click", () => {
  const nuevoNombre = prompt("Ingrese el nombre del nuevo contrato");
  const nuevaFecha = prompt("Ingrese la fecha de vencimiento(AAAA-MM-DD)");
  const nuevaDescripcion = prompt("Ingrese la descripción del contrato");

  if (nuevoNombre && nuevaFecha && nuevaDescripcion) {
    const nuevoContrato = {
      nombre: nuevoNombre,
      fechaVencimiento: nuevaFecha,
      descripcion: nuevaDescripcion,
    };
    contratos.push(nuevoContrato);
   renderizarContratos();
   setTimeout(verificarContratosVencidos,3000)
    alert("Contrato agregado con éxito✅✅");
  } else {
    alert("Por favor, complete todos los campos");
  }
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