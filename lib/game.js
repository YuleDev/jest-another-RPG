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

Game.prototype.checkEndofBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`youve defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name}`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('you win!');
        };
    } else {
        console.log('bro you kinda suck, wanna play minecraft instead?')
    };
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
        .prompt({
            type: 'list',
            message: 'what would you like to do?',
            name: 'action',
            choices: ['attack', 'use potion']
        })
        .then(({ action }) => {
            if (action === 'use potion') {
                if (!this.player.getInventory()) {
                    console.log('you dont have any potions!');
                    return this.checkEndofBattle();
                }
                inquirer 
                .prompt({
                    type: 'list',
                    message: 'which potion do you wish to use?',
                    name: 'action',
                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                })
                .then(({ action }) => {
                    const potionDetails = action.split(': ');

                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`you used a ${potionDetails[1]} potion.`);
                    this.checkEndofBattle();
                });
            } else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                this.checkEndofBattle();
            }
        });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by this ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndofBattle();
    }
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agilty) {
        this.isPlayerTurn = turn;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('your stats are as follows:');
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('gladiator', 'gladius'));
    this.enemies.push(new Enemy('knight champion', 'halberd'));
    this.enemies.push(new Enemy('vikingr', 'mourning-star'));
    
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

        this.startNewBattle();
    });
};

module.exports = Game;