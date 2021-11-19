import React, { useEffect, useState } from "react";
import { getItems } from "../../services/item/Item.getAll";
import { Button,Modal,ModalFooter,ModalHeader,ModalBody, Form, Input, Row, Col,Table, Container, InputGroup, ButtonGroup,Label,FormGroup,FormText } from "reactstrap";
import { Pagination } from "antd";
import {AiOutlineSearch} from "react-icons/ai"
import { FaSortUp,FaSortDown } from "react-icons/fa";
import { updateItem } from "../../services/item/item.update";

import ItemService from "../../services/item/item.service";

const ItemList = () => {

    const [items, setItems] = useState([]);
    const [params, setParams] = useState({
        keyword: "",
        currentPage: 1,
        pageSize: 5,
        sortBy:"createdAt:desc"
    });
    const [totalItems, setTotalItems] = useState(0);

    const[idModal,setIdModal] =useState("");

    const [itemUpdate, setItemUpdate] = useState({
        id:"",
        name:"",
        description:"",
        price:"",
        imageUrl:""
    })


    useEffect( async () => {
        const resultAPI = await ItemService.getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }, [])

    const handleChange = (event) => {
        const newParam = {...params, keyword: event.target.value }
        setParams(newParam)
    }

    async function handleSort(sortBy){
        const newParam = {...params, sortBy:sortBy }
        setParams(newParam);
        const resultAPI = await ItemService.getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }

    const submit = async (event) => {
        event.preventDefault();
        const resultAPI = await ItemService.getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
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
        console.log(resultAPI);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }

    return (
        <React.Fragment>
            <Container>
            <Row className="mx-auto mt-4 mb-4">
                <Col xs="8"></Col>
                <Col xs="4">
                    <Form onSubmit={submit}>
                        <InputGroup>
                            <Input id="keyword" onChange={handleChange} value={params.keyword} type='text'  placeholder="Enter name of the item"/>
                            <Button className="mx-auto my-auto" color="primary" type="submit"><AiOutlineSearch/></Button>
                        </InputGroup>
                    </Form>
                    
                </Col>
            </Row>
            <Row>
                <div className="mb-2">
                    <h2  style={{textAlign:"center"}}>Item List</h2>
                </div>
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
                            <th>Action</th>
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
                                <td>
                                    <img src={item.imageUrl} width={150} height={150}></img>
                                </td>
                                <td>
                                    <ButtonGroup className="mt-5">
                                        <Button color="warning" onClick={()=>toggleModal(item)}>Update</Button>{' '}
                                        <Button color="danger">Delete</Button>
                                    </ButtonGroup>
                                    <div>
                                        <Modal isOpen={idModal === item.id} fullscreen="lg" toggle={()=>toggleModal(-1)} fade={false}>
                                            <ModalHeader toggle={()=>toggleModal(-1)}>Update Item</ModalHeader>
                                            <ModalBody>
                                                <Form onSubmit={update}>
                                                    <FormGroup row>
                                                        <Label for="name" sm={2}> Item Id</Label>
                                                        <Col sm={10}>
                                                            <Input id="id" name="id"  type="text" value={itemUpdate.id} onChange={handleInputChange}/>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label for="name" sm={2}>Item Name</Label>
                                                        <Col sm={10}>
                                                            <Input id="name" name="name"  type="text" value={itemUpdate.name} onChange={handleInputChange}/>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Label for="description" sm={2}>Description</Label>
                                                        <Col sm={10}>
                                                            <Input id="description" name="description" type="textarea" value={itemUpdate.description} onChange={handleInputChange}/>
                                                        </Col>
                                                    </FormGroup> 
                                                    <FormGroup row>
                                                        <Label for="price" sm={2}>Price</Label>
                                                        <Col sm={10}>
                                                            <Input id="price" name="price" value={itemUpdate.price} onChange={handleInputChange}/>
                                                        </Col>
                                                    </FormGroup> 
                                                    <FormGroup row>
                                                        <Label for="imageUrl" sm={2}>ImageUrl</Label>
                                                        <Col sm={10}>
                                                            <Input id="imageUrl" name="imageUrl" type="textarea" value={itemUpdate.imageUrl} onChange={handleInputChange}/>
                                                        </Col>
                                                    </FormGroup> 
                                                    <FormGroup>
                                                        <Button type="submit">Update</Button>
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                        </div>
                                </td>
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

export default ItemList;