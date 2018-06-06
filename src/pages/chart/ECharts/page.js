import React from 'react'
import { Radio } from 'antd'
import { Page } from 'components'
import EchartsComponent from './EchartsComponent'
import styles from './page.less'

const RadioGroup = Radio.Group

const chartList = [
  {
    label: 'SimpleChart',
    value: 'simple',
  },
]

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      type: '',
    }
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this)
  }
  handleRadioGroupChange (e) {
    this.setState({
      type: e.target.value,
    })
  }
  render () {
    return (<Page inner id="EChartsMain">
      <RadioGroup options={chartList} defaultValue="simple" onChange={this.handleRadioGroupChange} />
      <div className={styles.chart}>
        <EchartsComponent type={this.state.type} />
      </div>
      <div style={{ pading: 24, marginTop: 24 }}>
         All demos from <a href="https://github.com/hustcc/echarts-for-react">https://github.com/hustcc/echarts-for-react</a>
      </div>
    </Page>)
  }
}

// chart index
export default Chart
