export default {
  timeItems: [],
  groups: [],
  showAddItemForm: false,
  draftItem: {
    id: '',
    title: '',
    group: '',
    startTime: Date.now(),
    endTime: Date.now()
  },
  defaultTime: {
    starTime: Date.now(),
    endTime: Date.now()
  }
}
