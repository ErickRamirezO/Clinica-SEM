// validate.js

export function validarNombresCompletos(nombres) {
    // Expresión regular para validar nombres y apellidos con letras acentuadas, "ñ" y espacio opcional al final
    var regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(\s)?$/;
    return regex.test(nombres);
}

export function validarApellidosCompletos(apellidos) {
    // Expresión regular para validar nombres y apellidos con letras acentuadas, "ñ" y espacio opcional al final
    var regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(\s)?$/;
    return regex.test(apellidos);
}


export function validarEstatura(estatura) {
    // Verificar si la estatura está dentro del rango válido (0.30 - 3.00)
    return !isNaN(estatura) && estatura >= 0.3 && estatura <= 3.0;
}

export function validarTemperatura(temperatura) {
    // Verificar si la temperatura está dentro del rango válido (36.0 - 39.9)
    return !isNaN(temperatura) && temperatura >= 36.0 && temperatura <= 39.9;
}


export function validarCedulaEcuatoriana(cedula) {
    // Verificar si la cédula tiene 10 dígitos
    if (cedula.length !== 10 || isNaN(cedula)) {
        return false;
    }
    
    // Obtener los primeros 9 dígitos de la cédula
    var digitos = cedula.substring(0, 9);
    
    // Calcular el dígito de verificación
    var suma = 0;
    for (var i = 0; i < digitos.length; i++) {
        var digito = parseInt(digitos[i]);
        if (i % 2 === 0) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }
        suma += digito;
    }
    
    var verificador = 10 - (suma % 10);
    if (verificador === 10) {
        verificador = 0;
    }
    
    // Verificar si el dígito de verificación coincide con el último dígito de la cédula
    return verificador === parseInt(cedula[9]);
}

export function validarNumeroTelefonico(telefono) {
    // Expresión regular para validar números telefónicos de formato ecuatoriano
    var regex = /^09\d{8}$/;
    return regex.test(telefono);
}

export function validarPeso(peso) {
    // Verificar si el peso está dentro del rango válido (4 - 300)
    return !isNaN(peso) && peso >= 4 && peso <= 300;
}
