import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = (props) => {
    const active = props.active
    let newsFeedStyle = {
        textDecoration:"none", color:"grey"
    }
    let profileStyle = {
        textDecoration:"none", color:""
    }
    if(active){
        newsFeedStyle = {
            textDecoration:"none", color:""
        }
        profileStyle = {
            textDecoration:"none", color:"grey"
        }
    }
    return (  
        <>
            <div className="sticky-top bg-light">
                <h1  className='text-center'>Mini Community</h1>
                <Nav variant="tabs" >
                    <Nav.Item>
                        <Link to='/' style={newsFeedStyle}  className="m-2">
                            NewsFeed
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/profile' style={profileStyle} className="m-2">
                            Profile
                        </Link>
                    </Nav.Item>
                </Nav>
            </div>
        </>
    )
}
 
export default Header;