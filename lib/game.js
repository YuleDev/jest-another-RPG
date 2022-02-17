const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'gladius'));
    this.enemies.push(new Enemy('orc', 'halberd'));
    this.enemies.push(new Enemy('skeleton', 'mourning-star'));
    
    this.currentEnemy = this.enemies[0];

    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'what is your name'
    })
    // destructure name from the prompt
    .then(({ name }) => {
        this.player = new Player(name);

        console.log(this.currentEnemy, this.player);
    })
};

module.exports = Game;