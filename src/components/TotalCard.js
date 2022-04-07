import BudgetCard from './BudgetCard';
import {useBudget} from '../context/budgetContext';

const TotalCard = () => {
  const {budgets, expenses} = useBudget();
  const max = budgets.reduce((acc, budget) => acc + budget.max, 0);
  const amount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  if (max === 0) return null;

  return <BudgetCard amount={amount} name='Total' max={max} hideButtons/>
}

export default TotalCard;