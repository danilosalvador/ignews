import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem-vindo</span>
          <h1>Notícias sobre<br />o mundo <span>React</span>.</h1>
          <p>
            Tenha acesso a todos as publicações<br />
            <span>por R$ 1,99</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  );
}
