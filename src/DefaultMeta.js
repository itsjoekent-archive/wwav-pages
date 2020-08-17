import React from 'react';
import { Helmet } from 'react-helmet';

export default function DefaultMeta() {
  return (
    <Helmet>
      <title>Create your own voter registration page</title>
      <meta name="title" content="Create your own voter registration page" />
      <meta name="og:title" content="Create your own voter registration page" />
      <meta name="twitter:title" content="Create your own voter registration page" />
      <meta name="description" content="Join When We All Vote to make sure every eligible voter is registered and ready to vote in every election." />
      <meta name="og:description" content="Join When We All Vote to make sure every eligible voter is registered and ready to vote in every election." />
      <meta name="twitter:description" content="Join When We All Vote to make sure every eligible voter is registered and ready to vote in every election." />
    </Helmet>
  );
}
