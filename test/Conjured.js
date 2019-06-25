const {Conjured_Item} = require('../app/items');
const expect = require('chai').expect;

describe('#Conjured Mana Biscuit', () => { 
    context('(2,0) - quality increase', () => {
      let Default = new Conjured_Item('Conjured Mana Biscuit', 2, 10);
      Default.UpdateItem();
      it('should have quality 8', () => {
        expect(Default.quality).to.equal(8);
      });
    });
  
    context('(0,0) - past sell by day', () => {
      let PastSellBy = new Conjured_Item('Conjured Mana Biscuit', 0, 0);
      PastSellBy.UpdateItem();
      it('should have quality 0', () => {
        expect(PastSellBy.quality).to.equal(0);
      });
    });
  });
  