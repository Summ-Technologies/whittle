// This file contains global styles that are used in many places throughout whittle

import {CSSProperties} from 'react'

const vars = {
  colors: {
    grey: '#B3B3B3',
    lightGrey: '#F3F3F3',
    purple: '#957ef9',
    lightPurple: '#CABEFC', // lightened by 50 using https://pinetools.com/lighten-color
    white: '#FFFFFF',
    black: '#000000',
  },
}

export const colors = {
  white: vars.colors.white,
  grey: vars.colors.grey,
  lightGrey: vars.colors.lightGrey,
  main: vars.colors.purple,
  lightMain: vars.colors.lightPurple,
  black: vars.colors.black,
}

export const header2: CSSProperties = {
  fontWeight: 700,
  color: colors.grey,
  fontSize: '1em',
}

export const defaultBorderWidth: number = 2

export default {
  header2,
  colors,
  defaultBorderWidth,
}
