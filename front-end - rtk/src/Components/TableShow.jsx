import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import getUserType from "../utils/getUserType.jsx";
import { useEffect, useState } from "react";
import useGetData from "../Hooks/use-get-data.jsx";
import { useDispatch, useSelector } from "react-redux";
import AlertMsg from "./AlertMsg.jsx";

const TableShow = (props) => {
    //::: handle props 
    let { header, SELECTOR, DISPATCHER, DELETEACTION, DELETESELECTOR, currentUser, title, addLink, addTitle } = props
    currentUser = currentUser || { id: '' }
    //:::

    //::: disable
    const [tableData, setTableDate] = useState([]) // handle better visualization for deleting
    const [deletedID, setDeletedID] = useState(null) // target the selected data
    const [isMsg, setIsMsg] = useState(false)
    //:::

    //::: 
    const {
        data,
        isLoading: isLoadingData,
        isEmpty: isEmptyData,
    } = useGetData(DISPATCHER, SELECTOR)

    useEffect(() => {
        setTableDate(data)
    }, [data])
    //:::

    //::: handle delete function
    const { isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete, success: successDelete, error: errorDelete } = useSelector(DELETESELECTOR)
    const dispatch = useDispatch()
    const handleDelete = async (id) => {
        setDeletedID(id)
        try {
            await dispatch(DELETEACTION(id)).unwrap()
            setDeletedID(null)
            setTableDate((prev) => prev.filter((pre) => pre.id !== id))
            setIsMsg(true)
        } catch (error) {
            setIsMsg(true)
        } finally {
            setDeletedID(null)
        }
    }
    //:::

    //::: table header
    const headerShow = header.map((head, index) => <th key={index}>{head?.name}</th>)
    //:::

    //::: table data
    const dataShow = tableData?.map((item, index) => (
        <tr key={index}>
            {header.map((item2, index2) => (
                <td key={index2}>
                    {item2?.key === 'image' ? <img src={item?.image} width='100px' height='50px' /> : getUserType(item[item2?.key])}
                    {currentUser && item[item2?.key] === currentUser?.name && '(you)'}
                </td>
            ))}
            <td style={{ width: '90px' }}>
                <NavLink to={`${item?.id}`}>
                    <Button variant={"primary"} size={"sm"} disabled={isLoadingData}>
                        <FontAwesomeIcon icon={faEdit} size={"xs"} />
                    </Button>
                </NavLink>
                <span> </span>
                {
                    currentUser.id !== item.id &&
                    <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id} disabled={isLoadingData || isLoadingDelete}>
                        {isLoadingDelete && deletedID === item?.id ? '...' : <FontAwesomeIcon icon={faTrash} size={"xs"} />}
                    </Button>
                }
            </td>
        </tr>
    )
    )
    //:::

    //::: data loading mock up
    const dataLoading = ['', ''].map((item, index) => (
        <tr key={index}>
            {
                header.map((item2, index) => <td key={index}>loading...</td>)
            }
            <td style={{ width: '100px' }}>
                <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id}>
                    ...
                </Button>
                <span> </span>
                <a>
                    <Button variant={"primary"} size={"sm"}>
                        ...
                    </Button>
                </a>
            </td>
        </tr>
    )
    )
    //:::

    //::: data not found jsx
    const dataNotFound = <tr colSpan='12'><td colSpan={12} style={{ textAlign: 'center' }}>No data found</td></tr>
    //:::

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1>{title}</h1>
                <NavLink to={addLink}>
                    <Button variant="outline-primary" size="sm">
                        {addTitle}
                    </Button>
                </NavLink>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {headerShow}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoadingData && dataLoading
                    }
                    {
                        isEmptyData && dataNotFound
                    }
                    {
                        !isLoadingData && dataShow
                    }
                </tbody>
            </Table>
            <AlertMsg
                message={successDelete?.message || errorDelete?.message}
                isError={isErrorDelete}
                isSuccess={isSuccessDelete}
                isMsg={isMsg}
                setIsMsg={setIsMsg}
                delay='1000'
            />
        </div>
    )
}

export default TableShow

