# -*- coding: utf-8 -*-
import unittest

from gilded_rose import GildedRose, Item


class GildedRoseTest(unittest.TestCase):
    def test_foo(self):
        items = [Item("foo", 0, 0)]
        gilded_rose = GildedRose(items)
        gilded_rose.update_quality()
        self.assertEquals("fixme", items[0].name)

    def test_1(self):
        """
        All items have a sell-in value which denotes the number of days we have to sell the item
        """
        pass

    def test_2(self):
        """
        All items have a quality value which denotes how valuable the item is
        """
        pass

    def test_3(self):
        """
        All items have a quality value which denotes how valuable the item is
        """
        pass

    def test_4(self):
        """
        At the end of each day our system lowers both values for every item
        """
        pass

    def test_5(self):
        """
        Once the sell by date has passed, quality degrades twice as fast
        """

    def test_6(self):
        """
        The quality of an item is never negative
        """

    def test_7(self):
        """
        "Aged Brie" actually increases in quality the older it gets
        """

    def test_8(self):
        """
        The quality of an item is never more than 50
        """

    def test_9(self):
        """
        "Sulfuras", being a legendary item, never has to be sold or decreases in quality
        """

    def test_10(self):
        """
        "Backstage passes", like aged brie, increases in quality as its sell-in value approaches; quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert
        """

    def test_11(self):
        """
        """

    def test_12(self):
        """
        """


if __name__ == "__main__":
    unittest.main()
