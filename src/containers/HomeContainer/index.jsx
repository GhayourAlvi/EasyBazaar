import React, { useEffect } from 'react'
import Header from '../../components/Header'

const HomeContainer = ({ user }) => {

    useEffect(() => {
        document.title = "Welcome to Easy Bazaar"
    })
console.log("User", user)

    return (
        <div>
            <Header />
          <div style={styles.userInfo}>
            {
                user.photoURL &&
           ( <img style={styles.image} src={user?.photoURL} alt="user-pics" />)
            }
            <h1>Welcome <span style={{ color: "greenyellow"}}>{user.displayName}</span> to Easy Bazaar</h1>
        </div>
        </div>
       
    )
}

export default HomeContainer;


const styles = {
    userInfo:{
         display: "flex",
          justifyContent: "center",
           alignItems: "center",
            flexDirection: "column"
        },
        image: {
            width: 120,
            height: 100,
            borderRadius: "50%",
           
        }
}
