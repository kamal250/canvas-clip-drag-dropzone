import React from 'react';
import styles from '../styles/Home.module.css';

const Tabs = (props) => {
    return (
        <div className={styles.actions}>
            <button className={(!props.showDesign.design) ? styles.active : ''}>Preview</button>
            <button className={(props.showDesign.design) ? styles.active : ''}>Design</button>
        </div>
    );
};

export default Tabs;
