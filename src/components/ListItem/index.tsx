import styles from './item.module.scss';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  title: string;
  subtitle: string;
  date: string;
  autor: string;
  uid: string;
}

export default function ListItem({ title, subtitle, date, autor, uid }: Props) {
  const first_publication_date = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replaceAll('de ', '');

  return (
    <Link href={`../../post/${uid}`}>
      <a>
        <div className={styles.container} >
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <div className={styles.containerInfos}>
            <div>
              <FiCalendar size={20} color='#BBBBBB' />
              <h3>{first_publication_date}</h3>
            </div>
            <div>
              <FiUser size={20} color='#BBBBBB' />
              <h3>{autor}</h3>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}