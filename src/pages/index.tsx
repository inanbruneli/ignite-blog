import { GetStaticProps } from 'next';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import * as prismic from '@prismicio/client'

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

export const getStaticProps = async () => {

  const prismic = getPrismicClient({});
  // const postsResponse = await prismic.getByType(TODO);

  // TODO
};
