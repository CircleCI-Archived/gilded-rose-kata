const {Item} = require('../app/items');
const expect = require('chai').expect;

describe('#+5 Dexterity Vest', () => {
    context('(10,20) regular', () => {
      let Default = new Item('+5 Dexterity Vest', 10, 20);
      Default.UpdateItem();
      it('should have sell_in 9', () => {
        expect(Default.sell_in).to.equal(9);
      });
      it('should have quality 19', () => {
        expect(Default.quality).to.equal(19);
      });
    });
    context('(0,20) double decay', () => {
      let PastSell_in = new Item('+5 Dexterity Vest', 0, 20);
      PastSell_in.UpdateItem();
      it('should have quality 18', () => {
        expect(PastSell_in.quality).to.equal(18);
      });
    });
  });