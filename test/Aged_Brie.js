const {Aged_Brie} = require('../app/items');
const expect = require('chai').expect;

describe('#Aged Brie', () => { 
    context('(2,0) - quality increase', () => {
      let Default = new Aged_Brie('Aged Brie', 2, 0);
      Default.UpdateItem();
      it('should have quality 1', () => {
        expect(Default.quality).to.equal(1);
      });
    });
    context('(0,0) - past sell by day', () => {
      let PastSellBy = new Aged_Brie('Aged Brie', 0, 0);
      PastSellBy.UpdateItem();
      it('should have quality 1', () => {
        expect(PastSellBy.quality).to.equal(2);
      });
    });
  });
  