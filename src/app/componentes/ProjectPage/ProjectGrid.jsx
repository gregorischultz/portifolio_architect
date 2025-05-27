import ProjectCard from './ProjectCard';
import styles from '@/app/styles/ProjectGrid.module.css'

export default function ProjectGrid({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}