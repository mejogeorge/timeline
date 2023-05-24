import React from 'react'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import Popup from '../../../components/Popup'
import { useTimelineStore } from '../store'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'
import styles from './AddItemForm.module.scss'

Popup
export default () => {
  const timelineStore = useTimelineStore(state => ({
    setShow: state.setShowAddItem,
    showForm: state.showAddItemForm,
    addNewItemToTimeline: state.addNewItemToTimeline,
    setDraftItem: state.setDraftItem,
    draftItem: state.draftItem,
    setShowAddItem: state.setShowAddItem,
    deleteItem: state.deleteItem
  }))

  const onFieldChange = key => value => {
    timelineStore.setDraftItem({
      [key]: value
    })
  }

  return (
    <Popup show>
      <div className={styles.container}>
        <span className={styles.headerText}>
          {timelineStore.draftItem.edit
            ? 'UPDATE / DELETE ITEM'
            : 'ADD NEW ITEM'}
        </span>
        <div className={styles.itemWrapper}>
          <span className={styles.leftText}>Title:</span>
          <input
            placeholder='Enter Title'
            className={styles.input}
            type='text'
            onChange={e => onFieldChange('title')(e.target.value)}
            value={timelineStore.draftItem.title}
          />
        </div>
        <div className={styles.itemWrapper}>
          <span className={styles.leftText}>Start Time:</span>
          <DateTimePicker
            className={styles.calendar}
            onChange={value => {
              console.log('onChange', value)
              onFieldChange('startTime')(value)
            }}
            value={moment(timelineStore.draftItem['startTime']).toDate()}
            clearIcon={null}
          />
        </div>
        <div className={styles.itemWrapper}>
          <span className={styles.leftText}>End Time:</span>
          <DateTimePicker
            className={styles.calendar}
            onChange={onFieldChange('endTime')}
            value={moment(timelineStore.draftItem['endTime']).toDate()}
            clearIcon={null}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className='button'
            variant='contained'
            onClick={() => {
              if (!timelineStore.draftItem.title) {
                return alert('Please enter the title')
              }
              timelineStore.addNewItemToTimeline()
              timelineStore.setShowAddItem(false)
            }}
          >
            {timelineStore.draftItem.edit ? 'UPDATE' : 'ADD'}
          </button>
          &nbsp;&nbsp;
          {timelineStore.draftItem.edit ? (
            <button
              className='button'
              variant='contained'
              onClick={() => {
                timelineStore.deleteItem()
                timelineStore.setShow(false)
              }}
            >
              DELETE
            </button>
          ) : null}
          &nbsp;&nbsp;
          <button
            className='button'
            variant='contained'
            onClick={() => timelineStore.setShow(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </Popup>
  )
}
