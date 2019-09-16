import styles from './index.css';
import Link from 'umi/link';
export default function() {
  return (
    <div className={styles.normal}>
      <Link to={'/nodes'}>nodes</Link>
    </div>
  );
}
