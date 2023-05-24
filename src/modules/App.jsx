import TimelineView from './TimelineView'

import styles from './App.module.scss'
import { useTimelineStore } from './TimelineView/store'
import TimelineFooter from './TimelineView/TimelineFooter'

function App () {
  // const [count, setCount] = useState(0)
  const timelineStore = useTimelineStore(state => ({
    loadSampleData: state.loadSampleData,
    addNewGroup: state.addNewGroup
  }))
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <TimelineView />
        <TimelineFooter />
        <br />
      </div>
      <div className={styles.hint}>
        Hint: Double click to add new item on timeline
      </div>
    </div>
  )

  // return <TimelineView />
}

export default App
