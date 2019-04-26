(ns gilded-rose.runner
  (:require [clojure.string :as str]
            [gilded-rose.core :as grc]))
(defn -main
  [& args]
  (when (< (count args) 1)
    (do
      (.println System/out "Please supply test file")
      (System/exit 1)))
  (when (< (count args) 2)
    (do
      (.println System/out "Please supply out file location")
      (System/exit 1)))

  (let [test-file (first args)
        out-file (second args)]
    (.println System/out (str "Reading from: " test-file ".  Writing to: " out-file))
    (let [test-input (slurp test-file)
          inventory-strs (filter (fn [s] (not (or (empty? s) (str/starts-with? s ";"))))
                                 (str/split test-input #"\n"))
          inventory (map #(let [[name sell-in quality] (str/split % #"__")]
                            (grc/item name (Integer/parseInt sell-in) (Integer/parseInt quality)))
                         inventory-strs)
          new-inventory (grc/update-quality inventory)
          new-inventory-str (str/join "\n" (map (fn [{:keys [name sell-in quality]}]
                                                  (str/join "__" [name sell-in quality]))
                                                new-inventory))]
      (spit out-file new-inventory-str))))
