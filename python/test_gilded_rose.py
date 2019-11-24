# -*- coding: utf-8 -*-
import unittest

from gilded_rose import GildedRose, Item


class GildedRoseTest(unittest.TestCase):

    def setUp(self):
        items = [
            Item(name="+5 Dexterity Vest", sell_in=10, quality=20),
            Item(name="Aged Brie", sell_in=2, quality=0),
            Item(name="Elixir of the Mongoose", sell_in=5, quality=7),
            Item(name="Sulfuras, Hand of Ragnaros", sell_in=-1, quality=80),
            Item(name="Backstage passes to a TAFKAL80ETC concert", sell_in=15, quality=20),
            Item(name="Conjured Mana Cake", sell_in=3, quality=6),
        ]
        self.gilded_rose = GildedRose(items)

    def sell_in_and_quality_required(self):
        """
        - All items have a sell-in value which denotes the number of days we have
        to sell the item
        - All items have a quality value which denotes how valuable the item is
        """
        self.assertRaises(Exception, Item(name="Aged Brie", sell_in=1))
        self.assertRaises(Exception, Item(name="Poutine", quality=100))

    def test_end_of_business_daily_cron_job(self):
        """
        At the end of each day our system lowers both values for every item
        """
        self.gilded_rose.update_quality()
        assert self.gilded_rose.items[0].quality == 19
        assert self.gilded_rose.items[0].sell_in == 9

    def test_conjured_items(self):
        """
        Once the sell by date has passed, quality degrades twice as fast
        """
        raise Exception("Implement new feature")

    def test_quality_is_never_negative(self):
        """
        The quality of an item is never negative
        """
        self.gilded_rose.update_quality()
        for i in range(0, 10000):
            self.gilded_rose.update_quality()
            assert self.gilded_rose.items[0].quality >= 0

    def test_quality_items_increase_older(self):
        """
        "Aged Brie" actually increases in quality the older it gets
        """
        previous_quality = self.gilded_rose.items[1].quality
        assert previous_quality == 0
        self.gilded_rose.update_quality()
        new_quality = self.gilded_rose.items[1].quality
        assert new_quality > previous_quality

    def test_quality_max_limit(self):
        """
        The quality of an item is never more than 50
        """
        for i in range(0, 1000):
            self.gilded_rose.update_quality()
            assert self.gilded_rose.items[0].quality <= 50

    def test_legendary_items_dont_decrease_quality(self):
        """
        "Sulfuras", being a legendary item, never has to be sold or decreases
        in quality
        """
        previous_quality = self.gilded_rose.items[3].quality
        for i in range(0, 1000):
            self.gilded_rose.update_quality()
            assert self.gilded_rose.items[3].quality == previous_quality

    def test_backstage_passes(self):
        """
        "Backstage passes" quality increases by 2 when there are 10 days or less
        and by 3 when there are 5 days or less
        """
        self.gilded_rose.items[4].sell_in = 10
        previous_quality = self.gilded_rose.items[4].quality
        self.gilded_rose.update_quality()
        new_quality = self.gilded_rose.items[4].quality
        assert previous_quality - new_quality == -2
        self.gilded_rose.update_quality()
        assert previous_quality - new_quality == -2
        self.gilded_rose.items[4].sell_in = 5
        previous_quality = self.gilded_rose.items[4].quality
        self.gilded_rose.update_quality()
        new_quality = self.gilded_rose.items[4].quality
        assert previous_quality - new_quality == -3


if __name__ == "__main__":
    unittest.main()
