import React, {CSSProperties, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import {
  connectGoogleAccountStep1,
  getLinkedGmailAccount,
} from '../store/actions/user'
import {getLinkedGoogleAccount} from '../store/getters/user'

function AccountPage() {
  let dispatch = useDispatch()
  let connectedGmail = useSelector(getLinkedGoogleAccount)

  useEffect(() => {
    dispatch(getLinkedGmailAccount())
  }, [dispatch])

  function onClick() {
    dispatch(connectGoogleAccountStep1())
  }

  return (
    <Body>
      <Col xs={{span: 12}} style={styles.container}>
        {connectedGmail ? (
          <>
            <div>The current google account connected is:</div>
            <div>
              <b>{connectedGmail}</b>
            </div>
          </>
        ) : (
          <>
            <div>No Google account is currently connected.</div>
            <Button onClick={onClick}>Connect Google Account?</Button>
          </>
        )}
      </Col>
    </Body>
  )
}

const styles: {[key: string]: CSSProperties} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignContent: 'center',
  },
}

export default withRouter(AccountPage)
