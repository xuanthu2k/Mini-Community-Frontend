import { Card, Button } from "react-bootstrap";
const USerInfo = (props) => {
    const {info} = props
    return (  
        <>
            <Card className="lg-form mt-5">
                <Card.Img variant="top" src="https://png.pngtree.com/png-vector/20200329/ourlarge/pngtree-character-avatar-of-businessman-with-beard-png-image_2166772.jpg" />
                <Card.Body>
                    <Card.Title>Name: {info.username ||""}</Card.Title>
                    <Card.Subtitle>Role: {info.admin==true?"Admin":"User"}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    )
}
 
export default USerInfo;