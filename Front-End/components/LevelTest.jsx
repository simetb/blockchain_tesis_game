import React from 'react'
import Image from 'next/image'
//components
import { TestSheet } from '../components/';
//styles
import styles from "../styles/components/LevelTest.module.scss"
//images
import vsBar1 from "../public/img/vsBars/vsBar1.png";
import vsBar2 from "../public/img/vsBars/vsBar2.png";
import vsBar3 from "../public/img/vsBars/vsBar3.png";
import vsBar4 from "../public/img/vsBars/vsBar4.png";
import vsBar5 from "../public/img/vsBars/vsBar5.png";
import vsBar6 from "../public/img/vsBars/vsBar6.png";
import vsBar7 from "../public/img/vsBars/vsBar7.png";
import vsBar8 from "../public/img/vsBars/vsBar8.png";
import vsBar9 from "../public/img/vsBars/vsBar9.png";
import vsBar10 from "../public/img/vsBars/vsBar10.png";
import teacher1 from "../public/img/teachers/teacher1.png";
import teacher2 from "../public/img/teachers/teacher2.png";
import teacher3 from "../public/img/teachers/teacher3.png";
import teacher4 from "../public/img/teachers/teacher4.png";
import teacher5 from "../public/img/teachers/teacher5.png";
import teacher6 from "../public/img/teachers/teacher6.png";
import teacher7 from "../public/img/teachers/teacher7.png";
import teacher8 from "../public/img/teachers/teacher8.png";
import teacher9 from "../public/img/teachers/teacher9.png";
import teacher10 from "../public/img/teachers/teacher10.png";

export default function LevelTest( {vsBar} ) {
  if ( vsBar === 1 ){
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar1.src})`, borderRadius: '15px 15px 0 0'}}>
        <div className={styles.teacher}>
          <Image src={teacher1} className="teacher" alt="teacher1" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 2 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar2.src})`, flexDirection: "row-reverse"}}>
        <div className={styles.teacher}>
          <Image src={teacher2} className="teacher" alt="teacher2" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 3 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar3.src})`}}>
        <div className={styles.teacher}>
          <Image src={teacher3} className="teacher" alt="teacher3" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 4 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar4.src})`, flexDirection: "row-reverse"}}>
        <div className={styles.teacher}>
          <Image src={teacher4} className="teacher" alt="teacher4" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 5 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar5.src})`}}>
        <div className={styles.teacher}>
          <Image src={teacher5} className="teacher" alt="teacher5" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 6 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar6.src})`, flexDirection: "row-reverse"}}>
        <div className={styles.teacher}>
          <Image src={teacher6} className="teacher" alt="teacher6" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 7 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar7.src})`}}>
        <div className={styles.teacher}>
          <Image src={teacher7} className="teacher" alt="teacher7" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 8 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar8.src})`, flexDirection: "row-reverse"}}>
        <div className={styles.teacher}>
         	<Image src={teacher8} className="teacher" alt="teacher8" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 9 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar9.src})`}}>
        <div className={styles.teacher}>
          <Image src={teacher9} className="teacher" alt="teacher9" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }else if ( vsBar === 10 ) {
    return (
      <div className={styles.level} style={{backgroundImage: `url(${vsBar10.src})`, flexDirection: "row-reverse", borderRadius: '0 0 15px 15px'}}>
        <div className={styles.teacher}>
          <Image src={teacher10} className="teacher" alt="teacher10" height={100} width={200}/>
        </div>
        <div className={styles.test}>
          <TestSheet />
        </div>
      </div>
    )
  }
  
  
}
