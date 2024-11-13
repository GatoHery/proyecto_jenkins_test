import { expect } from 'chai';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

describe('Pruebas de integración con la página HTML', function() {
    this.timeout(60000);  // Tiempo de espera global a 30 segundos

    let browser;
    let page;

    before(async function() {
        this.timeout(30000);  // Tiempo de espera específico para el hook `before`
        
        try {
            console.log("Iniciando navegador...");
            browser = await puppeteer.launch({
                headless: true,  // Asegura que esté en modo sin interfaz gráfica
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',  // Evita almacenamiento en /dev/shm
                    '--single-process',         // Ejecuta todo en un solo proceso
                    '--disable-gpu'             // No usa aceleración de GPU
                ]
            });
            page = await browser.newPage();

            // Configuración de tamaño de la página para optimizar rendimiento
            await page.setViewport({ width: 1280, height: 800 });

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.resolve(__dirname, 'hola.html');
            const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;

            console.log("Accediendo al archivo HTML...");
            await page.goto(fileUrl);
        } catch (error) {
            console.error("Error iniciando el navegador:", error);
            throw error;  // Propaga el error para que la prueba falle
        }
    });

    after(async function() {
        console.log("Cerrando el navegador...");
        if (browser) {  // Verifica si `browser` fue inicializado
            await browser.close();
        }
    });

    it('Debe mostrar el saludo "Hola, Ana" cuando se ingresa "Ana"', async function() {
        await page.waitForSelector('#nombre', { timeout: 5000 });  // Timeout específico en waitForSelector
        await page.waitForSelector('button', { timeout: 5000 });

        await page.type('#nombre', 'Ana');
        await page.click('button');

        const resultado = await page.$eval('#resultado', el => el.innerText);
        expect(resultado).to.equal('Hola, Ana');
    });
});
