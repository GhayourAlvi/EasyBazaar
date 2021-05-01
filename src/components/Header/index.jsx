import React from 'react'
import { Button, Input, Grid, Icon, Image} from 'semantic-ui-react'
import logo from "../../assets/images/easy-store-logo.jpeg"
import { Link, useHistory, useLocation } from "react-router-dom"
import { auth } from '../../helpers/firebase'


const Header = () => {

    const { pathname } = useLocation();
    const history = useHistory()

    const signOut = () => {
        auth.signOut();
        history.push("/");
    }
    return(
        <Grid centered>
            
           
           <div style={styles.container}>
               <div>
               <Image  style={styles.image} src={logo}  alt=""/>
               </div>
                
            <div style={{ width: 500, display: "flex"}}>
                <Input  style={{ width: 500}} fluid  placeholder='Search...' />
                <Button style={{ width: 80, marginLeft:10, backgroundColor:"rgb(0,0,128)", color: "rgb(255,204,0)"}}>Search</Button>
            </div>
            <div>
                <ul style={styles.header_links}>
                   
                    <li style={styles.li}><Link style={styles.link} to=""><Icon style={styles.icon} name="shopping cart " /><span style={styles.p}>Cartegory</span></Link></li>
                    <li style={styles.li}><Link style={styles.link} to=""><Icon  style={styles.icon} name="shopping bag" /> <span style={styles.p}>Sell on Bazaar</span></Link></li>
                    {
                        pathname === "/"  ? (
                            <li style={styles.li}><Link style={styles.link} to="/auth/login"><Icon style={styles.icon} name="user outline" /><span style={styles.p}>Login</span></Link></li>
                            ): (
                            <li style={styles.button}><Button style={styles.iconButton}  onClick={signOut}  ><Icon style={styles.icon} name="sign out" /><span style={styles.p}>Logout</span></Button></li>
                        )
                    }
                </ul>
            </div>
           </div>
        </Grid>
    )
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    image: {
        width: 150,
        height: 80,
  
    },
    header_links: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin:"40px 20px",
        listStyleType: "none",
  
        
    },
    link: {
         color: "rgb(255,204,0)",
        
        
    },
    li: {
        border: "1px solid blue",
        width: 150,
        display:"flex",
        flexDirection: "row",
        borderRadius: 5,
        padding: 8,
        marginLeft: 10,
        backgroundColor: "rgb(0,0,128)",
        alignItems: "center",
        justifyContent:"center"

    },
    button: {
        padding: 8,
    },
    iconButton: {
        backgroundColor: "rgb(0,0,128)",
        color: "rgb(255,204,0)",
    },
    icon: {
        // padding: 5,
        fontSize: 18
    },
    p: {
        fontSize: 12
    }

}


export default Header
