import { GetStaticProps } from 'next';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import * as Prismic from '@prismicio/client';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.containerList}>
        <ListItem title='Como utilizar Hooks' subtitle='Pensando em sincronização em vez de ciclos de vida' date='19 Abr 2021' autor='Inan Brunelli' />
        <ListItem title='Como utilizar Hooks' subtitle='Pensando em sincronização em vez de ciclos de vida' date='19 Abr 2021' autor='Inan Brunelli' />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicate.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })

  console.log(response);

  const posts = response.results.map((post) => {

    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: post.data.content[0].text.slice(0, post.data.content[0].text.indexOf('\n')),
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: { posts }
  }
}
