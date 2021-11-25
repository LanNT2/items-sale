

import React, { useEffect, useState } from "react";
import { Row,Table, Container} from "reactstrap";
import AuthService from "../../services/item/auth.service";
import UserService from "../../services/item/user.service";

const Cart = () => {

    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect( async () => {
        const user =  AuthService.getCurrentUser();
        const resultAPI = await UserService.getItemsInCart(user.id);
        console.log(resultAPI.data);
        setItems([...resultAPI.data]);
       // setTotalItems(resultAPI.);
    }, [])

    return (
        <React.Fragment>
            <Container>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th >Name 
                            </th>
                            <th>Description</th>
                            <th className="pl-2">Price
                            </th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}{"$"}</td>
                                <td> <img src={item.imageUrl} width={150} height={150}></img></td>      
                            </tr>
                        )
                        )}

                    </tbody>
                </Table>
            </Row>
            </Container>
           
        </React.Fragment>
    );
}

export default Cart;