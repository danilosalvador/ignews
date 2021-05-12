import { GetServerSideProps, GetStaticProps } from 'next';

import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amountFormatted: string;
  }
}

export default function Home({ product }: HomeProps) {
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
            Tenha acesso a todas publicações<br />
            por <span>{product.amountFormatted}</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  );
}

/** 
 * ********************************
 * SSR - Server Side Rendering 
 *  ********************************
 */
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1IhdzGGtocTi8oe9nnIyy0Xt', {
//     expand: ['product'], // Opcional, apenas como exemplo para pegar dados dos produtos
//   }); // O ID do preço é encontrado no produto criado no Dashboard do Stripe

//   const product = {
//     priceId: price.id,
//     amountFormatted: new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL'
//     }).format(price.unit_amount / 100) // o preço está em centavos, então deve-se dividir por 100
//   }

//   return {
//     props: {
//       product,
//     }
//   }
// }

/**
 * ********************************
 * SSG - Static Site Generation 
 *  ********************************
 */ 
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID, {
    expand: ['product'], // Opcional, apenas como exemplo para pegar dados dos produtos
  }); // O ID do preço é encontrado no produto criado no Dashboard do Stripe

  const product = {
    priceId: price.id,
    amountFormatted: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100) // o preço está em centavos, então deve-se dividir por 100
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // Tempo em segundos do cache
  }
}