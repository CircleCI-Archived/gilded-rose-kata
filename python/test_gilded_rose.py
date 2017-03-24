# -*- coding: utf-8 -*-
import unittest

from gilded_rose import Item, GildedRose

class GildedRoseTest(unittest.TestCase):
    def test_sulfuras(self):
        # Arrange
        items = [Item("Sulfuras, Hand of Ragnaros", 0, 80)]
        gilded_rose = GildedRose(items)
        # Act
        gilded_rose.update_quality()
        gilded_rose.update_quality()
        # Assert
        self.assertEquals("Sulfuras, Hand of Ragnaros", items[0].name)
        self.assertEquals(80, items[0].quality)

    def test_foo(self):
        items = [Item("foo", 0, 0)]
        gilded_rose = GildedRose(items)
        gilded_rose.update_quality()
        self.assertEquals("foo", items[0].name)

if __name__ == '__main__':
    unittest.main()
