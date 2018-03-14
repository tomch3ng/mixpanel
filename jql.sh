#! /bin/bash
curl https://mixpanel.com/api/2.0/jql -u $MIXPANEL_API_KEY: --data-urlencode script@$1