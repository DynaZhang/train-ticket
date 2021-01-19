import React, {memo} from 'react';
import './style.styl';

function SubmitComponent() {
  return (
    <div className={"submit"}>
      <button type={"submit"} className={"submit-button"}>搜索</button>
    </div>
  )
}

export default memo(SubmitComponent);
