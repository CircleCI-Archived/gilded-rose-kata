package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func main() {
	inFile := os.Args[1]
	outFile := os.Args[2]
	fmt.Printf("Reading from: %v.  Writing to: %v\n", inFile, outFile)
	dat, err := ioutil.ReadFile(inFile)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(dat), "\n")
	items = nil
	for i := 0; i < len(lines); i++ {
		if !strings.HasPrefix(lines[i], ";") && (lines[i] != "") {
			pieces := strings.Split(lines[i], "__")
			name := pieces[0]
			sellIn, _ := strconv.Atoi(pieces[1])
			quality, _ := strconv.Atoi(pieces[2])
			items = append(items, Item{name, sellIn, quality})
		}
	}

	GildedRose()

	var outStrings []string
	for i := 0; i < len(items); i++ {
		outStrings = append(outStrings, fmt.Sprintf("%v__%v__%v", items[i].name, items[i].sellIn, items[i].quality))
	}
	err = ioutil.WriteFile(outFile, []byte(strings.Join(outStrings, "\n")), 06444)
	if err != nil {
		panic(err)
	}
}
