import { create } from 'zustand'
import initialState from './initialState'
import { devtools } from 'zustand/middleware'
import { v4 as uuid4 } from 'uuid'
import moment from 'moment'
import { groupsSample, timeItemsSample } from './constants'

export const useTimelineStore = create(
  devtools(
    (set, get) => ({
      ...initialState,
      addNewItemToTimeline: () => {
        const id = uuid4()
        const { group, title, startTime, endTime } = get().draftItem
        const newItem = {
          id,
          group,
          title,
          start_time: startTime,
          end_time: endTime
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
      },
      setDraftItem: draftItem => {
        set({
          draftItem: {
            ...get().draftItem,
            ...draftItem
          }
        })
      },
      clearDraft: () => {
        set({
          draftItem: {}
        })
      }
    }),
    { name: 'timeline-store' }
  )
)
