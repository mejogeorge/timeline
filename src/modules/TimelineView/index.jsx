import React, { useState, useId } from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import AddItemForm from './AddItemForm'
import { useTimelineStore } from './store'

export default props => {
  // const [showAddItem, setShowAddItem] = useState(false)
  // const [selectedItem, setSelectedItem] = useState({})
  const timelineStore = useTimelineStore(state => ({
    timeItems: state.timeItems,
    addNewItemToTimeline: state.addNewItemToTimeline,
    groups: state.groups,
    setShowAddItem: state.setShowAddItem,
    setDraftItem: state.setDraftItem,
    showAddItemForm: state.showAddItemForm
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
    <>
      {timelineStore.groups?.length ? (
        <Timeline
          groups={timelineStore.groups}
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
            timelineStore.setDraftItem({
              group: groupId,
              startTime: time,
              endTime: time + 60 * 60 * 1000
            })
            timelineStore.setShowAddItem(true)
            // timelineStore.addNewItemToTimeline({
            //   groupId,
            //   time
            // })
          }}
          itemRenderer={itemRenderer}
          defaultTimeStart={moment().add(-1, 'hour')}
          defaultTimeEnd={moment().add(1, 'day')}
        />
      ) : null}
      {timelineStore.showAddItemForm && <AddItemForm />}
    </>
  )
}
