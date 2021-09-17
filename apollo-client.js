// IMPORT FROM THIRD PARTY
import * as Realm from "realm-web"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

// GET THE REALM APP AND GRAPHQL URI BY ID
const APP_ID = process.env.REACT_APP_ID
const app = new Realm.App({ id: APP_ID });
const graphqlUri = `https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

// GETS A VALID REALM USER ACCESS TOKEN TO AUTHENTICATE REQUESTS
const getValidAccessToken = async () => {

    // Guarantee that there's a logged in user with a valid access token
    if (!app.currentUser) {

        // If no user is logged in, log in an anonymous user.
        // The logged in user will have a valid access token.
        await app.logIn(Realm.Credentials.anonymous());
    } else {

        // An already logged in user's access token might be stale. To guarantee that the token is
        // valid, we refresh the user's custom data which also refreshes their access token.
        await app.currentUser.refreshCustomData();
    }

    // return access token from current user
    return app.currentUser.accessToken
}

// CREATE APOLLO CLIENT
const client = new ApolloClient({
    link: new HttpLink({
        uri: graphqlUri,
        // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
        // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
        // access token before sending the request.
        fetch: async (uri, options) => {
            const accessToken = await getValidAccessToken();
            options.headers.Authorization = `Bearer ${accessToken}`;
            return fetch(uri, options);
        },
    }),
    cache: new InMemoryCache(),
});

export default client