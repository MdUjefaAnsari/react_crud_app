import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

function Registration() {
  const [show, setShow] = useState(true);
  const [allData, setAllData] = useState([{}]);
  const [buttonState, setButtonState] = useState(true);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    number: "",
  });

  function getInputData(e) {
    // console.log(e.target);
    const target = e.target;
    // console.log(target);
    const value = target.value;
    // console.log(value);
    const key = target.name;
    // console.log(key,value);
    return setInput((oldValue) => {
      return {
        ...oldValue,
        [key]: value,
      };
    });
  }
  const temp = {};

  const getFormData = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    // console.log(formData);

    // console.log(formData.get("fullname"));
    // console.log(formData.get("email"));
    // console.log(formData.get("password"));
    // console.log(formData.get("number"));
    // console.log(formData.get("file"));

    for (let data of formData.entries()) {
      // console.log(data);
      const key = data[0];
      // console.log(key);
      let value = data[1];
      // console.log(value);
      // console.log(typeof(value))
      if (typeof value == "object") {
        value = URL.createObjectURL(value);
      }
      // console.log(value);
      temp[key] = value;
      // console.log(temp);
    }
  };

  function inserData(e) {
    e.preventDefault();
    getFormData(e);
    return (
      setAllData((oldData) => {
        return [...oldData, temp];
      }),
      setShow(false),
      setInput({
        fullname: "",
        email: "",
        password: "",
        number: "",
      })
    );
  }
  function updateData(e) {
    e.preventDefault();
    // alert("update data")
    // alert(index)
    getFormData(e);

    const tempData = [...allData];
    //  alert(tempData);
    tempData[index] = temp;
    //  alert(tempData)

    return setShow(false), setAllData(tempData);
  }

  function editData(item) {
    // console.log(item)
    // alert(item.index)
    return (
      setShow(true), setInput(item), setButtonState(false), setIndex(item.index)
    );
  }

  function deleteUser(index) {
    // console.log(index);
    const tempData = [...allData];
    // console.log(tempData);
    tempData.splice(index, 1);

    // console.log(tempData);
    return setAllData(tempData);
  }

  function addButton() {
    return (
      setShow(true),
      setInput({
        fullname: "",
        email: "",
        password: "",
        number: "",
      }),
      setButtonState(true)
    );
  }

  function Tr({ item }) {
    // console.log(item.index);
    return (
      <>
        <tr>
          <td>{item.index + 1}</td>
          <td>
            <img
              className="rounded-circle"
              src={item.file}
              width={50}
              height={50}
            />
          </td>
          <td>{item.fullname}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>{item.number}</td>
          <td>
            <Button
              onClick={() => {
                editData(item);
              }}
              variant="primary"
              className="me-3"
            >
              <i className="fa fa-edit "></i>
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteUser(item.index);
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </td>
        </tr>
      </>
    );
  }
  return (
    <>
      <h1 className="text-center">Registration Details</h1>

      <button
        onClick={addButton}
        className="btn btn-success position-absolute bottom-0 end-0 me-3 mb-3 rounded-circle"
      >
        <i className="fa fa-plus"></i>
      </button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={buttonState ? inserData : updateData}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Full Name"
                onChange={getInputData}
                value={input.fullname}
              />

              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={getInputData}
                value={input.email}
              />

              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={getInputData}
                value={input.password}
              />
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                name="number"
                placeholder="Number"
                onChange={getInputData}
                value={input.number}
              />

              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                name="file"
                placeholder="Insert Image"
              />
              <br />
              {buttonState ? (
                <Button
                  onClick={() => {
                    setShow(false);
                  }}
                  type="submit"
                  variant="success"
                  className="me-3"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShow(false);
                  }}
                  type="submit"
                  variant="success"
                  className="me-3"
                >
                  Update
                </Button>
              )}
              <Button
                onClick={() => {
                  setShow(false);
                }}
                type="reset"
                variant="danger"
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
          {/* <p>{JSON.stringify(input)}</p> */}
        </Modal.Body>
      </Modal>
      {/* <h1>{JSON.stringify(allData)}</h1> */}
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((item, index) => {
              item["index"] = index;
              return <Tr item={item} key={index} />;
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
export default Registration;
