var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': "https://api.twitter.com/oauth/request_token",
  'authorize_url': "https://api.twitter.com/oauth/authorize",
  'access_url': "https://api.twitter.com/oauth/access_token",
  'consumer_key': "8noH57m9eXeahi0vxaV3eaF0u",
  'consumer_secret': "M63fj8VE1Dt4K5P1OgZcANkXgPpMfO2glo8VhKEff0f3qSL0cv"
});

function callback(resp, xhr) {
  // ... Process text response ...
  console.log(resp);
  console.log(xhr);
};

function onAuthorized() {
  var url = 'https://api.twitter.com/1.1/direct_messages.json';
  var request = {
    'method': 'GET'
  };
  oauth.sendSignedRequest(url, callback, request);
}


oauth.authorize(onAuthorized);
