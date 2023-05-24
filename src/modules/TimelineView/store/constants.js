import moment from 'moment'

export const timeItemsSample = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment().format('x'),
    end_time: moment()
      .add(5, 'hour')
      .format('x')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment()
      .add(-0.5, 'hour')
      .format('x'),
    end_time: moment()
      .add(0.5, 'hour')
      .format('x')
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

export const groupsSample = [
  { id: 1, title: 'group 1', bgColor: 'red' },
  { id: 2, title: 'group 2', bgColor: 'black' },
  { id: 3, title: 'group 3', bgColor: 'black' }
]
