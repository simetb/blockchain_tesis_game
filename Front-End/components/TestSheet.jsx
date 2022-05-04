//styles
import styles from "../styles/components/TestSheet.module.scss"
//icons
import { IoCaretForwardCircleSharp } from 'react-icons/io5'

export default function TestSheet({ name = "Test", power = 0, cost = 0, reward = 0 }) {
  return (
    <div className={styles.testSheet} >
        <h3> {name} </h3>
        <p>Power: {power}</p>
        <p>cost: {cost}</p>
        <p>reward: {reward}</p>
        <IoCaretForwardCircleSharp/>
    </div>
  )
}
