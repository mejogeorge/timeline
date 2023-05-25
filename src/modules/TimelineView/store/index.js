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
        const {
          id: editId,
          edit,
          group,
          title,
          startTime,
          endTime
        } = get().draftItem
        const id = editId || uuid4()
        const newItem = {
          id,
          group,
          title,
          start_time: startTime,
          end_time: endTime
        }
        let payload = []
        const { timeItems } = get()
        if (edit) {
          payload = timeItems.map(item => {
            if (item.id === id) {
              return newItem
            }
            return item
          })
        } else {
          payload = [...timeItems, newItem]
        }
        set({
          timeItems: payload.filter(p => p.id !== editId)
        })
        setTimeout(() => {
          set({
            timeItems: payload
          })
        }, 0)
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
          showAddItemForm,
          draftItem: showAddItemForm ? get().draftItem : {}
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
      },
      editItem: itemId => {
        const { timeItems } = get()
        const editItem = timeItems.find(({ id }) => id === itemId)
        console.log('editItem', editItem)
        set({
          draftItem: {
            id: editItem.id,
            title: editItem.title,
            group: editItem.group,
            startTime: editItem.start_time * 1,
            endTime: editItem.end_time * 1,
            edit: true
          }
        })
      },
      deleteItem: () => {
        const { draftItem, timeItems } = get()
        set({
          timeItems: timeItems.filter(p => p.id !== draftItem.id)
        })
      }
    }),
    { name: 'timeline-store' }
  )
)
