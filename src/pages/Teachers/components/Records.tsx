import {} from 'react'

import ClassRecordGraph from './ClassRecordGraph'
import StudentPiechart from './StudentPiechart'

const RecordInfo = () => {
  return (
    <div className='pt-6 grid grid-cols-2'>
      <ClassRecordGraph />
      <StudentPiechart />
    </div>
  )
}

export default RecordInfo