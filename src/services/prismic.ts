import * as Prismic from '@prismicio/client';

export function getPrismicClient(){
  
  const prismic = Prismic.createClient(
    'inan-igniteblog',
    {
      accessToken: process.env.PRISMIC_ACESS_TOKEN,
    }
  )

  return prismic;
}