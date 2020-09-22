// This file contains global styles that are used in many places throughout whittle

import {CSSProperties} from 'react'

const vars = {
  colors: {
    grey: '#B3B3B3',
    lightGrey: '#F3F3F3',
    purple: '#9F8AFF',
    lightPurple: '#CFC4FF', // lightened by 50 using https://pinetools.com/lighten-color
    white: '#FFFFFF',
    black: '#000000',
    blue: '#0000EE',
  },
}

export const colors = {
  white: vars.colors.white,
  grey: vars.colors.grey,
  lightGrey: vars.colors.lightGrey,
  main: vars.colors.purple,
  lightMain: vars.colors.lightPurple,
  black: vars.colors.black,
  blueLink: vars.colors.blue,
}

export const header: CSSProperties = {
  fontWeight: 700,
  color: colors.black,
  fontSize: '2.5em',
}

export const header2: CSSProperties = {
  fontWeight: 500,
  color: colors.grey,
  fontSize: '1.1em',
}

export const body: CSSProperties = {
  fontWeight: 300,
  color: colors.black,
  fontSize: '1em',
}

export const defaultBorderWidth: number = 1

export const roundedCorners: CSSProperties = {
  borderRadius: '5px',
}

export const defaultBoxShadow: CSSProperties = {
  boxShadow: `3px 3px 5px 5px rgba(0, 0, 0, .25)`,
}

export const ellipsisOverflow: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export default {
  header,
  header2,
  body,
  colors,
  defaultBorderWidth,
  defaultBoxShadow,
  roundedCorners,
  ellipsisOverflow,
}
