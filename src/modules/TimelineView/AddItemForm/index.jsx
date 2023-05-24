import React from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import Popup from '../../../components/Popup'
import { useTimelineStore } from '../store'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'

Popup
export default props => {
  const timelineStore = useTimelineStore(state => ({
    setShow: state.setShowAddItem,
    showForm: state.showAddItemForm,
    addNewItemToTimeline: state.addNewItemToTimeline,
    setDraftItem: state.setDraftItem,
    draftItem: state.draftItem,
    setShowAddItem: state.setShowAddItem
  }))

  // const [showCalender, setShowCalender] = useState({})

  const onFieldChange = key => value => {
    timelineStore.setDraftItem({
      [key]: value
    })
  }

  return (
    <Popup show>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 6
        }}
      >
        <div style={{ flexDirection: 'row' }}>
          <span style={{ flex: 1, color: 'black', backgroundColor: 'pink' }}>
            Title
          </span>
          <input
            style={{ flex: 2 }}
            type='text'
            onChange={e => onFieldChange('title')(e.target.value)}
          />
        </div>
        <div style={{ flexDirection: 'row', flex: 1 }}>
          <span style={{ flex: 1, color: 'black' }}>start time</span>
          <DateTimePicker
            onChange={value => {
              console.log('onChange', value)
              onFieldChange('startTime')(value)
            }}
            value={moment(timelineStore.draftItem['startTime']).toDate()}
          />
        </div>
        <div style={{ flexDirection: 'row', flex: 1 }}>
          <span style={{ flex: 1, color: 'black' }}>end time</span>
          <DateTimePicker
            onChange={onFieldChange('endTime')}
            value={moment(timelineStore.draftItem['endTime']).toDate()}
          />
        </div>
        <button
          variant='contained'
          onClick={() => {
            if (!timelineStore.draftItem.title) {
              return alert('Please enter the title')
            }
            timelineStore.addNewItemToTimeline()
            timelineStore.setShowAddItem(false)
          }}
        >
          ADD
        </button>
        <button
          variant='contained'
          onClick={() => timelineStore.setShow(false)}
        >
          CANCEL
        </button>
      </div>
    </Popup>
  )
}
