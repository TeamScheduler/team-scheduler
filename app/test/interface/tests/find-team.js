/*jshint strict:false */
var test = require('../selenium.js');
var assert = require('assert');
var driver = test.driver.build();
var by = test.by;

var host = 'http://localhost:3000/#!/';

driver.get(host.concat('find-team'));
driver.findElement(by.linkText('Criar novo time')).click().then(function() {
    driver.getCurrentUrl().then(function(value) {
        assert.equal(value, host.concat('create-team'), 
        'Click on the Create Time button on the Find Time screen Did not take the screen create time');
    });
});

driver.get(host.concat('find-team'));
driver.findElement(by.name('input')).sendKeys('projetoES');
driver.findElement(by.linkText('Encontrar time')).click().then(function() {
    driver.getCurrentUrl().then(function(value) {
        assert.equal(value, host.concat('find-team'),
        'When entering a team name not yet registered, you should not change the page');
    });
});