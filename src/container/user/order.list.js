

import React, { useEffect, useState } from "react";
import { Button,Modal,ModalFooter,ModalHeader,ModalBody, Form, Input, Row, Col,Table, Container, InputGroup, ButtonGroup,Label,FormGroup,FormText } from "reactstrap";
import { Pagination } from "antd"
import { FaSortUp,FaSortDown } from "react-icons/fa";
import ItemService from "../../services/item/item.service";
import AuthService from "../../services/item/auth.service";

const OrderList = () => {

    const [orders, setOrders] = useState([]);
    const [params, setParams] = useState({
        keyword: "",
        currentPage: 1,
        pageSize: 5,
        sortBy:"createdAt:desc"
    });
    const [totalItems, setTotalItems] = useState(0);

    const [itemUpdate, setItemUpdate] = useState({
        id:"",
        name:"",
        description:"",
        price:"",
        imageUrl:""
    });


    useEffect( async () => {
        const resultAPI = await ItemService.getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }, [])

    useEffect(async ()=>{
        const user = await AuthService.getCurrentUser();
        if(user){
            setShow(
                {
                    currentUser: user,
                    canModify: user.roles.includes("ROLE_ADMIN")
                }
            )
        }
    },[])

    const handleChange = async (event) => {
        const newParam = {...params, keyword: event.target.value };
        setParams(newParam);
        const resultAPI = await ItemService.getItems(newParam.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }

    async function handleSort(sortBy){
        const newParam = {...params, sortBy:sortBy }
        setParams(newParam);
        const resultAPI = await ItemService.getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }

    const handlePaginate = async (currentPage, pageSize) => {
        console.log(currentPage, pageSize)
        const resultAPI = await ItemService.getItems(params.keyword, currentPage, pageSize,params.sortBy)
        setParams({...params, currentPage: currentPage, pageSize: pageSize})
        setItems([...resultAPI.data.content])
        setTotalItems(resultAPI.data.totalElements)
    }

    function toggleModal(item){
        setIdModal(item.id);
        setItemUpdate(item);
    }

    const handleInputChange= (event)=>{
        setItemUpdate({
            ...itemUpdate,
            [event.target.name]:event.target.value
        });
    }

    const update = async (event)=>{
        event.preventDefault();
        await ItemService.updateItem(itemUpdate.id,itemUpdate);
        const resultAPI = await ItemService.getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
        setIdModal(-1);
        alert("Update success");
    }
    
    const deleteItem = async(id) =>{
        const resultAPI = await ItemService.deleteItem(id);
        console.log(resultAPI);
        alert("Delete success");
        window.location.reload();
    }

    return (
        <React.Fragment>
            <Container>
            <Row className="mx-auto mt-4 mb-4">
                <Col xs="8"></Col>
                <Col xs="4">
                    <Form>
                        <InputGroup>
                            <Input id="keyword" value={params.keyword} onChange={handleChange} type='text'  placeholder="Enter name of the item"/>
                        </InputGroup>
                    </Form>
                    
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th >Name 
                                <FaSortUp onClick={()=>handleSort("name:asc")}/>
                                <FaSortDown onClick={()=>handleSort("name:desc")} /> 
                            </th>
                            <th>Description</th>
                            <th>Created At
                                <FaSortUp onClick={()=>handleSort("createdAt:asc")}/>
                                <FaSortDown onClick={()=>handleSort("createdAt:desc")} /> 
                            </th>
                            <th className="pl-2">Price
                                <FaSortUp className="pl-2" onClick={()=>handleSort("price:asc")}/>
                                <FaSortDown className="pl-4"  onClick={()=>handleSort("price:desc")}/> 
                            </th>
                            <th>Image</th>
                            {show.canModify&&(
                                <th>Action</th>
                            )}   
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.price}{"$"}</td>     
                            </tr>
                        )
                        )}

                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination 
                    current={params.currentPage}
                    pageSize={params.pageSize}
                    onChange={handlePaginate}
                    showSizeChanger
                    pageSizeOptions={['5', '10', '15']}
                    total={totalItems} />
            </Row>
            </Container>
           
        </React.Fragment>
    );
}

export default OrderList;