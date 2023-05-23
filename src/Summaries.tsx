import React from 'react'
import { Summary } from './interfaces/summary'
import { DeleteIcon } from './icons/DeleteIcon'
import './Summaries.css'

interface IProps {
  summariesList: Summary[] | null;
  deleteSummary: (id: string) => void;
}
export function Summaries ({ summariesList, deleteSummary }: IProps) {
  return (
    <div className="summaries-list">
      {summariesList && summariesList.map(summary => {
        const date = new Date(summary.created * 1000)
        return (
          <div key={summary._id} className="summary-container">
            <div className="summary-top">
              <p>{`${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`}</p>
              <button onClick={() => deleteSummary(summary._id)} className="delete-btn">
                <DeleteIcon />
              </button>
            </div>
            <p>{summary.text}</p>
          </div>
        )
      })}
      {!summariesList && <p>You have no summaries</p>}
    </div>
  )
};
