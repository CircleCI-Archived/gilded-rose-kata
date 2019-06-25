const {Legendary_Item} = require('../app/items');
const expect = require('chai').expect;

describe('#Sulfuras, Hand of Ragnaros', () => {
    context('(0,80) - Regular ', () => {
      let Default = new Legendary_Item('Sulfuras, Hand of Ragnaros', 0, 80);
      Default.UpdateItem();
      it('should have quality 80', () => {
        expect(Default.quality).to.equal(80);
      });
    });
    context('(-1,80) - no double decay past sell by date', () => {
      let PastSellBy = new Legendary_Item('Sulfuras, Hand of Ragnaros', -1, 80);
      PastSellBy.UpdateItem();
      it('should have quality 80', () => {
        expect(PastSellBy.quality).to.equal(80);
      });
    });
  });