import { useState } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"
import { fakeFetch } from "src/utils/fetch"
import { useCallback } from "react"
import {SuccessResponse} from "src/utils/types"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
}) => {
      // const [approved, setApproved] = useState(transaction.approved)
  const [approved, setApproved] = useState(
    localStorage.getItem(`transaction_${transaction.id}_approved`) === "true" ? true : false
  )

  const setTransactionApproval = useCallback(
    (newValue: boolean) => {
      fakeFetch<SuccessResponse>("setTransactionApproval", {
        transactionId: transaction.id,
      })

      // Update local state and localStorage
      setApproved(newValue)
      localStorage.setItem(`transaction_${transaction.id}_approved`, newValue.toString())
    },
    [transaction.id]
  )

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox id={transaction.id} checked={approved} onChange={setTransactionApproval} />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
