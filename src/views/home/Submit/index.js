import React, {memo} from 'react';
import './style.styl';

function SubmitComponent(props) {
  const {onClick} = props
  return (
    <div className={"submit"}>
      <button type={"button"} className={"submit-button"} onClick={onClick}>搜索</button>
    </div>
  )
}

export default memo(SubmitComponent);
