import Head from "next/head";
import Image from "next/image";
//components
import { Button } from "../components/"
// styles
import styles from "../styles/views/index.module.scss";
//images
import teacher from "../public/img/teacher.gif"
import fresher1 from "../public/img/fresherindex1.png"
import fresher2 from "../public/img/fresherindex2.png"
import fresher3 from "../public/img/fresherindex3.png"
import vsBar from "../public/img/vsBars/vsBar1.png";
import lilFresher1 from "../public/img/lilfresher1.png"
import lilFresher2 from "../public/img/lilfresher2.png"
import lilFresher3 from "../public/img/lilfresher3.png"
import desk from "../public/img/desk.png"
// icons
import { IoDocumentTextOutline, IoDocumentOutline } from "react-icons/io5";

// '/' directory content
export default function Home() {
  return (
    <div className={styles.container}>
      {/* HTML HEAD */}
      <Head>
        <title>Freshers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HTML TEMPLATE */}
      <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Play</title>
      </Head>
      <section className={styles.main}>
        <div>
          <h1 className={styles.title}> Mint NFT's, <br /> <span className={styles.test}>Take a test</span> <br /> Earn <span className={styles.ujg}> UJAP GOLD! </span> </h1>
          <p className={styles.slogan}>Freshers is a Brand-new Play-to-Earn Game made for learning purposes</p>
          <div className={styles.buttons}>
            <a href="">
              <Button onClick={undefined}><IoDocumentTextOutline/> &nbsp; Documentation</Button>
            </a>
            <a href="">
              <Button onClick={undefined}><IoDocumentOutline/> &nbsp; Whitepaper</Button>
            </a>
          </div>
        </div>
        <div className={styles.scene}>
        <div className={styles.vsBar} style={{backgroundImage: `url(${vsBar.src})`}}>
          <div className={styles.fresher}>
            <div>
              <Image src={fresher1} alt="fresher1" height={100} width={200}/>
            </div>
            <div>
              <Image src={fresher2} alt="fresher2" height={100} width={200}/>
            </div>
            <div>
              <Image src={fresher3} alt="fresher3" height={100} width={200}/>
            </div>
          </div>
        </div>
          <section className={styles.freshers}>
            <Image src={lilFresher1} width={80} height={80}/>
            <Image src={lilFresher2} width={80} height={80}/>
            <Image src={lilFresher3} width={80} height={80}/>
          </section>
          <section className={styles.desks}>
            <Image src={desk} width={80} height={80}/>
            <Image src={desk} width={80} height={80}/>
            <Image src={desk} width={80} height={80}/>
          </section>
          <section className={styles.teacher}>
            <Image src={teacher} width={80} height={80}/>
          </section>
        </div>
      </section>
    </div>
    </div>
  );
}
