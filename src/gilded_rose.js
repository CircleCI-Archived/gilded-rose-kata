function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

let items = []

const update_quality = (items) => {

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
          // Regular +1
          qualityModifer(currentItem, 1);
        } else if (currentItem.sell_in > 5){
          // Close to date +2
          qualityModifer(currentItem, 2);
        } else if (currentItem.sell_in >= 0){
          // Super close to date +3
          qualityModifer(currentItem, 3);
        } else {
          // Concert date has past, 0 quality
          currentItem.quality = 0;
        }
        break;
      default:
        // If a conjured item
        if (currentItem.name.toLowerCase().includes('conjured')){
          currentItem.sell_in >= 0 ? qualityModifer(currentItem, -2) : qualityModifer(currentItem, -4);
        } else {
          // Regular item
          currentItem.sell_in >= 0 ? qualityModifer(currentItem, -1) : qualityModifer(currentItem, -2);
        }
      break;
    }
  });
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
            // Regular +1
            qualityModifer(currentItem, 1);
          } else if (currentItem.sell_in > 5){
            // Close to date +2
            qualityModifer(currentItem, 2);
          } else if (currentItem.sell_in >= 0){
            // Super close to date +3
            qualityModifer(currentItem, 3);
          } else {
            // Concert date has past, 0 quality
            currentItem.quality = 0;
          }
          break;
        default:
          // If a conjured item
          if (currentItem.name.toLowerCase().includes('conjured')){
            currentItem.sell_in >= 0 ? qualityModifer(currentItem, -2) : qualityModifer(currentItem, -4);
          } else {
            // Regular item
            currentItem.sell_in >= 0 ? qualityModifer(currentItem, -1) : qualityModifer(currentItem, -2);
          }
        break;
      }
    });
  } 
}
