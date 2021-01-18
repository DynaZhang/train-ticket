import React, {useMemo} from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import './style.styl';
import {h0} from "../../../utils";

function DepartDateComponent(props) {
  const {time, changeDate} = props
  const h0ofDepart = h0(time)
  const departDate = new Date(h0ofDepart)
  const departDateString = useMemo(() => {
    return dayjs(h0ofDepart).format('YYYY-MM-DD')
  }, [h0ofDepart])

  const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]

  return (
    <div className={"depart-date"} onClick={() => {changeDate(h0ofDepart)}}>
      <input type={"hidden"} name={"date"} value={departDateString}/>
      <span>{departDateString}</span>
      <span className={"depart-week"}>{weekString}</span>
    </div>
  )
}
DepartDateComponent.propTypes = {
  time: PropTypes.number.isRequired,
  changeDate: PropTypes.func
}

export default DepartDateComponent;
