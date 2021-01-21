import React, {useMemo, memo} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './style.styl'

function NavComponent(props) {
  const {date, prev, next, isPrevDisabled, isNextDisabled} = props
  const prevClasses = classnames('nav-prev', {
    'nav-disabled': isPrevDisabled
  })
  const nextClasses = classnames('nav-next', {
    'nav-disabled': isNextDisabled
  })
  const currentString = useMemo(() => {
    const d = dayjs(date)
    return d.format('M月D日 ') + d.locale('zh-cn').format('ddd')
  }, [date])
  
  return (
    <div className="nav">
      <span onClick={prev} className={prevClasses}>前一天</span>
      <span className="nav-current">{currentString}</span>
      <span onClick={next} className={nextClasses}>后一天</span>
    </div>
  )
}
NavComponent.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired
}

export default memo(NavComponent)