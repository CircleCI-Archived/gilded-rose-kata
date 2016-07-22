(ns gilded-rose.core)

(defn dec-sell-in
  [{:keys [sell-in] :as item}]
  (assoc item
    :sell-in (dec sell-in)))

(defn change-quality
  [{:keys [sell-in quality] :as item} neg-quality-fn]
  (assoc item
    :quality (if (neg? sell-in)
               (neg-quality-fn quality)
               quality)))

(defn update-quality
  [items]
  (map
    (fn [item] (cond
                 (and (< (:sell-in item) 0)
                      (= "Backstage passes to a TAFKAL80ETC concert" (:name item)))
                 (merge item {:quality 0})

                 (= "Conjured" (:name item))
                 (-> item
                     (change-quality #(- % 4))
                     dec-sell-in)

                 (and (= (:name item) "Backstage passes to a TAFKAL80ETC concert") (>= (:sell-in item) 5)
                      (< (:sell-in item) 10))
                 (merge item {:quality (inc (inc (:quality item)))})

                 (and (= (:name item) "Backstage passes to a TAFKAL80ETC concert") (>= (:sell-in item) 0)
                      (< (:sell-in item) 5))
                 (merge item {:quality (inc (inc (inc (:quality item))))})

                 (#{"Aged Brie"
                    "Backstage passes to a TAFKAL80ETC concert"}
                   (:name item))
                 (if (< (:quality item) 50)
                   (merge item {:quality (inc (:quality item))})
                   item)

                 (neg? (:sell-in item))
                 (if (#{"+5 Dexterity Vest"
                        "Elixir of the Mongoose"}
                       (:name item))
                   (merge item {:quality (max (- (:quality item) 2)
                                              0)})
                   item)

                 :else item))
    (map (fn [item]
           (if (not= "Sulfuras, Hand of Ragnaros" (:name item))
             (merge item {:sell-in (dec (:sell-in item))})
             item))
         items)))

;; BEGIN OFF LIMITS
(defn item [item-name, sell-in, quality]
  {:name item-name, :sell-in sell-in, :quality quality})
;; END OFF LIMITS

(defn update-current-inventory
  []
  (let [inventory
        [
         (item "+5 Dexterity Vest" 10 20)
         (item "Aged Brie" 2 0)
         (item "Elixir of the Mongoose" 5 7)
         (item "Sulfuras, Hand Of Ragnaros" 0 80)
         (item "Backstage passes to a TAFKAL80ETC concert" 15 20)
         ]]
    (update-quality inventory)
    ))
