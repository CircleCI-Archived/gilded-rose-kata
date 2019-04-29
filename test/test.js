var gilded = require('../src/gilded_rose');
var assert = require('assert');

let items = [];

items.push(new gilded.Item('+5 Dexterity Vest', 10, 20));
items.push(new gilded.Item('Aged Brie', 2, 0));
items.push(new gilded.Item('Elixir of the Mongoose', 5, 7));
items.push(new gilded.Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new gilded.Item('Sulfuras, Hand of Ragnaros', -1, 80));
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));

gilded.UpdateItems(items);
describe('Day 1', () => {
  describe('Dexterity Vest', () => {
    it('should have sell_in 9 on day 1', () => {
      assert.equal(items[0].sell_in, 9);
    });
    it('should have quality 19 on day 1', () => {
      assert.equal(items[0].quality, 19);
    });
  });
});