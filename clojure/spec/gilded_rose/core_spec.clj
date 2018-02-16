(ns gilded-rose.core-spec
(:require [clojure.test :refer :all]
          [gilded-rose.core :refer [update-quality item]]))

(deftest update-quality
  (testing "regular items"
    (testing "before sell-by date"
      (is (= [(item "foo" 4 6)]
             (update-quality [(item "foo" 5 7)]))))))
