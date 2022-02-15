const Player = require('../../lib/player');
const Potion = require('../../lib/potion');
jest.mock('../../lib/potion');

test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
      expect.arrayContaining([expect.any(Object)])
    );
  });
