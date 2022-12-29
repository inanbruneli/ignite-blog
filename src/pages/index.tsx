import { GetStaticProps } from 'next';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Link from 'next/link';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import * as Prismic from '@prismicio/client';
import { useEffect, useState } from 'react';

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

export default function Home({ results, next_page }: PostPagination,) {
  async function nextPage() {
    const data = await fetch(next_page).then(response => response.json()).then(data => data);
    setPosts(data.results);
    setNext(data.next_page);
  }

  const [posts, setPosts] = useState(results);
  const [next, setNext] = useState(next_page);
  return (
    <>
      <Header />
      <div className={styles.containerList}>
        {posts.map((post) => (
          <ListItem uid={post.uid} title={post.data.title} subtitle={post.data.subtitle} date={post.first_publication_date} autor={post.data.author} />
        ))}
        {next && <a onClick={nextPage}>Carregar mais posts</a>}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicate.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.subtitle', 'post.content', 'post.author'],
    pageSize: 3
  })

  const posts = response.results.map((post) => {
    return {
      uid: post.uid,
      first_publication_date: post.last_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })

  console.log(posts);


  return {
    props: { results: posts, next_page: response.next_page }
  }
}
