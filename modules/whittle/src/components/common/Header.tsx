import React, {CSSProperties} from 'react'
import {FaBars, FaSearch} from 'react-icons/fa'
import defaultStyles from '../../styles'
import Row from './Row'
import TextInput from './TextInput'

type HeaderProps = {
  inboxCount: number
  queueCount: number
  libraryCount: number
  activeTab?: HeaderTabs
  showSearchBar: boolean
  setShowSearchBar: (show: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSelectTab: (tab: HeaderTabs) => void
  onClickMenu: () => void
}

export const HeaderTabs = ['inbox', 'queue', 'library'] as const
export type HeaderTabs = typeof HeaderTabs[number]

export default function Header(props: HeaderProps) {
  // Styling
  const headerHeightPx = 50
  const menuIconPaddingPx = 10
  const styles: {[key: string]: CSSProperties} = {
    container: {
      height: `${headerHeightPx}px`,
      color: defaultStyles.colors.grey,
      justifyContent: 'space-between',
      display: 'flex',
      width: '100%',
    },
    leftContainer: {
      height: '100%',
      flexWrap: 'nowrap',
      alignItems: 'flex-end',
      display: 'flex',
    },
    menuIconContainer: {
      margin: 0,
      paddingLeft: `${menuIconPaddingPx}px`,
      paddingRight: `${menuIconPaddingPx}px`,
      paddingTop: `${menuIconPaddingPx}px`,
      paddingBottom: `${menuIconPaddingPx}px`,
      height: '100%',
      cursor: 'pointer',
    },
    menuIcon: {
      height: 22,
      width: 22,
    },
    boxesContainer: {
      marginTop: 'auto',
      marginBottom: 'auto',
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxTab: {
      fontWeight: 600,
      paddingLeft: 12,
      paddingRight: 12,
      cursor: 'pointer',
    },
    boxTabActive: {color: defaultStyles.colors.black},
    search: {
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      flexDirection: 'row',
      // display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      paddingRight: 20,
      paddingLeft: 20,

      display: 'none', // search in library only for now
    },
  }
  return (
    <Row style={styles.container}>
      <div style={styles.leftContainer}>
        <div style={styles.menuIconContainer} onClick={props.onClickMenu}>
          <FaBars className="joyride-settings" style={styles.menuIcon} />
        </div>
        <div style={styles.boxesContainer}>
          <div
            className="joyride-inbox"
            style={
              props.activeTab === 'inbox'
                ? {...styles.boxTab, ...styles.boxTabActive}
                : styles.boxTab
            }
            onClick={() =>
              props.onSelectTab('inbox')
            }>{`Inbox ${props.inboxCount}`}</div>
          <div
            style={
              props.activeTab === 'queue'
                ? {...styles.boxTab, ...styles.boxTabActive}
                : styles.boxTab
            }
            onClick={() =>
              props.onSelectTab('queue')
            }>{`Queue ${props.queueCount}`}</div>
          <div
            style={
              props.activeTab === 'library'
                ? {...styles.boxTab, ...styles.boxTabActive}
                : styles.boxTab
            }
            onClick={() => props.onSelectTab('library')}>{`Library`}</div>
          <div style={{width: 10}}></div>
        </div>
      </div>
      <div style={styles.search}>
        {props.showSearchBar ? (
          <TextInput
            placeholder={`Search your ${props.activeTab}`}
            value={props.searchQuery}
            onChangeValue={props.setSearchQuery}
          />
        ) : undefined}
        <FaSearch
          onClick={() => {
            props.setSearchQuery('')
            props.setShowSearchBar(!props.showSearchBar)
          }}
        />
      </div>
    </Row>
  )
}
