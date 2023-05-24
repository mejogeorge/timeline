import { useTimelineStore } from '../store'
import styles from './TimelineFooter.module.scss'
export default () => {
  const timelineStore = useTimelineStore(state => ({
    loadSampleData: state.loadSampleData,
    addNewGroup: state.addNewGroup
  }))
  return (
    <div className={styles.buttons}>
      <button
        onClick={() => {
          const groupName = prompt('Please enter the group name')
          timelineStore.addNewGroup({ groupName })
        }}
      >
        add new group
      </button>
      <button onClick={timelineStore.loadSampleData}>load sample data</button>
    </div>
  )
}
