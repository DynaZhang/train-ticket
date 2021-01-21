import React, {useMemo} from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import './style.styl';
import {h0} from "../../../utils";

function DepartDateComponent(props) {
  const {time, onClick} = props
  const h0ofDepart = h0(time)
  const departDate = new Date(h0ofDepart)
  const departDateString = useMemo(() => {
    return dayjs(h0ofDepart).format('YYYY-MM-DD')
  }, [h0ofDepart])
  const isToday = h0ofDepart === h0()


  const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]+(isToday ? '(今天)' : '')

  return (
    <div className={"depart-date"} onClick={onClick}>
      <input type={"hidden"} name={"date"} value={departDateString}/>
      <span>{departDateString}</span>
      <span className={"depart-week"}>{weekString}</span>
    </div>
  )
}
DepartDateComponent.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DepartDateComponent;
