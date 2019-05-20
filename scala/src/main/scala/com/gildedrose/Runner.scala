package com.gildedrose

import java.io.IOException
import java.nio.charset.StandardCharsets
import java.nio.file.{Files, Paths}

import scala.collection.JavaConverters._

object Runner {
  def main(args: Array[String]): Unit = {
    System.out.println(args(0))
    if (args.length < 2) {
      System.out.println("Please pass in and out file args")
      System.exit(1)
    }

    val inFile = args(0)
    val outFile = args(1)

    System.out.println("Reading from: " + inFile + ".  Writing to: " + outFile)

    val items = Files.lines(Paths.get(inFile)).iterator().asScala
      .filter(s => !(s.isEmpty || s.startsWith(";")))
      .map(s => {
        val Array(name, sellIn, quality) = s.split("__")
        new Item(name, sellIn.toInt, quality.toInt)
      })

    val gildedRose = new GildedRose(items.toArray)
    gildedRose.updateQuality()

    val outString = gildedRose.items.map(i => Array(i.name, i.sellIn, i.quality).mkString("__")).mkString("\n")

    try {
      Files.write(Paths.get(outFile), outString.getBytes(StandardCharsets.US_ASCII))
    } catch {
      case e: IOException => {
        System.out.println("Error writing outfile: " + outFile)
        System.exit(1)
      }
    }
  }
}
