var gilded = require('../src/gilded_rose');
var assert = require('assert');

let items = [];

items.push(new gilded.Item('+5 Dexterity Vest', 10, 20));                         // 0
items.push(new gilded.Item('Aged Brie', 2, 0));                                   // 1
items.push(new gilded.Item('Aged Brie', 0, 0));                                   // 2
items.push(new gilded.Item('Sulfuras, Hand of Ragnaros', 0, 80));                 // 3
items.push(new gilded.Item('Sulfuras, Hand of Ragnaros', -1, 80));                // 4
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)); // 5
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 15, 50)); // 6
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 11, 0));  // 7
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 6, 0));  // 8

gilded.UpdateItems(items);
describe('Day 1', () => {
  // Test General item
  describe('+5 Dexterity Vest', () => {
    it('should have sell_in 9 on day 1', () => {
      assert.equal(items[0].sell_in, 9);
    });
    it('should have quality 19 on day 1', () => {
      assert.equal(items[0].quality, 19);
    });
  });
  // Test Brie 
  describe('Aged Brie - quality increase', () => {
    it('should have sell_in 1 on day 1', () => {
      assert.equal(items[1].sell_in, 1);
    });
    it('should have quality 1 on day 1', () => {
      assert.equal(items[1].quality, 1);
    });
  });
  // Test Brie if sell by has past
  // (Does brie increase 2x as fast once the sell by has past..? due to everything else degrading 2x.. hmm.)
  describe('Aged Brie - past sell by day', () => {
    it('should have sell_in  on day 1', () => {
      assert.equal(items[2].sell_in, -1);
    });
    it('should have quality 6 on day 1', () => {
      assert.equal(items[2].quality, 1);
    });
  });
  // Test Hand of Rag
  describe('HoR - Regular', () => {
    it('should have sell_in -1 on day 1', () => {
      assert.equal(items[3].sell_in, -1);
    });
    it('should have quality 80 on day 1', () => {
      assert.equal(items[3].quality, 80);
    });
  });
  describe('HoR - no double decay past sell by date', () => {
    it('should have quality 80 on day 1', () => {
      assert.equal(items[4].quality, 80);
    });
  });
  // Test TAFKAL80ETC
  describe('TAFKAL80ETC - Normal', () => {
    it('should have sell_in 14 on day 1', () => {
      assert.equal(items[5].sell_in, 14);
    });
    it('should have quality 19 on day 1', () => {
      assert.equal(items[5].quality, 19);
    });
  });
  // Has its own quality system
  describe('TAFKAL80ETC - Dont pass 50 quality', () => {
    it('should have quality 50 on day 1', () => {
      assert.equal(items[6].quality, 50);
    });
  });
  // Increase by 2
  describe('TAFKAL80ETC - quality +2 when day <= 10', () => {
    it('should have quality 2 on day 1', () => {
      assert.equal(items[7].quality, 2);
    });
  });
  // increase by 3
  describe('TAFKAL80ETC - quality +3 when day <= 5', () => {
    it('should have quality 3 on day 1', () => {
      assert.equal(items[7].quality, 3);
    });
  });
});