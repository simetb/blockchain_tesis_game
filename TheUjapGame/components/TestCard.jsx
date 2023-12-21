import React, { useEffect, useState } from "react";
import Image from "next/image";
//components
import { SelectFresher } from "../components/";
import { FresherPreview } from "../components/";
//images
import academy from "../public/img/academy.png";
//styles
import styles from "../styles/components/TestCard.module.scss";

export default function TestCard({ freshers, setValue }) {
  const [fresher, setFresher] = useState(null);

  useEffect(() => {
    setValue(fresher);
  }, [fresher]);

  let students = [];
  for(let value in freshers){
    if(!freshers[value].market){
      students.push(freshers[value])
    }
  }

  return (
    <div className={styles.testCard}>
      <div className={styles.academy}>
        <Image src={academy} alt="academy" width={200} height={180} />
      </div>
      <SelectFresher freshers={students} handleClick={setFresher} />
      <FresherPreview fresher={fresher ? JSON.parse(fresher) : {}} />
    </div>
  );
}
