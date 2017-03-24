# -*- coding: utf-8 -*-

BASE_RATE = 1
MAX_QUALITY = 50
MIN_QUALITY = 0


class GildedRose(object):

    def __init__(self, items):
        self.items = items

    def _appreciate(self, item):
        """
        Calculate the daily change for items that are *appreciating*.
        """
        appreciate_delta = getattr(item, 'rate', +BASE_RATE)
        if item.name == "Aged Brie":
            return appreciate_delta
        if item.name.lower().startswith("backstage pass"):
            if item.sell_in > 10:
                return appreciate_delta
            if 10 >= item.sell_in > 5:
                return appreciate_delta * 2
            if 5 >= item.sell_in > 0:
                return appreciate_delta * 3
        return False

    def _depreciate(self, item):
        """
        Calculate the daily change for items that are *depreciating*.
        """
        depreciate_delta = getattr(item, 'rate', -BASE_RATE)
        if item.quality == MIN_QUALITY:
            return 0
        if item.name.lower().startswith("conjured"):
            depreciate_delta = depreciate_delta * 2
        return depreciate_delta

    def update_quality(self):
        for item in self.items:
            if item.name == "Sulfuras, Hand of Ragnaros" or "legendary" in item.name.lower():
                continue  # legendary items never change quality
            quality_change = self._appreciate(item)
            if quality_change is False:
                quality_change = self._depreciate(item)
            item.quality = item.quality + quality_change
            item.quality = min([item.quality, MAX_QUALITY])
            item.quality = max([item.quality, MIN_QUALITY])
            if item.name.lower().startswith("backstage pass") and item.sell_in < 1:
                item.quality = 0
            item.sell_in = item.sell_in - 1


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)
