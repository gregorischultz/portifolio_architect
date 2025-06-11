import styles from '@/app/styles/ProjectCard.module.css';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  const imgUrl = project.images?.[0]?.url;

  return (
    <Link href={`/project/${project.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img src={imgUrl} alt={project.title} className={styles.image} />
      </div>
    </Link>
  );
}