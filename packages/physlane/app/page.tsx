import styles from './page.module.css';
import { Intro } from '@physlane/ui';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <Intro></Intro>
    </div>
  );
}
