import React, {useEffect} from 'react';
import Router from 'next/router';
import Head from "next/head";
//components
import { Title, AdminCard, AdminInput } from "../components/"
//styles
import styles from "../styles/views/admin.module.scss"

export default function admin() {

    // test var
    const isAdmin = true;
    // if the isAdmin value is false, it will be pushed to the main page every single time the component
    // tries to mount
    useEffect(() => {
        !isAdmin && Router.push("/"); 
    })

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Freshers - Game Management</title>
            </Head>
            <Title>Game Management</Title>
            <section className={styles.sections}>
                <AdminCard/>
                <div className={styles.subtitles}>
                    <Title>Token Management</Title>
                    <AdminInput name="Mint Tokens" />
                    <AdminInput name="Burn Tokens" />
                    <AdminInput name="Transfer Liquidity" />
                    <AdminInput name="Cashout Tokens" />
                    <Title>Economy Management</Title>
                    <div className={styles.values}>
                        <div className={styles.currents}>
                            <p>Reward Multiplier</p>
                            <span>3</span>
                        </div>
                        <div className={styles.currents}>
                            <p>Wear Multiplier</p>
                            <span>3</span>
                        </div>
                        <div className={styles.currents}>
                            <p>Minting Price</p>
                            <span>3</span>
                        </div>
                        <div className={styles.currents}>
                            <p>Attack Price Multiplier</p>
                            <span>3</span>
                        </div>

                    </div>
                    <AdminInput name="Minting Price" />
                    <AdminInput name="Reward Multiplier" />
                    <AdminInput name="Wear Multiplier" />
                    <AdminInput name="Attack Price Multiplier" />
                </div>
            </section>  
        </div>
    )
}
