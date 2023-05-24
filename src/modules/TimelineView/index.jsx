import React, { useState, useId } from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import AddItemForm from './modules/AddItemForm'
import { useTimelineStore } from './modules/store'

const groups = [
  { id: 1, title: 'group 1', bgColor: 'red' },
  { id: 2, title: 'group 2', bgColor: 'black' },
  { id: 3, title: 'group 3', bgColor: 'black' }
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
  // const [showAddItem, setShowAddItem] = useState(false)
  // const [selectedItem, setSelectedItem] = useState({})
  const timelineStore = useTimelineStore(state => ({
    timeItems: state.timeItems,
    addNewItemToTimeline: state.addNewItemToTimeline
  }))

  const itemRenderer = ({
    item,
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
          onClick: () => {
            alert('itemRenderer')
          },
          onMouseDown: () => {
            console.log('on item click', item, itemContext, rightResizeProps)
            // setSelectedItem(item)
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
      items={timelineStore.timeItems}
      fullUpdate
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      canMove={true}
      canResize={'both'}
      onItemClick={(itemId, e, time) => {
        alert('onItemClick')
      }}
      onItemSelect={() => {
        alert('onItemSelect')
      }}
      onCanvasDoubleClick={(groupId, time, e) => {
        console.log('onCanvasClick', {
          groupId,
          time,
          e
        })
        timelineStore.addNewItemToTimeline({
          groupId,
          time
        })
      }}
      itemRenderer={itemRenderer}
      defaultTimeStart={moment().add(-1, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
    />
  )
}
