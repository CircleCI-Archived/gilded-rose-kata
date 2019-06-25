class Item {
  constructor(name, sell_in, quality) {
    this.name = name;
    this.quality = quality;
    this.sell_in = sell_in;
  }
  UpdateItem(){
    this.UpdateSell_in();
    this.UpdateQuality();
    this.HandleMinMaxQuality();
  }

  UpdateSell_in() {
    this.sell_in--;
  }

  UpdateQuality() {
    this.quality = this.sell_in >= 0 ? this.quality - 1 : this.quality - 2;
  }

  HandleMinMaxQuality() {
    this.quality = this.quality > 50 ? 50 : this.quality;
    this.quality = this.quality < 0 ? 0 : this.quality;
  }
}

class Aged_Brie extends Item {
  constructor(name, sell_in, quality) {
    super(name, sell_in, quality);
  }
  UpdateQuality(){
    this.quality = this.sell_in >= 0 ? this.quality + 1 : this.quality + 2;
  }
}

class Tickets extends Item {
  constructor(name, sell_in, quality) {
    super(name, sell_in, quality);
  }
  UpdateQuality(){
    if (this.sell_in < 0){
      this.quality = 0;
    } else {
      this.quality++;
      this.quality = this.sell_in <= 10 ? this.quality + 1 : this.quality;
      this.quality = this.sell_in <= 5 ? this.quality + 1 : this.quality;
    }
  }
}

class Legendary_Item extends Item {
  constructor(name, sell_in, quality) {
    super(name, sell_in, quality);
  }
  UpdateItem() {
    this.quality = 80;
  }
}

class Conjured_Item extends Item {
  constructor(name, sell_in, quality) {
    super(name, sell_in, quality);
  }
  UpdateQuality(){
    this.quality = this.sell_in >= 0 ? this.quality - 2 : 0;
  }
}

module.exports = { Item, Aged_Brie, Legendary_Item, Conjured_Item, Tickets}