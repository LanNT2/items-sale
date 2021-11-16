import React, { useEffect, useState } from "react";
import { getItems } from "../../services/Item.service";
import { Button, Form, Input, Row, Col,Table, Container, InputGroup } from "reactstrap";
import { Pagination } from "antd";
import {AiOutlineSearch} from "react-icons/ai"
import { FaSortUp,FaSortDown } from "react-icons/fa";
const ItemList = () => {

    const [items, setItems] = useState([]);
    const [params, setParams] = useState({
        keyword: "",
        currentPage: 1,
        pageSize: 5,
        sortBy:"createdAt:desc"
    });
    const [totalItems, setTotalItems] = useState(0);


    useEffect( async () => {
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }, [])

    const handleChange = (event) => {
        const newParam = {...params, keyword: event.target.value }
        setParams(newParam)
    }

    const handleSortByNameDESC = async () => {
        const newParam = {...params, sortBy:"name:desc" };
        console.log(newParam);
        setParams(newParam);
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
        console.log(new Date());
    }
    const handleSortByNameASC = async () => {
        const newParam = {...params, sortBy:"name:asc" };
        console.log(newParam);
        setParams(newParam);
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }
    const handleSortByCreatedAtDESC = async () => {
        const newParam = {...params, sortBy:"createdAt:desc" };
        console.log(newParam);
        setParams(newParam);
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }
    const handleSortByCreatedAtASC = async () => {
        const newParam = {...params, sortBy:"createdAt:asc" };
        console.log(newParam);
        setParams(newParam);
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }
    const handleSortByPriceDESC = async () => {
        const newParam = {...params, sortBy:"price:desc" }
        setParams(newParam);
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }
    const handleSortByPriceASC = async () => {
        const newParam = {...params, sortBy:"price:asc" }
        setParams(newParam);
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }

    const submit = async (event) => {
        event.preventDefault()
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize,params.sortBy);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }

    const handlePaginate = async (currentPage, pageSize) => {
        console.log(currentPage, pageSize)
        const resultAPI = await getItems(params.keyword, currentPage, pageSize,params.sortBy)
        setParams({...params, currentPage: currentPage, pageSize: pageSize})
        setItems([...resultAPI.data.content])
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th >Name 
                                <FaSortUp onClick={handleSortByNameASC}/>
                                <FaSortDown onClick={handleSortByNameDESC} /> 
                            </th>
                            <th>Description</th>
                            <th>Created At
                                <FaSortUp onClick={handleSortByCreatedAtASC}/>
                                <FaSortDown onClick={handleSortByCreatedAtDESC} /> 
                            </th>
                            <th className="pl-2">Price
                                <FaSortUp className="pl-2" onClick={handleSortByPriceASC}/>
                                <FaSortDown className="pl-4"  onClick={handleSortByPriceDESC}/> 
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
                                <td>{item.createdAt}</td>
                                <td>{item.price}{"$"}</td>
                                <td>
                                    <img src={item.imageUrl} width={150} height={150}></img>
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