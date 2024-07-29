# Documentation for the Server

- <https://www.npmjs.com/package/passport-mediawiki-oauth>
- <https://wikitech.wikimedia.org/wiki/Help:Toolforge/My_first_NodeJS_OAuth_tool>

## Auth flow

The app initiates the flow by crafting a URL containing client ID, response_type

```bash
<a href="https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code"> Login </a>
```

Note that this is not an HTTP call your application is making, instead this is a URL that the user will click on to redirect their browser to the OAuth server.

### Auth routes

Upon being directed to the authorization server, the user sees the authorization request. If the user approves the request, they will be redirected back to the app along with the auth code and state parameters.

The redirect will include a “code” in the URL. Make a post request to

```bash
/api/v1/auth/login
```

and pass the code as the request body. It returns an access token and a refresh token which the user need to use to make subsequent requests.

To get a new access token, submit a POST request using your refresh token to

```bash
/api/v1/auth/access-token
```

Refresh tokens are valid for 365 days while access tokens are valid for four hours.
