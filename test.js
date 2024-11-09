// Primero, asegúrate de que los polyfills estén cargados
import 'web-streams-polyfill';
import 'stream-browserify';

// Importaciones de otros módulos
import fs from 'fs';
import { expect } from 'chai';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url'; // Importamos fileURLToPath
import path from 'path'; // Importamos el módulo path

// Usamos fileURLToPath para obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Pruebas Unitarias para HTML', function() {
    it('debe contener la frase "Hola Mundo"', function(done) {
        // Obtenemos la ruta del archivo 'hola.html' en la carpeta actual
        const filePath = path.join(__dirname, 'hola.html');

        // Leemos el archivo HTML
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) throw err;

            // Cargamos el HTML con Cheerio
            const $ = cheerio.load(data);

            // Verificamos que contenga "Hola Mundo"
            expect($('body').text()).to.include('Hola Mundo');
            done();
        });
    });
});
