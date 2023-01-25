import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import UselessComponent from '../Components/UselessComponent';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Server Status Blank Page</title>
        <link rel="icon" type="image/x-icon" href="/icon.png"/>
      </Head>
      <UselessComponent/>
    </div>
  );
};

export default Home;