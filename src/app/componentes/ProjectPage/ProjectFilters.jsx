'use client'

import styles from '@/app/styles/ProjectFilters.module.css'

const categories = ['Todos', '3D exteriores', '3D interiores', '3D Comerciais'];

export default function ProjectFilters({ filter, setFilter }) {
  return (
    <div className={styles.filters}>
      {categories.map((categories) => (
        <button
          key={categories}
          className={filter === categories ? styles.active : styles.button}
          onClick={() => setFilter(categories)}
        >
          {categories}
        </button>
      ))}
    </div>
  );
}