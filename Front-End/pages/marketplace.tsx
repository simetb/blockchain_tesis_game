import React, { useEffect, useState } from 'react';
import Head from "next/head";
//components
import { MarketCard, MartCard } from '../components';
import { Title } from '../components';
// styles
import styles from "../styles/views/freshers.module.scss";


// TESTING PURPOSES
// FETCHING DATA FROM GITHUB JSON AS DUMMY DATABASE
export const getStaticProps = async () => {

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://my-json-server.typicode.com/manguitodeveloper/test-db/freshers');
  const data = await res.json();

  return {
    props: { freshers: data }, // will be passed to the page component as props
  }
}

const Freshers = ({ freshers }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Marketplace</title>
      </Head>
      <Title>Marketplace</Title>
      <section className={styles.cards}>
        <MartCard freshers={ freshers.length }/>
        { freshers.map( fresher => (
          <MarketCard key={ fresher.id } fresher={ fresher } />
        ) ) }
      </section>
    </div>
  );

}


export default Freshers;
