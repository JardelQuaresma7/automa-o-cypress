/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Testando automação para quebrar imobcoin, doação legal, vakinha eleitoral, ok pago e tudo mais'

        cy.get('#firstName').type('Jardel')
        cy.get('#lastName').type('Quaresma')
        cy.get('#email').type('jardelquaresma7@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 25 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Jardel')
        cy.get('#lastName').type('Quaresma')
        cy.get('#email').type('jardelquaresma7@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')        
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abc')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando telefone se torna obrigatório mas não é preenchido antes do envio do fornulário', function() {
        cy.get('#firstName').type('Jardel')
        cy.get('#lastName').type('Quaresma')
        cy.get('#email').type('jardelquaresma7@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Jardel')
        .should('have.value', 'Jardel')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Quaresma')
        .should('have.value', 'Quaresma')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('jardelquaresma7@gmail.com')
        .should('have.value', 'jardelquaresma7@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
    })

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')  
    })    

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it.only('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('select')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
})