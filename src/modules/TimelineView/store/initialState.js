export default {
  timeItems: [],
  groups: [],
  showAddItemForm: false,
  draftItem: {
    id: '',
    title: '',
    group: '',
    startTime: Date.now(),
    endTime: Date.now(),
    edit: false
  },
  defaultTime: {
    starTime: Date.now(),
    endTime: Date.now()
  }
}
