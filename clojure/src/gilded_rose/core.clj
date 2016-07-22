(ns gilded-rose.core)

(def name-backstage-passes "Backstage passes to a TAFKAL80ETC concert")
(def name-sulfuras "Sulfuras, Hand of Ragnaros")
(def name-brie "Aged Brie")
(def name-conjured "Conjured")

(def quality-reduction 2)
(def quality-min 0)
(def quality-max 50)

(defn dec-sell-in
  [{:keys [sell-in] :as item}]
  (assoc item
    :sell-in (dec sell-in)))

(defn bound-quality
  [{:keys [quality] :as item}]
  (assoc item
    :quality (-> quality
                 (max quality-min)
                 (min quality-max))))

(defn update-quality
  ([item]
   (update-quality #(- % quality-reduction) item))
  ([neg-quality-fn {:keys [sell-in quality] :as item}]
   (bound-quality
     (assoc item
       :quality (if (neg? sell-in)
                  (neg-quality-fn quality)
                  quality)))))

(defn backstage-passes-update-quality
  [{:keys [sell-in quality] :as item}]
  (bound-quality
    (assoc item
      :quality (cond (neg? sell-in)
                     0

                     (> 5 sell-in)
                     (+ quality 3)

                     (> 10 sell-in)
                     (+ quality 2)

                     :else
                     (inc quality)))))

(defn brie-update-quality
  [{:keys [quality] :as item}]
  (bound-quality
    (assoc item
      :quality (inc quality))))

(defn sulfuras-update-quality
  [item]
  (assoc item
    :quality 80))

(defn update-items
  [items]
  (map
    (fn [{:keys [name] :as item}]
      (let [[update-quality-fn updated-sell-in-fn]
            (condp = name
              name-sulfuras
              [sulfuras-update-quality
               identity]

              name-backstage-passes
              [backstage-passes-update-quality
               dec-sell-in]

              name-brie
              [brie-update-quality
               dec-sell-in]

              name-conjured
              [(partial update-quality #(- % (* 2 quality-reduction)))
               dec-sell-in]

              [update-quality
               dec-sell-in])]
        (-> item
            updated-sell-in-fn
            update-quality-fn)))
    items))

;; BEGIN OFF LIMITS
(defn item [item-name, sell-in, quality]
  {:name item-name, :sell-in sell-in, :quality quality})
;; END OFF LIMITS

(defn update-current-inventory
  []
  (let [inventory
        [
         (item "+5 Dexterity Vest" 10 20)
         (item name-brie 2 0)
         (item "Elixir of the Mongoose" 5 7)
         (item name-sulfuras 0 80)
         (item name-backstage-passes 15 20)
         ]]
    (update-items inventory)
    ))
