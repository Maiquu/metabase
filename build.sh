#!/bin/bash

DIR=$(dirname $(realpath $0))
DRIVER_PATH="$DIR/modules/drivers/starburst"

clojure \
  -Sdeps "{:aliases {:starburst {:extra-deps {com.metabase/starburst-driver {:local/root \"$DRIVER_PATH\"}}}}}"  \
  -X:build:starburst \
  build-drivers.build-driver/build-driver! \
  "{:driver :starburst, :project-dir \"$DRIVER_PATH\", :target-dir \"$DRIVER_PATH/target\"}"
