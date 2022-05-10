import React, { useEffect, useState } from "react";
import Image from "next/image";
//components
import { TestSheet } from "../components/";
//styles
import styles from "../styles/components/LevelTest.module.scss";
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

import { useAttack } from "../hooks";

export default function LevelTest({ vsBar, fresher }) {
  const { loadLevelInfo, levelInfo } = useAttack();

  useEffect(() => {
    loadLevelInfo();
  }, []);

  if (fresher != undefined) {
    fresher = JSON.parse(fresher);
  }

  try {
    if (vsBar === 1) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar1.src})`,
            borderRadius: "15px 15px 0 0",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher1}
              className="teacher"
              alt="teacher1"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[0].powerLevel}
              cost={levelInfo[0].attackPrice}
              reward={levelInfo[0].reward}
              name={"Geometria Analitica"}
              fresher={fresher}
              level={1}
            />
          </div>
        </div>
      );
    } else if (vsBar === 2) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar2.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher2}
              className="teacher"
              alt="teacher2"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[1].powerLevel}
              cost={levelInfo[1].attackPrice}
              reward={levelInfo[1].reward}
              name={"Algebra Lineal"}
              fresher={fresher}
              level={2}
            />
          </div>
        </div>
      );
    } else if (vsBar === 3) {
      return (
        <div
          className={styles.level}
          style={{ backgroundImage: `url(${vsBar3.src})` }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher3}
              className="teacher"
              alt="teacher3"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[2].powerLevel}
              cost={levelInfo[2].attackPrice}
              reward={levelInfo[2].reward}
              name={"Fisica"}
              fresher={fresher}
              level={3}
            />
          </div>
        </div>
      );
    } else if (vsBar === 4) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar4.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher4}
              className="teacher"
              alt="teacher4"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[3].powerLevel}
              cost={levelInfo[3].attackPrice}
              reward={levelInfo[3].reward}
              name={"Fund Elec"}
              fresher={fresher}
              level={4}
            />
          </div>
        </div>
      );
    } else if (vsBar === 5) {
      return (
        <div
          className={styles.level}
          style={{ backgroundImage: `url(${vsBar5.src})` }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher5}
              className="teacher"
              alt="teacher5"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[4].powerLevel}
              cost={levelInfo[4].attackPrice}
              reward={levelInfo[4].reward}
              name={"Diseño Logico"}
              fresher={fresher}
              level={5}
            />
          </div>
        </div>
      );
    } else if (vsBar === 6) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar6.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher6}
              className="teacher"
              alt="teacher6"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[5].powerLevel}
              cost={levelInfo[5].attackPrice}
              reward={levelInfo[5].reward}
              name={"Control Instrumen"}
              fresher={fresher}
              level={6}
            />
          </div>
        </div>
      );
    } else if (vsBar === 7) {
      return (
        <div
          className={styles.level}
          style={{ backgroundImage: `url(${vsBar7.src})` }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher7}
              className="teacher"
              alt="teacher7"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[6].powerLevel}
              cost={levelInfo[6].attackPrice}
              reward={levelInfo[6].reward}
              name={"Sis de Informacion"}
              fresher={fresher}
              level={7}
            />
          </div>
        </div>
      );
    } else if (vsBar === 8) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar8.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher8}
              className="teacher"
              alt="teacher8"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[7].powerLevel}
              cost={levelInfo[7].attackPrice}
              reward={levelInfo[7].reward}
              name={"Met Cuantitativos"}
              fresher={fresher}
              level={8}
            />
          </div>
        </div>
      );
    } else if (vsBar === 9) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar9.src})`,
            borderRadius: "0 0 15px 15px",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher9}
              className="teacher"
              alt="teacher9"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[8].powerLevel}
              cost={levelInfo[8].attackPrice}
              reward={levelInfo[8].reward}
              name={"Tesis"}
              fresher={fresher}
              level={9}
            />
          </div>
        </div>
      );
    } else if (vsBar === 10) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar10.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher10}
              className="teacher"
              alt="teacher10"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={levelInfo[9].powerLevel}
              cost={levelInfo[9].attackPrice}
              reward={levelInfo[9].reward}
              name={"Vida Laboral"}
              fresher={fresher}
              level={10}
            />
          </div>
        </div>
      );
    }
  } catch (error) {
    if (vsBar === 1) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar1.src})`,
            borderRadius: "15px 15px 0 0",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher1}
              className="teacher"
              alt="teacher1"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 2) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar2.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher2}
              className="teacher"
              alt="teacher2"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 3) {
      return (
        <div
          className={styles.level}
          style={{ backgroundImage: `url(${vsBar3.src})` }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher3}
              className="teacher"
              alt="teacher3"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 4) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar4.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher4}
              className="teacher"
              alt="teacher4"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 5) {
      return (
        <div
          className={styles.level}
          style={{ backgroundImage: `url(${vsBar5.src})` }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher5}
              className="teacher"
              alt="teacher5"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 6) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar6.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher6}
              className="teacher"
              alt="teacher6"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 7) {
      return (
        <div
          className={styles.level}
          style={{ backgroundImage: `url(${vsBar7.src})` }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher7}
              className="teacher"
              alt="teacher7"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 8) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar8.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher8}
              className="teacher"
              alt="teacher8"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 9) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar9.src})`,
            borderRadius: "0 0 15px 15px",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher9}
              className="teacher"
              alt="teacher9"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet />
          </div>
        </div>
      );
    } else if (vsBar === 10) {
      return (
        <div
          className={styles.level}
          style={{
            backgroundImage: `url(${vsBar10.src})`,
            flexDirection: "row-reverse",
          }}
        >
          <div className={styles.teacher}>
            <Image
              src={teacher10}
              className="teacher"
              alt="teacher10"
              height={100}
              width={200}
            />
          </div>
          <div className={styles.test}>
            <TestSheet
              power={400}
              cost={100}
              reward={200}
              name={"Vida Laboral"}
              fresher={fresher}
              level={10}
            />
          </div>
        </div>
      );
    }
  }
}
