function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

var update_quality  = (items) => {
  for (var i = 0; i < items.length; i++) {
    // Sell_in 
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          // Quality above zero and not Brie or Tickets or Hand of Rag
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        // Brie / Tickets
        items[i].quality = items[i].quality + 1;

        // TICKETS START
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
        }
        // TICKETS END
      } // if 50 or above do nothing
    } // End first statement


    // For items that are past sell by date
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1;
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
      }
    }
  }
}


module.exports = {
  
  Item: function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  },

  UpdateItems: update_quality = (items) => {

    const qualityModifer = (item, change) => {
      // Increase or decrease quality
      item.quality = item.quality + change;
      // If over 50, set to 50, else keep it where it is at
      item.quality = item.quality > 50 ? 50 : item.quality;
      // If Quality is less than zero, set it to zero.
      item.quality < 0 && (item.quality = 0);
    }

    items.map((currentItem) => {
      // Decrement sell_in
      currentItem.name != 'Sulfuras, Hand of Ragnaros' && currentItem.sell_in--;
      switch (currentItem.name){
        case 'Aged Brie':
          qualityModifer(currentItem, 1);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // Do Nothing as Hand of Rag doesn't Change
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (currentItem.sell_in > 10){
            qualityModifer(currentItem, 1);
          } else if (currentItem.sell_in > 5){
            qualityModifer(currentItem, 2);
          } else if (currentItem.sell_in >= 0){
            qualityModifer(currentItem, 3);
          } else {
            currentItem.quality = 0;
          }
          break;
        default:
          if (currentItem.name.toLowerCase().includes('conjured')){
            currentItem.sell_in >= 0 ? qualityModifer(currentItem, -2) : qualityModifer(currentItem, -4);
          } else {
            currentItem.sell_in >= 0 ? qualityModifer(currentItem, -1) : qualityModifer(currentItem, -2);
          }
        break;
      }
    });
  } 
}
