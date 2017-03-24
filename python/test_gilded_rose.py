# -*- coding: utf-8 -*-
import unittest

from gilded_rose import Item, GildedRose


class GildedRoseTest(unittest.TestCase):
    def test_legendary(self):
        # Arrange
        items = [Item("Legendary Shamrock", 0, 80)]
        gilded_rose = GildedRose(items)
        # Act
        gilded_rose.update_quality()
        gilded_rose.update_quality()
        # Assert
        self.assertEquals(80, items[0].quality)

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

    def test_expired(self):
        # Arrange
        items = [Item("Backstage pass for Elvis", 0, 12)]
        gilded_rose = GildedRose(items)
        # Act
        gilded_rose.update_quality()
        # Assert
        self.assertEquals(0, items[0].quality)

    def test_always_worthless(self):
        # Arrange
        items = [Item("Old Trash", 3, 0)]
        gilded_rose = GildedRose(items)
        # Act
        gilded_rose.update_quality()
        # Assert
        self.assertEquals(0, items[0].quality)

    def test_conjured(self):
        # Arrange
        items = [Item("Conjured Mana Cake", 3, 8)]
        gilded_rose = GildedRose(items)
        # Act
        gilded_rose.update_quality()
        gilded_rose.update_quality()
        # Assert
        self.assertEquals(4, items[0].quality)

if __name__ == '__main__':
    unittest.main()
