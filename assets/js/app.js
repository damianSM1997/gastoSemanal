//variable
const presupuestoUsuario = prompt('cual es tu presupuesto semanal');
//console.log(presupuestoUsuario);
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');


//clases

class Presupuesto {
    constructor(presupuesto) {
            this.presupuesto = Number(presupuesto);
            this.restante = Number(presupuesto);

        }
        //metodo para ir restando del metodo actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

//clase de interfaz maneja todo lo relacionado a el HTML

class Interfaz {
    insertarPresupuesto(cantidad) {
        const presuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //insertar al HTML
        presuestoSpan.innerHTML = `${cantidad}`
        restanteSpan.innerHTML = `${cantidad}`
    }

    imprimirMensaje(mensaje, tipo) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert');
            if (tipo === 'error') {
                divMensaje.classList.add('alert-danger');
            } else {
                divMensaje.classList.add('alert-success');
            }
            divMensaje.appendChild(document.createTextNode(mensaje));
            //insertar en el DOM
            document.querySelector('.primario').insertBefore(divMensaje, formulario);
            //quitar el alert despues de 3 segundos

            setTimeout(function() {
                document.querySelector('.primario .alert').remove();
                formulario.reset();
            }, 3000)
        }
        //inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#gastos ul');

        //crear un li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //insertar el gasto
        li.innerHTML = `
        ${nombre}
        <span class = "badge-primary badge-pill"> $ ${cantidad} </span>
        `;
        //insertar al html

        gastosListado.appendChild(li);
    }

    //comprueva el presupuesto restante
    presupuestoRestante(cantidad) {
            const restante = document.querySelector('span#restante');
            //leemos el presupuesto restante
            const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
            restante.innerHTML = `${presupuestoRestanteUsuario}`;
            this.comprobarPresupuesto();
        }
        //cambia de color el presupuesto restant
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        //comprobar el 25% del gasto

        //comprobar el 50% del gasto

        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }


    }
}

//event Listeners

document.addEventListener('DOMContentLoaded', function() {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //instancia de un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //console.log(cantidadPresupuesto);
        //instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //  console.log('enviado');
    //leer el formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    //instanciar la interfaz
    const ui = new Interfaz();
    //comprobar que los campos no esten vasios
    if (nombreGasto === '' || cantidadGasto === '') {
        // 2 parametros mensjae y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        //insertar en el html
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

})