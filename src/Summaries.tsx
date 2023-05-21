import React from 'react'
import { Summary } from './interfaces/summary'

interface IProps {
  summariesList: Summary[] | null
}
export function Summaries ({ summariesList }: IProps) {
  return (
    <div className="summaries-list">
      {summariesList && summariesList.map(summary => {
        const date = new Date(summary.created)
        return (
          <>
            <p>{`Date: ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`}</p>
            <p>{summary.text}</p>
          </>
        )
      })}
      {!summariesList && <p>You have no summaries</p>}
    </div>
  )
};
