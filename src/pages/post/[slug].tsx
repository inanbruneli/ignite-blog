import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { GetServerSideProps } from 'next/types';
import { getSession, useSession } from "next-auth/react";

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {

  let quantidade = 0;
  post.data.content.map((item) => {
    quantidade += item.heading.split(' ').length
    item.body.map(itemBody => quantidade += itemBody.text.split(' ').length);
  })
  const tempo = (quantidade / 200).toFixed();

  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${post.data.banner.url})`, width: '100%', height: '400px', marginBottom: '80px', backgroundSize: 'cover' }}>

      </div>
      <div className={styles.container}>
        <h1>{post.data.title}</h1>
        <div className={styles.containerInfos}>
          <div>
            <FiCalendar size={20} color='#BBBBBB' />
            <h3>{post.first_publication_date}</h3>
          </div>
          <div>
            <FiUser size={20} color='#BBBBBB' />
            <h3>{post.data.author}</h3>
          </div>
          <div>
            <FiClock size={20} color='#BBBBBB' />
            <h3>{tempo} Min</h3>
          </div>
        </div>

        {post.data.content.map(item => (
          <>
            <h4>{item.heading}</h4>
            <p>{item.body[0].text}</p>
          </>
        ))}

      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(params.slug), {});

  const post = {
    first_publication_date: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replaceAll('de ', ''),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content
    }
  }

  return {
    props: {
      post
    }
  }
}