import TimelineView from './TimelineView'

import styles from './App.module.scss'
import { useTimelineStore } from './TimelineView/modules/store'

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
        <div className={styles.buttons}>
          <button
            onClick={() => {
              const groupName = prompt('Please enter the group name')
              timelineStore.addNewGroup({ groupName })
            }}
          >
            add new group
          </button>
          <button onClick={timelineStore.loadSampleData}>
            load sample data
          </button>
        </div>
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
