# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items

    def update_sellin(self,item,num):
        item.sell_in = item.sell_in + num

    def set_quality(self,item,num):
        item.quality = item.quality + num
        if item.quality < 0:
            item.quality = 0
        elif (item.quality > 50):
            item.quality = 50

    def update_quality(self):
        for item in self.items:
            self.update_sellin(item,-1)
            if item.name not in ["Aged Brie","Backstage passes to a TAFKAL80ETC concert","Sulfuras, Hand of Ragnaros","Conjured Mana Cake"]:
                if (item.sell_in < 0):
                    self.set_quality(item,-2)
                else:
                    self.set_quality(item,-1)
            elif item.name in["Conjured Mana Cake"]:
                if (item.sell_in < 0):
                    self.set_quality(item,-4)
                else:
                    self.set_quality(item,-2)
            elif item.name in ["Aged Brie"]:
                self.set_quality(item,1)
            elif item.name in ["Backstage passes to a TAFKAL80ETC concert"]:
                if (item.sell_in <=10 and item.sell_in > 5):
                    self.set_quality(item, 2)
                elif (item.sell_in <=5 and item.sell_in > 0):
                    self.set_quality(item, 3)
                elif (item.sell_in <= 0):
                    self.set_quality(item, -item.quality)
                else:
                    self.set_quality(item,1)
            elif item.name in ["Sulfuras, Hand of Ragnaros"]:
                self.update_sellin(item,1) #re set sell in for legendary item


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)

