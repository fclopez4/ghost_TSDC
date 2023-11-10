class Dashboard {
    constructor() {
        this.url = "/index.php?route=extension/maza/blog/home"
    }

    getTitle() {
        return cy.get('.gh-canvas-title').first()
    }
}

module.exports = Dashboard