import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

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

export default function Post() {
  return (
    <>
      <Header />
      <img className={styles.img} src="/images/Banner.png" alt="logo" />
      <div className={styles.container}>
        <h1>Criando um APP CRA do zero</h1>
        <div className={styles.containerInfos}>
          <div>
            <FiCalendar size={20} color='#BBBBBB' />
            <h3>15 Mar 2021</h3>
          </div>
          <div>
            <FiUser size={20} color='#BBBBBB' />
            <h3>Inan Brunelli</h3>
          </div>
          <div>
            <FiClock size={20} color='#BBBBBB' />
            <h3>4 Min</h3>
          </div>
        </div>

        <h4>Proin et varius</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
          Nam facilisis sodales felis, pharetra pharetra lectus auctor sed
        </p>
      </div>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
