import React, { useState, useId } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Popup from '../../../../components/Popup'
import moment from 'moment'

Popup
export default props => {
  const [formData, setFormData] = useState({
    id: useId(),
    title: '',
    group: '',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  })
  const [showCalender, setShowCalender] = useState({})

  const onSelectDate = key => event => {}
  const onChange = key => event => {
    console.log('key, text', key, event.target.value, formData)
    setFormData({
      ...formData,
      [key]: event.target.value
    })
  }
  const addItem = () => {
    props.addItem(formData)
    props.onClose()
  }
  return (
    <Popup show={props.show}>
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
          <input style={{ flex: 2 }} type='text' onChange={onChange('title')} />
        </div>
        <div style={{ flexDirection: 'row', flex: 1 }}>
          <span style={{ flex: 1, color: 'black' }}>group</span>
          <input style={{ flex: 2 }} type='text' onChange={onChange('group')} />
        </div>
        <div style={{ flexDirection: 'row', flex: 1 }}>
          <span style={{ flex: 1, color: 'black' }}>end time</span>
          <input style={{ flex: 2 }} type='text' />
        </div>
        {showCalender ? <Calendar onChange={onSelectDate} /> : nul}
        <button variant='contained' onClick={addItem}>
          ADD
        </button>
      </div>
    </Popup>
  )
}
