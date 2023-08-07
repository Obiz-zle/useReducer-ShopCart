
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";


export default function Header() {

const { state: {cart}, dispatch, productDispatch} = CartState();


  return (
    <Navbar bg="dark" variant="dark" style={{height:80}} >
        <Container>
            <Navbar.Brand href="#home">
                <Link to="/">Shopping Cart</Link>
            </Navbar.Brand>

            <Navbar.Text className="search">
                <FormControl style={{width:500}} 
                             placeholder="Search a product" 
                             className="m-auto"
                             onChange={(e) => productDispatch({type:"FILTER_BY_SEARCH", payload: e.target.value})}/>
            </Navbar.Text>

            <Nav>
                <Dropdown drop="start">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FaShoppingCart color="white" fontSize="25px" />
                        <Badge>{cart.length}</Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu  style={{minWidth:370}}>
                        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                        {
                            cart.length > 0 ?
                                <>
                                    {cart.map(prod => (
                                        <span className="cartitem" key={prod.id}>
                                            <img src={prod.image} alt={prod.name} className="cartItemImg" />
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>${prod.price.split(".")[0]}</span>
                                            </div>
                                            <AiFillDelete fontSize="20px" 
                                                        style={{cursor: "pointer"}}
                                                        onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: prod})} />
                                        </span>

                                    ))}

                                    <Link to="/cart">
                                        <Button style={{width: "95%", margin: "0 10px"}}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                             
                                :

                                <span style={{padding:10}}>Cart is Empty!</span>
                        }
                        
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>

        </Container>
    </Navbar>
  );
}
