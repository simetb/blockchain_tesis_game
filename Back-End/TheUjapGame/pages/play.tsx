import Head from "next/head";
//components
import { Title, LevelTest, TestCard } from "../components";
// styles
import styles from "../styles/views/play.module.scss";

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

import { useUserInfo } from "../hooks";

export default function nft() {
  const { loadNfts, nfts, loadIndexNft, indexs } = useUserInfo();
  const { isAuthenticated } = useMoralis();
  const [student, setStudent] = useState();

  useEffect(() => {
    loadIndexNft();
    loadNfts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadIndexNft();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadNfts();
  }, [indexs]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Jugar</title>
      </Head>
      <Title>Hacer Parcial</Title>
      <section className={styles.levels}>
        <TestCard setValue={setStudent} freshers={nfts} />
        <LevelTest vsBar={1} fresher={student} />
        <LevelTest vsBar={2} fresher={student} />
        <LevelTest vsBar={3} fresher={student} />
        <LevelTest vsBar={4} fresher={student} />
        <LevelTest vsBar={5} fresher={student} />
        <LevelTest vsBar={6} fresher={student} />
        <LevelTest vsBar={7} fresher={student} />
        <LevelTest vsBar={8} fresher={student} />
        <LevelTest vsBar={9} fresher={student} />
        <LevelTest vsBar={10} fresher={student} />
      </section>
    </div>
  );
}
