import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Body from '../components/common/Body'
import {postArticle} from '../store/actions/articles'

function AdminPage() {
  let dispatch = useDispatch()
  let [form, setForm] = useState({
    title: '',
    subjectline: '',
    source: '',
    outline: '',
    content: '',
    tags: '',
  })

  function onSubmit() {
    dispatch(
      postArticle(
        form.title,
        form.subjectline,
        form.source,
        form.outline,
        form.content,
        form.tags
      )
    )
  }

  return (
    <Body>
      <Form>
        {(Object.keys(form) as Array<keyof typeof form>).map((key) => {
          let val = form[key]
          return (
            <Form.Group id={key}>
              {['content', 'outline'].includes(val) ? (
                <Form.Control
                  value={val}
                  onChange={(event) =>
                    setForm({...form, [key]: event.target.value})
                  }
                  as="textarea"
                  placeholder={key}
                />
              ) : (
                <Form.Control
                  value={val}
                  type="text"
                  placeholder={key}
                  onChange={(event) =>
                    setForm({...form, [key]: event.target.value})
                  }
                />
              )}
            </Form.Group>
          )
        })}
      </Form>
      <Button onClick={() => onSubmit()}>Submit</Button>
    </Body>
  )
}

export default withRouter(AdminPage)
