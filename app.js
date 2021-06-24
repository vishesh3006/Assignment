import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import images from './public/js/images.js'

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


const pptr = async () => {
    const browser = await puppeteer.launch({defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
    });
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // const filePath = __dirname + '/public/js/index2.js';
    // await page.addScriptTag({type:'module', path: filePath})

    await page.evaluate(async (images) => {
        document.querySelector("#hello").remove();
        const section = document.querySelector('#home');
        section.setAttribute('display', 'block')
        const imagePreview = document.createElement('div');

        let content = await images.map((image, index) => {
                return(
                    `<div class="content" style="page-break-after:always;">
                            <h2>${image.title}<h2>
                            <img src=${image.previewImage} alt="${image.title}"></img>
                    </div>`
                );
        }).join("");

        content += `<div class="content" style="page-break-after:always;">
        
        <img style="page-break-after:always;" class="content-img" src=${images[images.length - 1].previewImage} alt="${images[images.length - 1].title}></img>
                </div>`
        imagePreview.innerHTML = content;
        section.innerHTML = "";
        section.appendChild(imagePreview);
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', reject);
            });
        }));
    }, images);
    //page.waitForTimeout(2000);
    await page.waitForSelector('#home');
    const pdf = await page.pdf({ path: './public/pdfs/hn3.pdf',
        format: 'A4',
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        },
    });
    await browser.close();
    return pdf;
  }

app.get('/', async (req, res) => {
    if(req.query.pdf){
        const pdf = await pptr();
        res.contentType("application/pdf");
        res.send(pdf);
    }else{
        res.render('index')
    } 
})

// app.post('/', async (req, res) => {
//     await pptr();
//     res.redirect('/')
// })

app.listen('3000', () => {
    console.log('runing on port 3000');
})