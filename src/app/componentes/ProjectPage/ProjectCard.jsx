import styles from '@/app/styles/ProjectCard.module.css'

export default function ProjectCard({ project }) {

  const imgUrl = project.images?.[0]?.url || '/placeholder.jpg';

  return (
    <div className={styles.card}>
      <img src={imgUrl} alt={project.title} className={styles.image} />
    </div>
  );
}