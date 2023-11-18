const config = require("./config.json");
const fs = require('fs');
const compareImages = require("resemblejs/compareImages");

const { viewportHeight, viewportWidth, browsers, options } = config;

var datetime = new Date().toISOString().replace(/:/g, ".");

function executeTest() {
    if (browsers.length === 0) {
        return;
    }



    let archivosGhost1 = getFiles('../Version_ghost_5.68.0/cypress/screenshots/')
    let archivosGhost2 = getFiles('../Version_ghost_5.0.0/cypress/screenshots/')

    compararArchivos(archivosGhost1, archivosGhost2)
}

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
        const name = `${dir}/${file}`
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files)
        } else {
            var regex = /^F\d{3}-EP\d{3}-\d{2}\.png$/;
            let nameFile = name.split('/').pop();
            if (regex.test(nameFile)) {
                files.push(name)
            }
        }
    }
    return files
}

async function compararArchivos(archivosGhost1, archivosGhost2) {
    let primaryList = archivosGhost1;
    let secondaryList = archivosGhost2;

    let ArchivosComparados = [];
    for (const nameFile of primaryList) {
        let index = secondaryList.findIndex((element) => {
            let nameFile2 = element.split('/').pop();
            return nameFile2 === nameFile.split('/').pop();
        });

        if (secondaryList[index]) {
            let data = await compararImagenes(nameFile, secondaryList[index]);
            ArchivosComparados.push({
                urlFile1: nameFile,
                nameFile1: nameFile.split('/').pop().split('.')[0],
                urlFile2: secondaryList[index],
                nameFile2: secondaryList[index].split('/').pop().split('.')[0],
                urlFileCompare: data,
                nameFileCompare: data.split('/').pop().split('.')[0]
            });
        }
    }
    fs.writeFileSync(`./report.html`, createReport(ArchivosComparados));
    console.log(ArchivosComparados);
}

async function compararImagenes(image1, image2) {
    const data = await compareImages(
        fs.readFileSync(image1),
        fs.readFileSync(image2),
        options
    );
    nameFile1 = image1.split('/').pop().split('.')[0];
    console.log("data", data);
    nameFileCompare = `./result/compare_${nameFile1}.png`;
    fs.writeFileSync(nameFileCompare, data.getBuffer());
    return nameFileCompare;
}



function createRow(imagenes) {
    console.log("Imagenes", imagenes);
    return imagenes.map(imagen => `
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse"
            data-bs-target="#${imagen.nameFileCompare}" aria-expanded="true"
            aria-controls="${imagen.nameFileCompare}">
            <span class="fw-bolder"> Escenario Comparado ${imagen.nameFileCompare} </span>
        </button>
    </h2>
    <div id="${imagen.nameFileCompare}" class="accordion-collapse collapse show">
        <div class="p-2 text-center">
            <div class="row gx-5 pb-2">
                <div class="col-4">
                    <h5 class="card-title text-dark">Reference: GHOST V5.68.0</h5>
                </div>
                <div class="col-4">
                    <h5 class="card-title text-dark">Test: GHOST V5.0.0</h5>
                </div>
                <div class="col-4">
                    <h5 class="card-title text-dark">Diff</h5>
                </div>
            </div>
            <div class="row gx-2">
                <div class="col-4 gx-2">
                    <img src="${imagen.urlFile1}" class="img-responsive w-100 rounded border border-2 " alt="${imagen.nameFile1}">
                </div>
                <div class="col-4 gx-2">
                    <img src="${imagen.urlFile2}" class="img-responsive w-100 rounded border border-2 " alt="${imagen.nameFile2}">
                </div>
                <div class="col-4 gx-2">
                    <img src="${imagen.urlFileCompare}" class="img-responsive w-100 rounded border border-2" alt="${imagen.nameFileCompare}">
                </div>
            </div>
        </div>
    </div>
</div>
      `
    )
}

function createReport(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <title>Reporte Resemble - ${datetime}</title>
        <style>
        .accordion {
            --bs-accordion-btn-bg: #007780;
            --bs-accordion-active-bg: #007780;
            --bs-accordion-active-color: #fff;
            --bs-accordion-bg: #f0fcf8;
            --bs-accordion-btn-focus-box-shadow: none;
        }

        .accordion-button:not(.collapse)::after {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
        }
    </style>
    </head>
    <body>
        <div class="container-fluid text-center">
            <div>
                <h1>Reporte VRT ResembleJs Ghost CMS</h1>
            </div>    
            <div class="accordion " id="accordionPanelsStayOpenExample">
                ${createRow(data).join(',')}
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossorigin="anonymous"></script>
    </body>
    </html>`
}

executeTest();