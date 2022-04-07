import {Button, Form, Modal} from 'react-bootstrap';
import {useRef} from 'react';
import {useBudget, UNCATEGORIZED_BUDGET_ID} from '../context/budgetContext';

const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const {addExpense, budgets} = useBudget();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value
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
          <Modal.Title>New expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type='text'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='amount'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type='number'
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='budgetId'>
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}
            >
              <option id={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>{budget.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
          <Button variant="primary" type='submit'>Save changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddExpenseModal;