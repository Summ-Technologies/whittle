import React, {CSSProperties, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import {postLogin} from '../store/actions/user'

function LoginPage() {
  let dispatch = useDispatch()
  let [form, setForm] = useState({
    email: '',
    password: '',
  })

  function onSubmit() {
    dispatch(postLogin(form.email, form.password))
  }

  return (
    <Body>
      <Col
        xs={{span: 10, offset: 1}}
        md={{span: 6, offset: 3}}
        style={styles.pageContainer}>
        <div style={styles.pageHeader}>Login</div>
        <Form>
          <Form.Group>
            <Form.Control
              value={form.email}
              onChange={(event) =>
                setForm({...form, email: event.target.value})
              }
              type="text"
              placeholder="Email"
            />
            <Form.Control
              value={form.password}
              onChange={(event) =>
                setForm({...form, password: event.target.value})
              }
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <Button onClick={() => onSubmit()}>Submit</Button>
      </Col>
    </Body>
  )
}

const styles: {[key: string]: CSSProperties} = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  pageHeader: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  formContainer: {},
}

export default withRouter(LoginPage)
