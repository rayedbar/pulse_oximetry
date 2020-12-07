import React from "react";
import ReactDOM from "react-dom";
import Amplify, { Auth } from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import App from "./components/App.jsx";
import theme from "./theme";
import awsConfig from "./aws-exports";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

Amplify.configure(awsConfig);

const url = awsConfig.aws_appsync_graphqlEndpoint;
const region = awsConfig.aws_appsync_region;
const auth = {
  type: awsConfig.aws_appsync_authenticationType,
  jwtToken: async () =>
    (await Auth.currentSession()).getIdToken().getJwtToken(),
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }),
]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getIndividual(_, { args, toReference }) {
          return toReference({
            __typename: "Individual",
            id: args.id,
          });
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: link,
  cache: cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
