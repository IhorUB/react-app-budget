import BudgetCard from './BudgetCard';
import {useBudget, UNCATEGORIZED_BUDGET_ID} from '../context/budgetContext';

const UncategorizedBudgetCard = (props) => {
  const {getBudgetExpenses} = useBudget();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)

  if (amount === 0) return null;

  return (
    <BudgetCard amount={amount} name={UNCATEGORIZED_BUDGET_ID} gray {...props}/>
  )
}

export default UncategorizedBudgetCard;