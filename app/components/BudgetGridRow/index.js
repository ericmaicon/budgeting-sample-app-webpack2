// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  history: object,
};

export default class BudgetGridRow extends React.Component<BudgetGridRowProps> {
  static defaultProps = {
    transaction: {},
    categories: [],
    history: {},
  };

  openBudgetDetail = (id): void => {
    this.props.history.push(`/budget/${id}`);
  };

  render() {
    const { transaction, categories } = this.props;
    const amount = formatAmount(transaction.value);
    const amountCls = amount.isNegative ? styles.neg : styles.pos;
    const { id, categoryId, description } = transaction;
    const category = categories[categoryId];

    return (
      <tr key={id} onClick={() => this.openBudgetDetail(id)} className={styles.rowContent}>
        <td>
          <div className={styles.cellLabel}>Category</div>
          <div className={styles.cellContent}>{category}</div>
        </td>
        <td>
          <div className={styles.cellLabel}>Description</div>
          <div className={styles.cellContent}>{description}</div>
        </td>
        <td className={amountCls}>
          <div className={styles.cellLabel}>Amount</div>
          <div className={styles.cellContent}>{amount.text}</div>
        </td>
      </tr>
    );
  }
}
