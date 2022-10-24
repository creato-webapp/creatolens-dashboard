import Row from './Row'
import { BodyProps } from './Interface'

const Body = (props: BodyProps) => {
  return (
    <tbody>
      {props.dataSource.map((e, index) => (
        <Row columns={props.columns} rowData={e} key={index} />
      ))}
    </tbody>
  )
}

export default Body
