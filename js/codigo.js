const contratosList = document.getElementById( 'contratos' );
const agregarBtn = document.getElementById( 'agregarContrato' );



let contratos = [{
    nombre: "Coca Cola",
    fechaVencimiento :"2025-1.30",
    descripcion : "descripcion del contrato 1: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nemo recusandae rerum iure aliquid non qui, amet ipsam praesentium maxime laborum reprehenderit ipsum molestias porro eos. Alias, dicta? Repellat, id." ,
     img:"https://gallery.exphosted.com/upload/admin/2024/05/10/20240510055643-eae01f39.png"
},



{
    nombre: "Ipusa ",
    fechaVencimiento :"2025-1.30",
    descripcion :"descripcion del contrato 2",
   img:"https://upload.wikimedia.org/wikipedia/commons/c/cb/IPUSA.jpg"

},


{
    nombre: "Pontyn",
    fechaVencimiento :"2025-1.30",
    descripcion :"descripcion del contrato 2",
   img:"https://cdn.shopify.com/s/files/1/0406/1259/3831/files/Quimica_10_480x480.jpg?v=1691100167"

},


{
    nombre: "L.Gross",
    fechaVencimiento :"2025-1.30",
    descripcion :"descripcion del contrato 2",
   img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdualSvMnaVKMm1HkkKZ_b9d0S7r86olo7g&s"

},


{
    nombre: "Pepsico",
    fechaVencimiento :"2025-1.30",
    descripcion :"descripcion del contrato 2",
   img:"https://logowik.com/content/uploads/images/pepsico4720.jpg"

},


];



function renderizarContratos() {
 contratosList.innerHTML='';


    contratos.forEach(contrato => {
        const li =
        document.createElement('li');
        li.innerHTML = `
       <img src=" ${contrato.img}">
        ${contrato.nombre}
        (Vence: ${contrato.fechaVencimiento})
        <button class = "verDescripcion btn btn-success" >Ver Descripción</button> 
         <button class = "modificarContrato  btn btn-warning">Modificar</button>
        <button class = "eliminarContrato  btn btn-danger">Eliminar</button>
        `;
        contratosList.appendChild(li);

        const verDescripcionBtn= li.querySelector('.verDescripcion');
        verDescripcionBtn.addEventListener('click', ()=> {
           const descripcionDiv = 
           document.createElement('div');
           descripcionDiv.classList.add('descripcion');
           descripcionDiv.textContent = contrato.descripcion;
           li.appendChild(descripcionDiv);
           verDescripcionBtn.style.display = 'none';
           descripcionDiv.style.display = 'block'
           const cerrarBtn = 
           document.createElement ('button');
           cerrarBtn.textContent =' ❌';
           cerrarBtn.classList.add('cerrar');
           descripcionDiv.appendChild(cerrarBtn)
           cerrarBtn.addEventListener('click', () => {
            descripcionDiv.style.display = 'none';
            cerrarBtn.remove();
            verDescripcionBtn.style.display= ''
           })
        });


        const eleminarBtn = li.querySelector('.eliminarContrato');
        eleminarBtn.addEventListener('click', () => {
            if (confirm('¿Estas seguro de eliminar este contrato?')) {
                const index = contratos.indexOf (contrato);
                contratos.splice(index,1);
                renderizarContratos();
                alert('contrato eliminado');
            }
        });





    });
};

renderizarContratos();


agregarBtn.addEventListener('click', () =>{
    const nuevoNombre = prompt('Ingrese el nombre del nuevo contrato');
    const nuevaFecha = prompt('Ingrese la fecha de vencimiento(AAAA-MM-DD)');
    const nuevaDescripcion = prompt('Ingrese la descripción del contrato');

    if(nuevoNombre && nuevaFecha && nuevaDescripcion) {
        const nuevoContrato = {
            nombre: nuevoNombre,
            fechaVencimiento: nuevaFecha,
            descripcion: nuevaDescripcion,
        };
        contratos.push(nuevoContrato);
        renderizarContratos();
        alert('Contrato agregado con éxito')
    } else{
        alert('Por favor, complete todos los campos');
    }
})


