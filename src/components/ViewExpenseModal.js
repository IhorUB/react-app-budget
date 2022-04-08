import {Button, Modal, Stack} from 'react-bootstrap';
import {useBudget, UNCATEGORIZED_BUDGET_ID} from '../context/budgetContext';
import {currencyFormatter} from '../utils';

const ViewExpenseModal = ({budgetId, handleClose}) => {
  const {getBudgetExpenses, deleteBudget, budgets, deleteExpense} = useBudget();
  const expenses = getBudgetExpenses(budgetId);

  const budget = UNCATEGORIZED_BUDGET_ID === budgetId
    ? {name: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID}
    : budgets.find(b => b.id === budgetId)
  return (
    <Modal
      show={budgetId != null}
      onHide={handleClose}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >

      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction='horizontal'
                 gap='2'>
            <div>Expenses - {budget?.name}</div>
            {budget?.id !== UNCATEGORIZED_BUDGET_ID && (
              <Button variant='outline-danger'
                      onClick={() => {
                        deleteBudget(budget)
                        handleClose()
                      }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack direction='vertical' gap='3'>
          {expenses.map(expense => (
            <Stack key={expense.id} direction='horizontal' gap='1'>
              <div className='me-auto fs4'>{expense.description}</div>
              <div className='fs5'>{currencyFormatter.format(expense.amount)}</div>
              <Button
                onClick={() => deleteExpense(expense)}
                size='sm'
                variant='outline-danger'>&times;</Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
        <Button variant="primary" type='submit'>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewExpenseModal;