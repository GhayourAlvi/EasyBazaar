import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from "../../assets/images/easy-store-logo.jpeg"
import { auth } from "../../helpers/firebase";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const LoginUI = () => {

  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const history = useHistory()
  const isDisabled = !form.password.length || !form.email.length


  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    document.title = "Login"
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/home')
      } else {
        history.push("/")
      }
    })

  }, [])




  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const handleSignInwithEmailAndPassword = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        setLoading(false)
        if (res) {
          console.log(res)
          history.push("/")
        }
        console.log("RES", res)

      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        setError(err.message)
      })
  }


  return (
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
          <Image style={{ width: 150 }} src={logo} />
          <h1>Welcome to Easy Bazaar</h1>
          <h2>Log-in to your account</h2>
        </Header>
        <Form size='large'>
          {error ? (
            <Message>{error}</Message>
          ) : null
          }
          <Segment stacked>
            <Form.Input
              fluid
              onChange={onChange}
              name="email"
              value={form.email || ""}
              style={{ caretColor: "blue" }}
              icon="user" iconPosition='left'
              placeholder='E-mail address' />
            <Form.Input
              fluid
              onChange={onChange}
              name="password"
              value={form.password || ""}
              icon={{ name: passwordShown ? "eye" : "eye slash", link: true, onClick: togglePasswordVisiblity }}
              style={{ caretColor: "blue" }}
              iconPosition='right'
              placeholder='Password'
              type={passwordShown ? "text" : "password"}
            />

            <Button
              loading={loading}
              onClick={handleSignInwithEmailAndPassword}
              style={{ backgroundColor: "rgb(0,0,128)", color: "rgb(255,204,0)" }}
              fluid
              size='large'
              disabled={isDisabled || loading}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <div style={{ marginTop: 50 }}>
          Dont have an account?
          <Link to="/register" style={{ padding: 10, }}>Sign Up</Link>
        </div>

        <div
          style={styles.social} >
          <h3
            style={styles.title}>Sign in with social</h3>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </Grid.Column>
    </Grid>
  )

}
const styles = {
  title: {
    backgroundColor: "rgb(0,0,128,.5)",
    color: "rgb(255,204,0)",
    fontSize: 18,
    lineHeight: 1.2,
    padding: 10,
    border: "1px solid #333",
    borderRadius: 10
  },
  social: {
    display: " flex",
    marginTop: 50,
    flexDirection: "column",
    maxWidth: 500,
    borderRadius: 10,
    padding: 10,
  }
}


export default LoginUI;