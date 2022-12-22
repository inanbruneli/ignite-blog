import styles from './item.module.scss';
import { FiCalendar, FiUser } from 'react-icons/fi';

interface Props {
  title: string;
  subtitle: string;
  date: string;
  autor: string;
}

export default function ListItem({ title, subtitle, date, autor }: Props) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <div className={styles.containerInfos}>
        <div>
          <FiCalendar size={20} color='#BBBBBB' />
          <h3>{date}</h3>
        </div>
        <div>
          <FiUser size={20} color='#BBBBBB' />
          <h3>{autor}</h3>
        </div>
      </div>
    </div>
  );
}