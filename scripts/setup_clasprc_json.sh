#!/bin/sh

CLASPRC_JSON=$(cat <<-END
  {
    "token": {
      "access_token": "$ACCESS_TOKEN",
      "refresh_token": "$REFRESH_TOKEN",
      "scope": "$SCOPE",
      "token_type": "Bearer",
      "id_token": "$ID_TOKEN",
      "expiry_date": $EXPIRY_DATE
    },
    "oauth2ClientSettings": {
      "clientId": "$CLIENT_ID",
      "clientSecret": "CLIENT_SECRET",
      "redirectUri": "http://localhost"
    },
    "isLocalCreds": false
  }
END
)

echo $CLASPRC_JSON > ~/.clasprc.json
