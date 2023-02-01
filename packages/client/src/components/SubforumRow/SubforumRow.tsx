import './SubforumRow.scss';

type SubforumRowProps = {
  icon?: JSX.Element
  title: string
  description?: string
  numberOfComments?: string
  date?: string
}

export const SubforumRow = ({
  title, description, icon, numberOfComments, date,
}: SubforumRowProps): JSX.Element => {
  return (
    <div className="subforum-row">
      <div className="subforum-icon subforum-column center">{icon}</div>
      <div className="subforum-description subforum-column">
        <h4 className="subforum-row__title">{title}</h4>
        <div className='subforum-row__wrapper'>
          <p className="subforum-row__description">{description}</p>
          <p className="subforum-row__date">{date}</p>
        </div>
      </div>
      <div className="subforum-stats subforum-column center">
        <span>{numberOfComments}</span>
      </div>
    </div>
  )
}
