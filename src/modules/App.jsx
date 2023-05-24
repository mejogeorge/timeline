import TimelineView from './TimelineView'

import styles from './App.module.scss'
import TimelineFooter from './TimelineView/TimelineFooter'

function App () {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <TimelineView />
        <TimelineFooter />
      </div>
      <div className={styles.hint}>
        Hint: Double click to add new item on timeline
      </div>
    </div>
  )

  // return <TimelineView />
}

export default App
