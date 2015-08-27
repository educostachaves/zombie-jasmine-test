var Browser = require("zombie");
var assert = require("assert");
var url = "http://question-prod.elasticbeanstalk.com/";
var browser = new Browser();

describe("Interface Test of Question-prod.ElasticBeanstalk", function() {

    it("deve definir o navegador", function(next){
        expect(typeof browser != "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("deve acessar o site e visualizar o formulario de login", function(next) {
        browser.visit(url, function(err) {
            expect(browser.success).toBe(true);
            expect(browser.query("input[name='Email']")).toBeDefined();
            next();
        })
    });

    it("deve não ser habilitado a fazer login com credenciais erradas", function(next) {
        browser
        .fill('input[name="Email"]', "wrongemail")
        .fill('input[name="Password"]', "wrongpassword")
        .pressButton('button[id="button-log-in"]', function() {
            expect(browser.html('span[id="passwordError"]'));
            next();
        });
    });

    it("deve ser habilitado a fazer login com credenciais certas", function(next) {
        browser
        .fill('input[name="Email"]', "harrysouza@gmail.com")
        .fill('input[name="Password"]', "123")
        .pressButton('button[id="button-log-in"]', function() {
            assert.equal(browser.text('strong'), "Bem-vindo!");
            next();
        });
    });

});