#!/bin/sh

CLASP_JSON=$(cat <<-END
  {
    "scriptId": "$SCRIPT_ID"
  }
END
)

echo $CLASP_JSON > ~/.clasp.json
