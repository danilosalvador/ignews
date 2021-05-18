import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";

import { RichText } from "prismic-dom";
import { useEffect } from "react";

import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session]);

    return (
        <>
            <Head>
                <title>{post.title} | ig.news</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />

                    <div className={styles.continueReading}>
                        Quer continuar lendo?
                        <Link href="/"> 
                            <a href="">Inscreva-se agora</a>
                        </Link>
                        🤗
                    </div>
                </article>
            </main>
        </>
    );
}

// Utilizado para gerar os arquivos estáticos no momento do 'yarn build'
// Isso é obrigatório em apenas páginas com nome do arquivo dinâmico, ex: [slug].tsx
export const getStaticPaths: GetStaticPaths = async () => {
    return {
         paths: [], // Qdo vazio, irá gerar os arquivos estátivos no primero acesso
        // paths: [
        //     { params: { slug: 'react-hooks-como-utilizar-motivacoes-e-exemplos-praticos' }} // Qdo preenchido com o PARAM, irá gerar os arquivos estátivos build
        // ],
        fallback: 'blocking', // true: carrega o conteúdo antes das requisições; false: gera erro 404 qdo não estiver gerado o estático; blocking: só carrega o conteúdo depois das requisições (parecido com o SSR, mas gera o estático logo em seguida)
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('publication', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    };

    return {
        props: {
            post
        },
        revalidate: 60 * 30, // 30 minutes
    };
}
