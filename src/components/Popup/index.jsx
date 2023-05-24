import React from 'react'

export default props => {
  if (!props.show) return null
  return (
    <div
      style={{
        zIndex: 300,
        display: 'flex',
        position: 'absolute',
        background: '#00000088',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }}
    >
      {props.children}
    </div>
  )
}
