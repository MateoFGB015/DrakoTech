function obtenerInformacion() {
    axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/db')
        .then(function (respuesta) {
            let listaInformacion = document.getElementById('tblContenido');
            listaInformacion.innerHTML = '';

            respuesta.data.dispositivos.forEach(dispositivo => {
                let fila = document.createElement('tr');

                let celdaID = document.createElement('td');
                celdaID.innerText = dispositivo.id;

                let celdaMarca = document.createElement('td');
                celdaMarca.innerText = dispositivo.marca;

                let celdaModelo = document.createElement('td');
                celdaModelo.innerText = dispositivo.modelo;

                let celdaColor = document.createElement('td');
                celdaColor.innerText = dispositivo.color;

                let celdaAlmacenamiento = document.createElement('td');
                celdaAlmacenamiento.innerText = dispositivo.almacenamiento;

                let celdaProcesador = document.createElement('td');
                celdaProcesador.innerText = dispositivo.procesador;

                fila.appendChild(celdaID);
                fila.appendChild(celdaMarca);
                fila.appendChild(celdaModelo);
                fila.appendChild(celdaColor);
                fila.appendChild(celdaAlmacenamiento);
                fila.appendChild(celdaProcesador);

                listaInformacion.appendChild(fila);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function consultarTelefono() {
    let idConsulta = document.getElementById('consultaId').value;
    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/db')
        .then(respuesta => respuesta.json())
        .then(data => {
            let dispositivos = data.dispositivos;
            let dispositivoEncontrado = dispositivos.find(d => d.id == idConsulta);

            if (dispositivoEncontrado) {
                document.getElementById('marca').value = dispositivoEncontrado.marca;
                document.getElementById('modelo').value = dispositivoEncontrado.modelo;
                document.getElementById('color').value = dispositivoEncontrado.color;
                document.getElementById('almacenamiento').value = dispositivoEncontrado.almacenamiento;
                document.getElementById('procesador').value = dispositivoEncontrado.procesador;
            } else {
                alert('Teléfono no encontrado.');
            }
        })
        .catch(error => {
            console.error('Error al consultar el teléfono:', error);
        });
}

function modificarTelefono() {
    let idConsulta = document.getElementById('consultaId').value;
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
    let color = document.getElementById('color').value;
    let almacenamiento = document.getElementById('almacenamiento').value;
    let procesador = document.getElementById('procesador').value;

    axios.put(`https://my-json-server.typicode.com/fedegaray/telefonos/db/dispositivos/${idConsulta}`, {
        marca,
        modelo,
        color,
        almacenamiento,
        procesador
    })
    .then(response => {
        alert(`Teléfono con ID ${idConsulta} ha sido modificado.`);
        obtenerInformacion(); 
    })
    .catch(error => {
        console.error('Error al modificar el teléfono:', error);
    });
}

function eliminarTelefono() {
    let idConsulta = document.getElementById('consultaId').value;

    fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/db/dispositivos/${idConsulta}`, {
        method: 'DELETE'
    })
    .then(respuesta => {
        if (respuesta.ok) {
            alert(`Teléfono con ID ${idConsulta} ha sido eliminado.`);
            obtenerInformacion(); 
        } else {
            alert('Error al eliminar el teléfono.');
        }
    })
    .catch(error => {
        console.error('Error al eliminar el teléfono:', error);
    });
}

function agregarTelefono() {
    let marca = document.getElementById('marca_a').value;
    let modelo = document.getElementById('modelo_a').value;
    let color = document.getElementById('color_a').value;
    let almacenamiento = document.getElementById('almacenamiento_a').value;
    let procesador = document.getElementById('procesador_a').value;

    axios.post('https://my-json-server.typicode.com/fedegaray/telefonos/db/dispositivos', {
        marca,
        modelo,
        color,
        almacenamiento,
        procesador
    })
    .then(response => {
        alert('Teléfono agregado exitosamente.');
        obtenerInformacion(); 
    })
    .catch(error => {
        console.error('Error al agregar el teléfono:', error);
    });
}
