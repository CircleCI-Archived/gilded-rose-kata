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
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 6, 0));   // 8
items.push(new gilded.Item('Backstage passes to a TAFKAL80ETC concert', 0, 40));  // 9
items.push(new gilded.Item('+5 Dexterity Vest', 0, 20));                          // 10


gilded.UpdateItems(items);

// Test General item
describe('+5 Dexterity Vest', () => {
  describe('(10,20) regular', () => {
  it('should have sell_in 9', () => {
    assert.strictEqual(items[0].sell_in, 9, 'Failed');
  });
  it('should have quality 19', () => {
    assert.strictEqual(items[0].quality, 19, 'Failed');
  });
  });
  describe('(0,20) double decay', () => {
    it('should have sell_in -1', () => {
      assert.strictEqual(items[10].sell_in, -1, 'Failed');
    });
    it('should have quality 18', () => {
      assert.strictEqual(items[10].quality, 18, 'Failed');
    });
    });
});

// Test Brie
describe('Aged Brie', () => { 
  describe('(2,0) - quality increase', () => {
    it('should have sell_in 1', () => {
      assert.strictEqual(items[1].sell_in, 1, 'Failed');
    });
    it('should have quality 1', () => {
      assert.strictEqual(items[1].quality, 1, 'Failed');
    });
  });
  // Test Brie if sell by has past
  // (Does brie increase 2x as fast once the sell by has past..? due to everything else degrading 2x.. hmm.)
  // It does increase 2x as fast.
  describe('(0,0) - past sell by day', () => {
    it('should have sell_in -1', () => {
      assert.strictEqual(items[2].sell_in, -1, 'Failed');
    });
    it('should have quality 1', () => {
      assert.strictEqual(items[2].quality, 2, 'Failed');
    });
  });
});

// Test Hand of Rag
describe('Sulfuras, Hand of Ragnaros', () => {
  describe('(0,80) - Regular ', () => {
    it('should have sell_in 0', () => {
      assert.strictEqual(items[3].sell_in, 0, 'Failed');
    });
    it('should have quality 80', () => {
      assert.strictEqual(items[3].quality, 80, 'Failed');
    });
  });
  describe('(-1,80) - no double decay past sell by date', () => {
    it('should have quality 80', () => {
      assert.strictEqual(items[4].quality, 80, 'Failed');
    });
  });
});

// Test TAFKAL80ETC
describe('TAFKAL80ETC', () => {    
  describe('(15, 20) - Normal', () => {
    it('should have sell_in 14', () => {
      assert.strictEqual(items[5].sell_in, 14, 'Failed');
    });
    it('should have quality 21', () => {
      assert.strictEqual(items[5].quality, 21, 'Failed');
    });
  });
  // Has its own quality system
  describe('(15,50) - Dont pass 50 quality', () => {
    it('should have quality 50', () => {
      assert.strictEqual(items[6].quality, 50, 'Failed');
    });
  });
  // Increase by 2
  describe('(11,0) - quality +2 when day <= 10', () => {
    it('should have sell_in 10', () => {
      assert.strictEqual(items[7].sell_in, 10, 'Failed');
    });
    it('should have quality 2', () => {
      assert.strictEqual(items[7].quality, 2, 'Failed');
    });
  });
  // increase by 3
  describe('(6,0) - quality +3 when day <= 5', () => {
    it('should have sell_in 5', () => {
      assert.strictEqual(items[8].sell_in, 5, 'Failed');
    });
    it('should have quality 3', () => {
      assert.strictEqual(items[8].quality, 3, 'Failed');
    });
  });
  // Date Passes
  describe('(0,40) - past concert ', () => {
    it('should have sell_in -1  ', () => {
      assert.strictEqual(items[9].sell_in, -1, 'Failed'); 
    });
    it('should have quality 0', () => {
      assert.strictEqual(items[9].quality, 0, 'Failed');
    });
  });
}); 
