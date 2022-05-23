import React, {useEffect} from 'react';
import Router from 'next/router';
import Head from "next/head";
//components
import { Title, AdminCard, AdminInput } from "../components/"
//styles
import styles from "../styles/views/admin.module.scss"
import { useAdminContract } from '../hooks';

export default function admin() {
    const {isAdmin,
        // Reward Multiplicator
        rewardMultiplicator,
        loadRewardMultiplicator,
        setNewRewardMultiplicator,
        
        // Wear Multiplicator
        wearMultiplicator,
        loadWearMultiplicator,
        setNewWearMultiplicator,

        // Attack Price Multiplicator
        attackPriceMultiplicator,
        loadAttackPriceMultiplicator,
        setNewAttackPriceMultiplicator,

        //Nft Price
        nftPrice,
        loadNftPrice,
        setNewNftPrice

    } = useAdminContract();

    // if the isAdmin value is false, it will be pushed to the main page every single time the component
    // tries to mount
    useEffect(() => {
        !isAdmin && Router.push("/"); 
    })

    useEffect(() =>{
        loadRewardMultiplicator()
        loadWearMultiplicator()
        loadAttackPriceMultiplicator()
        loadNftPrice()
    },[rewardMultiplicator,wearMultiplicator,attackPriceMultiplicator,nftPrice])

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Freshers - Administrar del Juego</title>
            </Head>
            <Title>Administrar Juego</Title>
            <section className={styles.sections}>
                <AdminCard/>
                <div className={styles.subtitles}>
                    <Title>Administrar Token</Title>
                    <AdminInput name="Mint Tokens" func={a=>{}} />
                    <AdminInput name="Burn Tokens" func={a=>{}}/>
                    <AdminInput name="Transfer Liquidity" func={a=>{}}/>
                    <AdminInput name="Cashout Tokens" func={a=>{}}/>
                    <Title>Administrar de Economia</Title>
                    <div className={styles.values}>
                        <div className={styles.currents}>
                            <p>Multiplicador de Recompensa</p>
                            <span>{rewardMultiplicator}</span>
                        </div>
                        <div className={styles.currents}>
                            <p>Multiplicador de Desgaste</p>
                            <span>{wearMultiplicator}</span>
                        </div>
                        <div className={styles.currents}>
                            <p>Precio de Minteo de NFT</p>
                            <span>{nftPrice}</span>
                        </div>
                        <div className={styles.currents}>
                            <p>Multiplicador de Ataque</p>
                            <span>{attackPriceMultiplicator}</span>
                        </div>

                    </div>
                    <AdminInput name="Precio Minteo" func={setNewNftPrice}/>
                    <AdminInput name="Multiplicador Recompensa" func={setNewRewardMultiplicator}/>
                    <AdminInput name="Multiplicador Desgaste" func={setNewWearMultiplicator}/>
                    <AdminInput name="Multiplicador Ataque" func={setNewAttackPriceMultiplicator}/>
                </div>
            </section>  
        </div>
    )
}