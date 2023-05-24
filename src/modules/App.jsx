import TimelineView from './TimelineView'

import styles from './App.module.scss'
import TimelineFooter from './TimelineView/TimelineFooter'

function App () {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2>TIMELINE TASK</h2>
        <TimelineView />
        <TimelineFooter />
      </div>
    </div>
  )

  // return <TimelineView />
}

export default App
