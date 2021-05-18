import Prismisc from '@prismicio/client';

export function getPrismicClient(request?: unknown) {
    const prismic = Prismisc.client(
        'https://ignews-danilosalvador.cdn.prismic.io/api/v2',
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
            req: request,
        }
    );

    return prismic;
}
