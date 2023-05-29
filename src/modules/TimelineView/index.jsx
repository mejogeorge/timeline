import 'react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import AddItemForm from './AddItemForm'
import { useTimelineStore } from './store'
import TimelineEmpty from './TimelineEmpty'
import Hint from './Hint'

const TimelineView = () => {
  const timelineStore = useTimelineStore(state => ({
    timeItems: state.timeItems,
    addNewItemToTimeline: state.addNewItemToTimeline,
    groups: state.groups,
    setShowAddItem: state.setShowAddItem,
    setDraftItem: state.setDraftItem,
    showAddItemForm: state.showAddItemForm,
    editItem: state.editItem
  }))

  const onItemDoubleClick = itemId => {
    console.log('onItemDoubleClick', itemId)
    timelineStore.editItem(itemId)
    timelineStore.setShowAddItem(true)
  }

  const onCanvasDoubleClick = (groupId, time, e) => {
    timelineStore.setDraftItem({
      group: groupId,
      startTime: time,
      endTime: time + 60 * 60 * 1000
    })
    timelineStore.setShowAddItem(true)
  }

  const itemRenderer = ({ itemContext, getItemProps }) => {
    const color = itemContext.selected ? 'black' : 'white'
    return (
      <div
        {...getItemProps({
          style: {
            color,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          }
        })}
      >
        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft: 3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {itemContext.title}
        </div>
      </div>
    )
  }
  return (
    <>
      {timelineStore.groups?.length ? (
        <>
          <Timeline
            groups={timelineStore.groups}
            items={timelineStore.timeItems}
            fullUpdate
            itemTouchSendsClick={false}
            stackItems
            itemHeightRatio={0.75}
            onItemDoubleClick={onItemDoubleClick}
            onCanvasDoubleClick={onCanvasDoubleClick}
            itemRenderer={itemRenderer}
            defaultTimeStart={moment().add(-1, 'hour')}
            defaultTimeEnd={moment().add(1, 'day')}
          />
          <Hint />
        </>
      ) : (
        <TimelineEmpty />
      )}
      {timelineStore.showAddItemForm && <AddItemForm />}
    </>
  )
}

export default TimelineView
