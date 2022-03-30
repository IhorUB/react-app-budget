import {Button, Form, Modal} from 'react-bootstrap';
import {useRef} from 'react';
import {useBudget} from '../context/budgetContext';

const AddBudgetModal = ({show, handleClose}) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const {addBudget} = useBudget();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={nameRef}
              type='text'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='max'>
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type='number'
              min={0}
              step={0.01}
              required/>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" type='submit'>Save changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddBudgetModal;