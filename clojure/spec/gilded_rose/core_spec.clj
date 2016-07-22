(ns gilded-rose.core-spec
  (:require [speclj.core :refer :all]
            [gilded-rose.core :as gr.c]))

(defn every-call-to-update-quality
  ([items pred]
    (every-call-to-update-quality items pred 10000))
  ([items pred n]
   (let [updated-items-seq (take n (iterate gr.c/update-items items))
         f-should-be (fn [& args]
                       (should-be (fn [[_ items_n-1 items_n]]
                                    (every? (fn [args]
                                              (apply pred args))
                                            (map list
                                                 items_n
                                                 items_n-1)))
                                  args))]
     (doall (map f-should-be
                 (rest (range))
                 updated-items-seq
                 (rest updated-items-seq))))))

(describe
  "gilded rose - update-quality"
  (it "when given an empty list, returns an empty list"
      (should (empty? (gr.c/update-items []))))
  (it "Aged Brie's quality gets better"
      (every-call-to-update-quality
        [(gr.c/item "Aged Brie"
                    100
                    0)]
        (fn [{:keys [quality]} prev-item]
          (or (= (inc (:quality prev-item))
                 quality)
              (= 50 quality)))))
  (it "Conjured items quality degrades twice as fast"
      (every-call-to-update-quality
        [(gr.c/item "Conjured"
                    100
                    50)]
        (fn [{:keys [sell-in quality]} prev-item]
          (or (not (neg? sell-in))
              (= (max (- (:quality prev-item) 4)
                      0)
                 quality)))))
  (it "Backstage passes quality gets better, then goes to zero"
      (every-call-to-update-quality
        [(gr.c/item "Backstage passes to a TAFKAL80ETC concert"
                    15
                    20)]
        (fn [{:keys [sell-in quality]} prev-item]
          (cond (neg? sell-in)
                (zero? quality)

                (> 5 sell-in)
                (or (= 50 quality)
                    (= (+ (:quality prev-item) 3)
                       quality))

                (> 10 sell-in)
                (or (= 50 quality)
                    (= (+ (:quality prev-item) 2)
                       quality))

                :else
                (or (= 50 quality)
                    (= (+ (:quality prev-item) 1)
                       quality))))))
  (it "no item ever goes above a quality of 50, nor below 0, except sulfuras"
      (every-call-to-update-quality
        (gr.c/update-current-inventory)
        (fn [{:keys [name quality]} _]
          (if (= name gr.c/name-sulfuras)
            (= quality 80)
            (<= 0 quality 50)))))
  (it "normal items degrade in quality after sell-by by 2 till zero"
      (every-call-to-update-quality
        (gr.c/update-current-inventory)
        (fn [{:keys [name quality sell-in]} prev-item]
          (or (= name gr.c/name-sulfuras)
              (= name gr.c/name-backstage-passes)
              (= name gr.c/name-brie)
              (not (neg? sell-in))
              (= (max (- (:quality prev-item) 2)
                      0)
                 quality)))))
  (it "sell-in always goes lower and differs by 1"
      (every-call-to-update-quality
        (gr.c/update-current-inventory)
        (fn [{:keys [name sell-in]} prev-item]
          (or (= name gr.c/name-sulfuras)
              (= (:sell-in prev-item)
                 (inc sell-in))))))
  (it "sell-in is not changed for Sulfuras with proper capitalization"
      (every-call-to-update-quality
        [(gr.c/item "Sulfuras, Hand of Ragnaros"
                    100
                    80)]
        (fn [{:keys [sell-in]} prev-item]
          (= (:sell-in prev-item)
             sell-in)))))

(run-specs)
