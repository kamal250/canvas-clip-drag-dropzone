import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Tabs from '../components/tabs';
import Design from '../components/design';
import Preview from '../components/preview';

export default function Home() {
  const initialState = {
    design: true,
    designTabClass: `${styles.show}`,
    previewTabClass: `${styles.hide}`
  };
  const [showDesign, setShowDesign] = useState(initialState);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dropzone, canvas clip & drag image - example</title>
        <meta name="description" content="Dropzone, canvas clip & drag image - example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.creator}>
            <Preview showDesign={showDesign} />
            <Design showDesign={showDesign} />
          </div>
          <Tabs showDesign={showDesign} />
        </div>
      </main>      
    </div>
  )
}
