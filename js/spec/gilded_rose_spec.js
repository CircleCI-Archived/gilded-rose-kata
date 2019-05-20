if (typeof require === 'function') {
  var gilded_rose = require('../src/gilded_rose.js');
  var Item = gilded_rose.Item;
  var update_quality = gilded_rose.update_quality;
}

describe("Gilded Rose", function() {

  it("should foo", function() {
    var items = update_quality([ new Item("foo", 0, 0) ]);
    expect(items[0].name).toEqual("fixme");
  });

});
