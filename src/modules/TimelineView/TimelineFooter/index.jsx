import { useTimelineStore } from '../store'
import styles from './TimelineFooter.module.scss'
const TimelineFooter = () => {
  const timelineStore = useTimelineStore(state => ({
    loadSampleData: state.loadSampleData,
    addNewGroup: state.addNewGroup
  }))
  return (
    <>
      <div className={styles.buttons}>
        <button
          className='button'
          onClick={() => {
            const groupName = prompt('Please enter the group name')
            groupName?.trim() && timelineStore.addNewGroup({ groupName })
          }}
        >
          add new group
        </button>
        <button className='button' onClick={timelineStore.loadSampleData}>
          load sample data
        </button>
      </div>
    </>
  )
}

export default TimelineFooter
