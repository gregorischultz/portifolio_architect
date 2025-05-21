import styles from '';

export default function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <img src={project.image} alt={project.title} className={styles.image} />
    </div>
  );
}