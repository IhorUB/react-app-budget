import Container from 'react-bootstrap/Container'
import {Button, Stack} from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import {useState} from 'react';
import {useBudget} from './context/budgetContext';

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const {budgets, getBudgetExpenses} = useBudget();
  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='m-auto'>Budgets</h1>
          <Button
            variant='primary'
            onClick={() => setShowBudgetModal(true)}
          >
            Add Budget</Button>
          <Button variant='outline-primary'>Add Expense</Button>
        </Stack>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense, 0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.max}
                amount={amount}
              />
            )
          })}
        </div>
      </Container>

      <AddBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
    </>
  );
}

export default App;
