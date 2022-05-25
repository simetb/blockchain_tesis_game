import React, {useEffect} from 'react';
import Router from 'next/router';
import Head from "next/head";
//components
import { Title, AdminCard, AdminInput, CornerModal } from "../components/"
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

        // Nft Price
        nftPrice,
        loadNftPrice,
        setNewNftPrice,

        // Info Nft
        loadTotalNftInGame,
        loadTotalNftInMarket,
        nftInGame,
        nftInMarket,

        // Token Admin
        mintTokens,
        burnTokens,
        transferLiquidity,
        withdraw,

        // Modal
        modal,
        setModal

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
        loadTotalNftInGame()
        loadTotalNftInMarket()
    },[rewardMultiplicator,wearMultiplicator,attackPriceMultiplicator,nftPrice])

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Freshers - Administrar del Juego</title>
            </Head>
            <Title>Administrar Juego</Title>
            <section className={styles.sections}>
                <AdminCard nftGame={nftInGame} nftMarketPlace={nftInMarket}/>
                <div className={styles.subtitles}>
                    <Title>Administrar Token</Title>
                    <AdminInput name="Mintear Tokens UJG" func={mintTokens} />
                    <AdminInput name="Quemar Tokens UJG" func={burnTokens}/>
                    <AdminInput name="Transferir Liquidez ETH" func={transferLiquidity}/>
                    <AdminInput name="Retirar Liquidez ETH" func={withdraw}/>
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
            {modal ? <CornerModal image={1} closeModal={setModal} showing={modal} title="Admin" message="Hecho Correctamente"/> : null}  
        </div>
    )
}