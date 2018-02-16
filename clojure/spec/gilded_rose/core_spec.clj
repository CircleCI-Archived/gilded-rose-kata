(ns gilded-rose.core-spec
(:require [clojure.test :refer :all]
          [gilded-rose.core :refer [update-quality]]))

(deftest update-quality
  (testing "regular items"
    (testing "before sell-by date"
      (is (= [(gr/item "foo" 4 6)]
             (gr/update-quality [(gr/item "foo" 5 7)]))))))
