import React, {CSSProperties, ReactElement} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {OverlayChildren, Placement} from 'react-bootstrap/esm/Overlay'

export function simpleOverlay(
  val: string,
  placement: Placement = 'top',
  maxWidth: number | undefined = undefined
) {
  // TODO move this from utils to it's own component with props etc.
  function simpleTooltip(val: string): OverlayChildren {
    let [tooltipClass, tooltipId] = [
      'whittle-tooltip',
      `whittle-tooltip-${Math.round(Math.random() * 1000)}`,
    ]
    let containerStyle: CSSProperties = {whiteSpace: 'pre-wrap'}
    let style = undefined
    if (maxWidth) {
      style = (
        <style type="text/css">{`.${tooltipClass}#${tooltipId} > .tooltip-inner {max-width: ${maxWidth}px;}`}</style>
      )
    }
    return (
      <Tooltip style={containerStyle} className={tooltipClass} id={tooltipId}>
        {style}
        {val}
      </Tooltip>
    )
  }
  return (children: ReactElement) => (
    <OverlayTrigger
      placement={placement}
      delay={{show: 150, hide: 150}}
      overlay={simpleTooltip(val)}>
      {children}
    </OverlayTrigger>
  )
}
