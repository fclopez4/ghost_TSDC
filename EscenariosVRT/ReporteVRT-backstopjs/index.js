const fs = require('fs');
const config = require("./backstop.json");
const configReport = require("./confReporte.json");

function executeTest() {
    let rutaCompleta1 = configReport.rutaCapturasGhost568
    let rutaCompleta2 = configReport.rutaCapturasGhost500
    let rutaArchivoBackstop = 'backstop.json'


    let filesBackstop1 = generarfilesBackstop(rutaCompleta1)
    let filesBackstop2 = generarfilesBackstop(rutaCompleta2)

    let json = generarJsonEscenariosBackstop(filesBackstop1, filesBackstop2)

    config.scenarios = json;
    modificarJson(rutaArchivoBackstop, json);
    console.log(json);
}


function generarfilesBackstop(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
        const name = `${dir}/${file}`
        if (fs.statSync(name).isDirectory()) {
            generarfilesBackstop(name, files)
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

function generarJsonEscenariosBackstop(filesBackstop1, filesBackstop2) {
    console.log("generarJsonEscenariosBackstop");
    let primaryList = filesBackstop1;
    let secondaryList = filesBackstop2;

    let ArchivosComparados = [];
    for (const nameFile of primaryList) {
        let index = secondaryList.findIndex((element) => {
            let nameFile2 = element.split('/').pop();
            return nameFile2 === nameFile.split('/').pop();
        });

        if (secondaryList[index]) {
            ArchivosComparados.push({
                "label": nameFile.split('/').pop().split('.')[0],
                "url": `file://${nameFile}`,
                "referenceUrl": `file://${secondaryList[index]}`
            });
        }
    }

    return ArchivosComparados
}

function modificarJson(archivo, escenarios) {
    fs.readFile(archivo, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        try {
            const config = JSON.parse(data);

            // Llenar el arreglo 'scenarios'
            config.scenarios = escenarios;

            // Convertir el objeto modificado de nuevo a JSON
            const newData = JSON.stringify(config, null, 2);

            // Escribir los cambios de vuelta al archivo
            fs.writeFile(archivo, newData, 'utf8', (err) => {
                if (err) {
                    console.error('Error al escribir en el archivo:', err);
                    return;
                }
                console.log('¡Arreglo "scenarios" llenado con éxito!');
            });
        } catch (error) {
            console.error('Error al parsear el archivo JSON:', error);
        }

        // ejecutarBackstop();

    })

}

executeTest();