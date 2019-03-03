package com.gildedrose;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Runner {
    private static Item itemFromLine(String itemLine) {
        String[] pieces = itemLine.split("__");
        return new Item(pieces[0], Integer.parseInt(pieces[1]), Integer.parseInt(pieces[2]));
    }

    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Please pass in and out file args");
            System.exit(1);
        }

        String inFile = args[0];
        String outFile = args[1];

        System.out.println("Reading from: " + inFile + ".  Writing to: " + outFile);

        Item[] items = null;

        try (Stream<String> stream = Files.lines(Paths.get(inFile))) {
            items = stream.filter(s -> !(s.isEmpty() || s.startsWith(";")))
                    .map(Runner::itemFromLine)
                    .toArray(Item[]::new);
        } catch (IOException e) {
            System.out.println("Error reading infile: " + inFile);
            System.exit(1);
        }

        GildedRose gildedRose = new GildedRose(items);
        gildedRose.updateQuality();

        String outString = Stream.of(gildedRose.items)
                .map(item -> String.join("__",
                        item.name,
                        Integer.toString(item.sellIn),
                        Integer.toString(item.quality)))
                .collect(Collectors.joining("\n"));

        try {
            Files.write(Paths.get(outFile), outString.getBytes(StandardCharsets.US_ASCII));
        } catch (IOException e) {
            System.out.println("Error writing outfile: " + outFile);
            System.exit(1);
        }
    }
}
