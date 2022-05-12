import Head from "next/head";
//components
import { Title, LevelTest, TestCard, CornerModal } from "../components";
// styles
import styles from "../styles/views/play.module.scss";
// Moralis
import { useMoralis } from "react-moralis";
// React
import { useEffect, useState } from "react";
// Custom Hooks
import { useUserInfo, useAttack } from "../hooks";

export default function nft() {
  // Custom Hook {useUserInfo}
  const { loadNfts, nfts, loadIndexNft, indexs } = useUserInfo();
  // Hook Moralis
  const { isAuthenticated } = useMoralis();
  // React Hook
  const [student, setStudent] = useState();
  // Custom Hook {useAttack}
  const {attackNft, win, setWin, losse, setLosse, errorAttack,setErrorAttack } = useAttack()

  // Load The level info
  useEffect(() => {
    loadIndexNft();
    loadNfts();
  }, []);

  // Load Level Info
  useEffect(() => {
    if (isAuthenticated) {
      loadIndexNft();
    }
  }, [isAuthenticated]);

  // Load User Nft
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
        <LevelTest vsBar={1} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={2} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={3} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={4} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={5} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={6} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={7} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={8} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={9} fresher={student} attackNft={attackNft} />
        <LevelTest vsBar={10} fresher={student} attackNft={attackNft} />
      </section>
      {win ? <CornerModal image={1} closeModal={setWin} showing={win} title="Info Ataque" message="Paso el Parcial"/> : null}
      {losse ? <CornerModal image={2} closeModal={setLosse} showing={losse} title="Info Ataque" message="Raspo el Parcial"/> : null}
      {errorAttack ? <CornerModal image={2} closeModal={setErrorAttack} showing={errorAttack} title="Info Ataque" message="Error Al atacar el Nivel"/> : null}

    </div>
  );
}
