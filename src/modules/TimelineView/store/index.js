import { create } from 'zustand'
import initialState from './initialState'
import { devtools } from 'zustand/middleware'
import { v4 as uuid4 } from 'uuid'
import moment from 'moment'
import { groupsSample, timeItemsSample } from './constants'

export const useTimelineStore = create(
  devtools((set, get) => ({
    ...initialState,
    addNewItemToTimeline: ({ groupId, time }) => {
      const id = uuid4()
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
    },
    addNewGroup: ({ groupName }) => {
      const id = uuid4()
      const newGroup = {
        id,
        title: groupName,
        bgColor: 'red'
      }
      set({
        groups: [...get().groups, newGroup]
      })
    },
    loadSampleData: () => {
      set({
        timeItems: timeItemsSample,
        groups: groupsSample
      })
    },
    setShowAddItem: showAddItemForm => {
      set({
        showAddItemForm
      })
    }
  }))
)
