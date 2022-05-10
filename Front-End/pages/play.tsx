import Head from "next/head";
import { useState } from "react";
//components
import { Title, LevelTest, TestCard, CornerModal } from '../components';
// styles
import styles from "../styles/views/play.module.scss";

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

export default function nft( {freshers} ) {

  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Play</title>
      </Head>
      {/* Test Modal Button */}
      {/* <button onClick={() => setShowModal(!showModal)}>click me</button> */}
      <Title>Take a test</Title>
      <section className={styles.levels}>
        <TestCard freshers={freshers} />
        <LevelTest vsBar= {1} />
        <LevelTest vsBar= {2} />
        <LevelTest vsBar= {3} />
        <LevelTest vsBar= {4} />
        <LevelTest vsBar= {5} />
        <LevelTest vsBar= {6} />
        <LevelTest vsBar= {7} />
        <LevelTest vsBar= {8} />
        <LevelTest vsBar= {9} />
        <LevelTest vsBar= {10} />
      </section>
      {showModal ? <CornerModal image={1} closeModal={setShowModal} showing={showModal}/> : null}
      {/* <CornerModal closeModal={setShowModal} showing={showModal}/> */}
    </div>
  )
}


