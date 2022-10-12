export function validate(input){   
    let errors = {};
    const urlImg = (url) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);}
    
    if (!input.nombre){
        errors.nombre = 'Se requiere un que ingreses un Nombre'
    }
    if (!/^[A-Za-z\s]*$/.test(input.nombre)) {
        errors.nombre = "Solo puedes usar letras en tu Nombre";
    }
    if (!input.vida || input.vida < 1 || input.vida > 100||/^[,.*'"-+=_]*$/.test(input.vida)) {
        errors.vida = 'Ingresa un Valor de Vida entre 1 - 100';
    }
    if (!input.ataque || input.ataque < 1 || input.ataque > 100||/^[,.*'"-+=_]*$/.test(input.ataque)) {
        errors.ataque = 'Ingresa un Valor de Ataque entre 1 - 100';
    }
    if (!input.defensa || input.defensa < 1 || input.defensa > 100||/^[,.*'"-+=_]*$/.test(input.defensa)) {
        errors.defensa = 'Ingresa un Valor de Defensa entre 1 - 100';
    }
    if (!input.velocidad || input.velocidad < 1 || input.velocidad > 100||/^[,.*'"-+=_]*$/.test(input.velocidad)) {
        errors.velocidad = 'Ingresa un Valor de Velocidad entre 1 - 100';
    }
    if (!input.altura || input.altura < 1 || input.altura > 100||/^[,.*'"-+=_]*$/.test(input.altura)) {
        errors.altura = 'Ingresa un Valor de Altura entre 1 - 100';
    }
    if (!input.peso || input.peso < 1 || input.peso > 1000||/^[,.*'"-+=_]*$/.test(input.peso)) {
        errors.peso = 'Ingresa un Valor de Peso entre 1 - 1000';
    }
    if ((!urlImg(input.img))) {
        errors.img = "Debes asignarle una imagen";
    }
    if (!input.tipo.length) {
        errors.tipo = "Puedes asignar hasta 2 tipos";
    }
    // if(input.tipo.length > 2){
    //     errors.tipo = "Solo puedes asignale hasta 2 tipos a tu Pokemon";
    // }
    
    return errors;
}