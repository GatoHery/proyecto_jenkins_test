import { expect } from 'chai';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

describe('Pruebas de integración con la página HTML', function() {
    this.timeout(30000);  // Aumenta el tiempo de espera global a 30 segundos

    let browser;
    let page;

    before(async function() {
        this.timeout(30000);  // Aumenta el tiempo de espera específico para el hook `before`
        
        try {
            console.log("Iniciando navegador...");
            browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            page = await browser.newPage();

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
        await page.waitForSelector('#nombre');
        await page.waitForSelector('button');

        await page.type('#nombre', 'Ana');
        await page.click('button');

        const resultado = await page.$eval('#resultado', el => el.innerText);
        expect(resultado).to.equal('Hola, Ana');
    });
});
