import { assert } from 'chai';

function saludar(nombre) {
    return `Hola, ${nombre}`;
}

describe('Pruebas para la función saludar', function() {
    it('Debe devolver "Hola, Ana" cuando el nombre es "Ana"', function() {
        const nombre = 'Ana';
        const resultado = saludar(nombre);
        
        // Mensaje detallado para el test
        console.log(`  Probando la función con el nombre: ${nombre}`);
        console.log(`  Se esperaba: "Hola, Ana"`);
        console.log(`  Se devolvió: "${resultado}"`);

        // Realizamos la aserción
        assert.equal(resultado, 'Hola, Ana');
    });

    it('Debe devolver "Hola, Juan" cuando el nombre es "Juan"', function() {
        const nombre = 'Juan';
        const resultado = saludar(nombre);

        // Mensaje detallado para el test
        console.log(`  Probando la función con el nombre: ${nombre}`);
        console.log(`  Se esperaba: "Hola, Juan"`);
        console.log(`  Se devolvió: "${resultado}"`);

        // Realizamos la aserción
        assert.equal(resultado, 'Hola, Juan');
    });
});
