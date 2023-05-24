import { create } from 'zustand'
import initialState from './initialState'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

export const useTimelineStore = create(
  devtools(set => ({
    ...initialState,
    addNewItemToTimeline: ({ groupId, time }) => {
      const id = uuidv4()
      const newItem = {
        id,
        group: groupId,
        title: 'item 1' + id,
        start_time: moment(time),
        end_time: moment(time).add(1, 'hour')
      }
      set(state => ({
        timeItems: [...state.timeItems, newItem]
      }))
    }
  }))
)
