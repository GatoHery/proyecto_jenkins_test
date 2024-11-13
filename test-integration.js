import { expect } from 'chai';
import puppeteer from 'puppeteer';
import path from 'path';  // Necesario para resolver la ruta correctamente
import { fileURLToPath } from 'url';  // Importar para convertir la URL del módulo

describe('Pruebas de integración con la página HTML', function() {
    this.timeout(10000);  // Establece el tiempo de espera a 10 segundos

    let browser;
    let page;

    before(async function() {
        // Lanzamos el navegador antes de las pruebas
        console.log("Iniciando navegador...");
        browser = await puppeteer.launch();
        page = await browser.newPage();

        // Obtener la ruta del archivo actual (es equivalente a __dirname)
        const __filename = fileURLToPath(import.meta.url);  // Obtiene la ruta del archivo actual
        const __dirname = path.dirname(__filename);  // Obtiene el directorio del archivo

        // Usamos path.resolve para obtener la ruta absoluta al archivo HTML
        const filePath = path.resolve(__dirname, 'hola.html');  // Cambia 'index.html' si el nombre es diferente

        console.log("Ruta completa del archivo:", filePath);  // Verifica la ruta completa del archivo

        // Asegúrate de que la ruta esté bien formateada y sin problemas de barra invertida
        const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;

        console.log("URL completa del archivo:", fileUrl);  // Verifica la URL completa

        // Accedemos al archivo local con file://
        console.log("Accediendo al archivo HTML...");
        await page.goto(fileUrl);  // Asegúrate de que esta es la ruta correcta
    });

    after(async function() {
        // Cerramos el navegador después de las pruebas
        console.log("Cerrando el navegador...");
        await browser.close();
    });

    it('Debe mostrar el saludo "Hola, Ana" cuando se ingresa "Ana"', async function() {
        console.log("Esperando que el campo de nombre y el botón estén disponibles...");

        await page.waitForSelector('#nombre');
        await page.waitForSelector('button');

        console.log('Ingresando el nombre "Ana" en el campo de texto...');
        await page.type('#nombre', 'Ana');

        console.log('Haciendo clic en el botón para generar el saludo...');
        await page.click('button');

        console.log('Esperando que el resultado aparezca...');
        const resultado = await page.$eval('#resultado', el => el.innerText);

        console.log(`Resultado obtenido: "${resultado}"`);

        // Verificando que el resultado sea el esperado
        expect(resultado).to.equal('Hola, Ana');
        
        console.log('Prueba completada: El saludo es correcto.');
    });
});
