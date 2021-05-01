import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, Grid, GridColumn, Header as SemanticHeader, Image, Message, Segment } from "semantic-ui-react"
import logo from "../../assets/images/easy-store-logo.jpeg"
import { auth } from "../../helpers/firebase"


const RegisterUI = () => {

    const history = useHistory("")
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })
    const [loading, setLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)

    const [error, setError] = useState("")
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const isDisabled = !form.firstname.length || !form.lastname.length || !form.email.length || !form.password.length;

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const onSubmit = () => {
        setLoading(true)
        const { email, password, firstname, lastname } = form;
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                res.user.updateProfile({
                    displayName: `${firstname} ${lastname}`
                })
                history.push("/");
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }
    useEffect(() => {
        document.title = "Register"
    }, [])
    return (
        <div>
            <Grid centered>
                <GridColumn style={{ maxWidth: 550, marginTop: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Image src={logo} width={150} />
                        <SemanticHeader style={{ marginTop: 0, marginBottom: 20 }}>Welcome to Easy Bazaar!</SemanticHeader>
                    </div>
                    <div>
                        {error ? (<Message>{error}</Message>) : null}
                        <Form>
                            <Form.Field>
                                <Form.Input
                                    name="firstname"
                                    label="First Name"
                                    value={form.firstname || ""}
                                    onChange={onChange}
                                    placeholder='First Name'
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    name="lastname"
                                    label="Last Name"
                                    value={form.lastname || ""}
                                    onChange={onChange}
                                    placeholder='Last Name'
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    name="email"
                                    type="email"
                                    label="Email"
                                    value={form.email || ""}
                                    onChange={onChange}
                                    placeholder='Email'
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    style={{ borderColor: "rgb(0,0,128)" }}
                                    name="password"
                                    label="Password"
                                    value={form.password || ""}
                                    onChange={onChange}
                                    placeholder='Password'
                                    icon={{ name: passwordShown ? "eye" : "eye slash", link: true, onClick: togglePasswordVisiblity }}
                                    iconPosition='right'
                                    type={passwordShown ? "text" : "password"}
                                />
                            </Form.Field>
                            <Button
                                disabled={isDisabled || loading}
                                loading={loading}
                                style={{ backgroundColor: "rgb(0,0,128)", color: "rgb(255,204,0)" }} onClick={onSubmit}
                                fluid
                                type='submit'
                            >Submit</Button>
                        </Form>
                        <Segment>Already have an account? <Link to="/" color="red">Login here</Link>.</Segment>
                    </div>
                </GridColumn>
            </Grid>
        </div>

    )
}


export default RegisterUI;