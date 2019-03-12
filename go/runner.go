package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func main() {
	if err := run(os.Args); err != nil {
		fmt.Fprintf(os.Stderr, "Error:%v\n", err)
		os.Exit(1)
	}
}

func run(args []string) error {
	if len(args) != 3 {
		return fmt.Errorf("Usage:\n  %s INPUT_FILENAME OUTPUT_FILENAME", args[0])
	}

	inFilename := os.Args[1]
	outFilename := os.Args[2]
	fmt.Printf("Reading from: %v.  Writing to: %v\n", inFilename, outFilename)

	file, err := os.Open(inFilename)
	if err != nil {
		return err
	}
	scanner := bufio.NewScanner(file)
	items := []Item{}
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, ";") || line == "" {
			continue
		}

		pieces := strings.SplitN(line, "__", 3)
		if len(pieces) != 3 {
			return fmt.Errorf("invalid line in input file: %v", line)
		}
		sellIn, _ := strconv.Atoi(pieces[1])
		quality, _ := strconv.Atoi(pieces[2])
		items = append(items, Item{name: pieces[0], sellIn: sellIn, quality: quality})
	}

	GildedRose(items)

	buf := bytes.NewBuffer(nil)
	for _, item := range items {
		buf.WriteString(fmt.Sprintf("%v__%v__%v\n", item.name, item.sellIn, item.quality))
	}
	return ioutil.WriteFile(outFilename, buf.Bytes(), 0644)
}
