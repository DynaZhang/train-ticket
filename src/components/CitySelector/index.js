import React, {useState, useMemo, useEffect, memo, useCallback} from "react";
import classnames from 'classnames';
import PropTypes from "prop-types";
import "./style.css";

function CityItem(props) {
  const {name, onSelect} = props
  return (
    <li className="city-li" onClick={() => onSelect(name)}>{name}</li>
  )
}
CityItem.propTypes = {
  name: PropTypes.string,
  onSelect: PropTypes.func
}

function CitySection(props) {
  const {title, cities = [], onSelect} = props
  return (
    <ul className="city-ul">
      <li className={"city-li"} key="title" data-cate={title}>{title}</li>
      {
        cities.map(item => (
          <CityItem key={item.name} name={item.name} onSelect={onSelect} />
        ))
      }
    </ul>
  )
}
CitySection.propTypes = {
  title: PropTypes.string,
  cities: PropTypes.array,
  onSelect: PropTypes.func
}

const alphabet = Array.from(new Array(26), (ele,index) => {
  return String.fromCharCode(65 + index)
})
const AlphaIndex = memo((props) => {
  const {alpha, clickItem} = props
  return (
    <div className={"city-index-item"} onClick={() => clickItem(alpha)}>{alpha}</div>
  )
})
AlphaIndex.propTypes = {
  alpha: PropTypes.string,
  clickItem: PropTypes.func
}

function CityList(props) {
  const {sections, onSelect, toAlpha} = props
  return (
    <div className={"city-list"}>
      <div className="city-cate">
        {
          sections.map(item => (
            <CitySection title={item.title} cities={item.citys} onSelect={onSelect} key={item.title} />
          ))
        }
      </div>
      <div className="city-index">
        {
          alphabet.map(item => (
            <AlphaIndex key={item} alpha={item} clickItem={(item) => toAlpha(item)} />
          ))
        }
      </div>
    </div>
  )
}
CityList.propTypes = {
  sections: PropTypes.array,
  onSelect: PropTypes.func
}

const SuggestItem = memo((props) => {
  const {name, clickItem} = props
  return (
    <li className="city-suggest-item" onClick={() => clickItem(name)}>{name}</li>
  )
}, [])
SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  clickItem: PropTypes.func.isRequired
}

function Suggest(props) {
  const {searchKey, onSelect} = props
  const [result, setResult] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/rest/search?key='+encodeURIComponent(searchKey)).then(response => {
      return response.json()
    }).then(jsonObj => {
      console.log(jsonObj)
      const {data:res, result:sKey} = jsonObj
      console.log(res)
      if (sKey === result) {
        setResult(res)
      }
    })
  }, [searchKey,result])
  const fallBackResult = useMemo(() => {
    console.log(result)
    if (result.length === 0) {
      return [{display: searchKey}]
    }
    return result
  }, [result, searchKey])
  return (
    <div className="city-suggest">
      <ul className={"city-suggest-ul"}>
        {
          fallBackResult.map(item => (
            <SuggestItem key={item.display} name={item.display} clickItem={() => {onSelect(item.display)}} />
          ))
        }
      </ul>
    </div>
  )
}
Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


function CitySelectorComponent(props) {
  const {show, isLoading, cityData, onBack, onSelect, fetchCityData } = props
  const [searchKey, setSearchKey] = useState('')
  const key = useMemo(() => {
    return searchKey.trim()
  }, [searchKey])
  const citySelectorClass = classnames('city-selector', {
    hidden: !show
  })
  const searchCleanClass = classnames('search-clean', {
    hidden: key.length === 0
  })
  const toAlpha = useCallback((alpha) => {
    console.log(`[data-cate='${alpha}']`)
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
  }, [])
  const outputCitySections = () => {
    if (isLoading) {
      return (
        <div>loading</div>
      )
    }
    if (cityData) {
      return (
        <CityList sections={cityData} onSelect={onSelect} toAlpha={val => toAlpha(val)}/>
      )
    }
    return (
      <div>error</div>
    )
  }

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return
    }
    fetchCityData()
  }, [show, cityData, fetchCityData, isLoading])

  return (
    <div className={citySelectorClass}>
      <div className={"city-search"}>
        <div className={"search-back"} onClick={() => onBack()}>
          <svg width={42} height={42}>
            <polyline points={"25,13 16,21 25,29"} stroke={"#fff"} strokeWidth={2} fill={"none"} />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input type="text" value={searchKey} className={"search-input"} placeholder={"城市、车站的中文名或拼音"} onChange={e => setSearchKey(e.target.value)}/>
        </div>
        <i className={searchCleanClass} onClick={() => setSearchKey('')}>&#xf063;</i>
      </div>
      {outputCitySections()}
      {Boolean(key) && (<Suggest className searchKey={key} onSelect={key => onSelect(key)} />)}
    </div>
  )
}
CitySelectorComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cityData: PropTypes.array,
  onBack: PropTypes.func.isRequired
}

export default CitySelectorComponent;
