export function valida(input) {
    const tipoInput = input.dataset.tipo
    if (validadores[tipoInput]) {
        validadores[tipoInput](input)
    }
    console.log(input.parentElement);
    if (input.validity.valid) {

        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input)

    }
}
//Consultar sobre validate estate para saber de que se puede hacer uso ej.
//valueMissing,typeMismatch
const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensajeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo12, almenos una letra minuscula, al menos una mayuscula no puede tener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch : "El formato requerido es  XXX XXX XXX XXXX"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch : "Debe tener minimo 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch : "La ciudad debe tener minimo 4 a 30 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch : "El estado debe tener minimo 4 a 30 caracteres"
    }

}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajeError[tipoDeInput][error]            
        }
    })
    return mensaje;
}
function validarNacimiento(input) {
    const fechaIngresada = new Date(input.value);
    mayorDeEdad(fechaIngresada);
    let mensaje = ""
    if (!mayorDeEdad(fechaIngresada)) {
        mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje)

}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}