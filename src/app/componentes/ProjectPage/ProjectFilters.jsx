import styles from '';

const categories = ['Todos', '3D exteriores', '3D interiores', '3D Comerciais'];

export default function ProjectFilters({ filter, setFilter }) {
  return (
    <div className={styles.filters}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={filter === cat ? styles.active : styles.button}
          onClick={() => setFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}