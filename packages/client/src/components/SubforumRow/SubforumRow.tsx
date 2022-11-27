import * as React from 'react'
import '@/components/SubforumRow/Subforum.scss'

type SubforumRowProps = {
  icon?: JSX.Element
  title?: string
  discription?: string
  numberOfPosts?: string
  numberOfTopics?: string
  lastPost?: string
  player?: string
  date?: string
}

export const SubforumRow = (props: SubforumRowProps) => {
  return (
    <div className="subforum-row">
      <div className="subforum-icon subforum-column center">
        {props.icon}
      </div>
      <div className="subforum-description subforum-column">
        <h4>
          <a href="#">{props.title}</a>
        </h4>
        <p>{props.discription}</p>
      </div>
      <div className="subforum-stats subforum-column center">
        <span>
          {props.numberOfPosts} | {props.numberOfTopics}
        </span>
      </div>
      <div className="subforum-info subforum-column">
        <b>
          <a href="">{props.lastPost}</a>
        </b>{' '}
        от <a href="">{props.player}</a> <br />
        <small>{props.date}</small>
      </div>
    </div>
  )
}
