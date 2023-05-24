import React, { useState } from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import AddItemForm from './modules/AddItemForm'

const groups = [
  { id: 1, title: 'group 1', bgColor: 'red' },
  { id: 2, title: 'group 2', bgColor: 'black' },
  { id: 3, title: 'group 3', bgColor: 'black' }
]

const tempItems = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(5, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title'
}

const defaultTimeStart = moment()
  .startOf('day')
  .toDate()
const defaultTimeEnd = moment()
  .startOf('day')
  .add(1, 'day')
  .toDate()

export default props => {
  const [items, setItems] = useState(tempItems || [])
  const [showAddItem, setShowAddItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  console.log('selectedItem', selectedItem)
  const addItem = item => {
    console.log('addItem press', [...items, { ...item }])
    setItems([...items, { ...item }])
  }

  const removeItems = item => () => {
    console.log('::::item press got', item)
    // setItems(items.filter(element => element.id !== item.id))
  }
  const handleItemMove = () => {}
  const handleItemResize = () => {}

  const itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? 'red'
        : item.selectedBgColor
      : item.bgColor
    const borderColor = itemContext.resizing ? 'red' : item.color
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          },
          // onTouchEnd: () => console.log('on item click'),
          onMouseDown: () => {
            console.log('on item click', item, itemContext, rightResizeProps)
            setSelectedItem(item)
            // setShowAddItem(true)
            // if (itemContext.selected) removeItems(item)()
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft: 3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {itemContext.title}
        </div>
        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    )
  }
  return (
    <Timeline
      groups={groups}
      items={items}
      // keys={keys}
      fullUpdate
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      canMove={true}
      canResize={'both'}
      onItemClick={(itemId, e, time) => {
        e.preventDefault()
        // const filteredItem = items.filter(element => element.id === itemId)
        // console.log('onItemClick props', itemId, filteredItem)
        // selectedItem(filteredItem)
        setShowAddItem(true)
      }}
      itemRenderer={itemRenderer}
      defaultTimeStart={moment().add(-1, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
      onItemMove={handleItemMove}
      onItemResize={handleItemResize}
    />
    // <AddItemForm
    //   show={showAddItem}
    //   selectedItem={selectedItem}
    //   addItem={addItem}
    //   onClose={() => setShowAddItem(false)}
    // />
  )
}
