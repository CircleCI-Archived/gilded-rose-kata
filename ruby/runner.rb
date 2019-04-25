#!/usr/bin/ruby -w

require 'fileutils'

require File.join(File.dirname(__FILE__), 'gilded_rose')

if ARGV.length != 2
  puts "Usage: ruby runner.rb <in-file> <out-file>"
  exit 1
end

in_file, out_file = ARGV

puts "Reading from #{in_file}, writing to #{out_file}"

items = IO.readlines(in_file)
  .map(&:strip)
  .reject { |l| l.empty? || l.start_with?(";") }
  .map { |l| l.split("__") }
  .map { |name, sell_in, quality|
    Item.new(name, sell_in.to_i, quality.to_i)
  }

rose = GildedRose.new(items)
rose.update_quality

output = items
  .map { |i| [i.name, i.sell_in, i.quality].join("__") }
  .join("\n")

FileUtils.mkdir_p(File.dirname(out_file))
IO.write(out_file, output)
