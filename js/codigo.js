const contratosList = document.getElementById( 'contratos' );
const agregarBtn = document.getElementById( 'agregarContrato' );



let contratos = [{
    nombre: "coca 1",
    fechaVencimiento :"2025-1.30",
    descripcion :"descripcion del contrato 1  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nemo recusandae rerum iure aliquid non qui, amet ipsam praesentium maxime laborum reprehenderit ipsum molestias porro eos. Alias, dicta? Repellat, id."
},



{
    nombre: "ipusa 2",
    fechaVencimiento :"2025-1.30",
    descripcion :"descripcion del contrato 2"
},


];



function renderizarContratos() {
 contratosList.innerHTML='';


    contratos.forEach(contrato => {
        const li =
        document.createElement('li');
        li.innerHTML = `
        ${contrato.nombre}
        (Vence: ${contrato.fechaVencimiento})
        <button class = "verDescripcion btn btn-success" >Ver Descripción</button> 

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


