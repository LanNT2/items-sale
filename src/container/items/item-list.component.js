import React, { useEffect, useState } from "react";
import { getItems } from "../../services/Item.service";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Pagination } from "antd";

const ItemList = (props) => {

    const [items, setItems] = useState([]);
    const [params, setParams] = useState({
        keyword: "",
        currentPage: 1,
        pageSize: 5,
    });
    const [totalItems, setTotalItems] = useState(0);


    useEffect( async () => {
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements);
    }, [])

    const handleChange = (event) => {
        const newParam = {...params, keyword: event.target.value }
        setParams(newParam)
    }

    const submit = async (event) => {
        event.preventDefault()
        const resultAPI = await getItems(params.keyword, params.currentPage, params.pageSize);
        setItems([...resultAPI.data.content]);
        setTotalItems(resultAPI.data.totalElements)
    }

    const handlePaginate = async (currentPage, pageSize) => {
        console.log(currentPage, pageSize)
        const resultAPI = await getItems(params.keyword, currentPage, pageSize)
        setParams({...params, currentPage: currentPage, pageSize: pageSize})
        setItems([...resultAPI.data.content])
        setTotalItems(resultAPI.data.totalElements)
    }

    return (
        <React.Fragment>
            <Row>
                <Col offset="6" xs="6">
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for="keyword">Keyword</Label>
                            <Input id="keyword" onChange={handleChange} value={params.keyword} type='text'/>
                        </FormGroup>
                        <Button color="primary" type="submit" >Search</Button>
                    </Form>
                    
                </Col>
            </Row>
            <Row>
                <ul>
                    {items.map((item) =><li key={item.id}>{item.name}</li>)}
                </ul>
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
        </React.Fragment>
    );
}

export default ItemList;