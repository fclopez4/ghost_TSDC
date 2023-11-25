class Editor {

    getEstatusTittle() {
        return cy.get('.gh-editor-post-status').first()
    }

    fillTitle(titlePost, placeHolder) {
        return cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view')
            .should('have.attr', 'placeholder', placeHolder).type(titlePost)
    }

    clearTitle(placeHolder) {
        return cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view')
            .should('have.attr', 'placeholder', placeHolder).clear()
    }

    fillContent(contentPost) {
        return cy.get('.kg-prose').click().type(contentPost)
    }

    getTitle() {
        return cy.get("textarea.gh-editor-title.ember-text-area.gh-input.ember-view")
    }

    clickPublish() {
        return cy.get('button').contains('Publish').click()
    }

    clickButtonFinalReview() {
        return cy.get('button').contains('final review').click()
    }

    clickButtonPublishRighNow() {
        return cy.get('[data-test-button="confirm-publish"]').click()
    }

    clickOptionMore(optionName) {
        cy.get('.kg-prose').click()
        cy.get('[aria-label="Add a card"]').click()
        return cy.get('button').contains(optionName).click()
    }

    clickButtonBackEditor() {
        return cy.get('a.ember-view.gh-btn-editor.gh-editor-back-button').click()
    }

    clickUpdate() {
        return cy.get('button[data-test-button="publish-save"]').click()
    }

    uploadImage(fileName, path) {
        cy.get('input[type="file"]').eq(1).selectFile({
            contents: path,
            fileName: fileName + '.jpg',
        }, { force: true })
    }

    uploadVideo(fileName, path) {
        cy.get('input[type="file"]').eq(1).selectFile({
            contents: path,
            fileName: fileName + '.mp4',
        }, { force: true })
    }

    uploadAudio(fileName, path) {
        cy.get('input[type="file"]').eq(1).selectFile({
            contents: path,
            fileName: fileName + '.mp3',
        }, { force: true })
    }

    uploadGaleryImages(fileNamesPahts) {
        let objectsFiles = fileNamesPahts.map((fileNamesPaht) => {
            return {
                contents: fileNamesPaht.filePath,
                fileName: fileNamesPaht.fileName + '.png',
            }
        });
        cy.get('input[type="file"]').eq(1).selectFile(objectsFiles, { force: true })
    }

    getImage(fileName) {
        return cy.get('img').should(($imgs) => {
            const imagenConNombre = $imgs.filter((index, img) => {
                const src = img.getAttribute('src');
                return src.includes(fileName);
            });
            return imagenConNombre.first();
        })
    }

    getModalHeaderMessage() {
        return cy.get('header.modal-header').first()
    }

    getButtonPageSettings() {
        return cy.get('button.settings-menu-toggle[title="Settings"]').first()
    }

    getButtonDeletePage() {
        return cy.get('div.settings-menu-delete-button>button').first()
    }

    getButtonModalDeletePage() {
        return cy.get('div.modal-footer>button')
            .contains('Delete')
            .first()
    }

    publish() {
        this.clickPublish()
        cy.wait(500)
        this.clickButtonFinalReview()
        cy.wait(500)
        this.clickButtonPublishRighNow();
        cy.wait(1000)
    }

    uploadFixtureImage(fileName, filePath) {
        cy.get('[data-test-file-input="feature-image"] > input').selectFile({
            contents: filePath,
            fileName: fileName + '.jpg',
        }, { force: true })
    }

    getErrorMessageUploadFixture() {
        return cy.get('[data-test-error="feature-image"]').contains('Unable to manipulate image')
    }

    getErrorFileUpload() {
        return cy.get('[data-testid="media-placeholder-errors"]').contains('The file type you uploaded is not supported.')
    }

    getErrorGalleryUpload() {
        return cy.get('[data-testid="gallery-error"]').contains('Galleries are limited to 9 images')
    }

    clickSettingsOption() {
        return cy.get("button[data-test-psm-trigger]").click().wait(1000)
    }

    fillPublishDate(date) {
        return cy.get('input[data-test-date-time-picker-date-input]').type("{selectall}{backspace}").type(date, { force: true }).tab()
    }

    fillPublishTime(date) {
        return cy.get('input[data-test-date-time-picker-time-input]').type("{selectall}{backspace}", { force: true }).type(date, { force: true }).tab()
    }

    generateDate(date) {
        const dia = date.getDate();
        const mes = date.getMonth() + 1; // Los meses comienzan desde 0, por eso se suma 1
        const año = date.getFullYear();

        // Asegurarse de que el día y el mes tengan dos dígitos
        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const mesFormateado = mes < 10 ? `0${mes}` : mes;

        // Formato día-mes-año
        const fechaFormateada = `${año}-${mesFormateado}-${diaFormateado}`;
        return fechaFormateada;
    }

    gerateTime(date) {
        const hora = date.getHours();
        const minutos = date.getMinutes();

        // Asegurarse de que la hora y los minutos tengan dos dígitos
        const horaFormateada = hora < 10 ? `0${hora}` : hora;
        const minutosFormateado = minutos < 10 ? `0${minutos}` : minutos;

        // Formato hora:minutos
        const horaFormateadaFinal = `${horaFormateada}:${minutosFormateado}`;
        return horaFormateadaFinal;
    }

    getErrorDateTime() {
        return cy.get('[data-test-date-time-picker-error]')
    }

    clickFacebookCard() {
        cy.get('[data-test-button="facebook-data"]').click()
    }

    fillFacebookImage(fileName, path) {
        cy.get('[aria-label="Facebook card settings"]').find("input[type=file]").selectFile({
            contents: path,
            fileName: fileName + '.jpg',
        }, { force: true })
    }

    getErrorFacebookImageUpload(){
        return cy.get('[aria-label="Facebook card settings"]').find('div.failed')
    }

    fillFacebookTitle(title) {
        cy.get('input[data-test-field="og-title"]').type(title).tab()
    }

    facebookInputTitleIsValid() {
        let input = cy.get(`input[data-test-field="og-title"]`).first()
        return input.parent().should('have.class', 'success');
    }

    facebookInputTitleIsInvalid() {
        let input = cy.get(`input[data-test-field="og-title"]`).first()
        return input.parent().should('have.class', 'error');
    }

    fillFacebookDescription(description) {
        cy.get('textarea[data-test-field="og-description"]').type(description).tab()
    }

    facebookInputDescIsValid() {
        let input = cy.get(`textarea[data-test-field="og-description"]`).first()
        return input.parent().should('have.class', 'success');
    }

    facebookInputDescIsInvalid() {
        let input = cy.get(`textarea[data-test-field="og-description"]`).first()
        return input.parent().should('have.class', 'error');
    }
}

module.exports = Editor
