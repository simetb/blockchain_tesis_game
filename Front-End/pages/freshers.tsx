import React, { useEffect, useState } from 'react';
import Head from "next/head";
//components
import { FresherCard, MintCard } from '../components';
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
        <title>Freshers - My NFT's</title>
      </Head>
      <Title>Freshers</Title>
      <section className={styles.cards}>
        <MintCard freshers={ freshers.length }/>
        { freshers.map( fresher => (
          <FresherCard key={ fresher.id } fresher={ fresher } />
        ) ) }
      </section>
    </div>
  );

}


export default Freshers;
