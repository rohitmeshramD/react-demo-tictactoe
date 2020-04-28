import React from "react";

// stylesheets
import "./MyChart.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

// react wrappers by devExtreme
import Chart, {
  ArgumentAxis,
  Series,
  Legend,
  CommonSeriesSettings,
  Format,
} from "devextreme-react/chart";
import {
  CircularGauge,
  ValueIndicator,
  Scale,
  Label,
  Geometry,
} from "devextreme-react/circular-gauge";

// constants
import ConstantData from "./MyCharts.constant";

// ! Chart
// ! METHOD-1 - DevExtreme Data Grid React Wrapper -IN_USE
// ! METHOD-2 - DevExtreme Native React Data Grid

// to use for color selection depending on % of target complete
const myPalette_1 = [
  '#0247FE',
  '#5CB85C'
]
  const myPalette_2 = [
  '#0247FE',
  '#CCCCCC',
  '#5CB85C',
  '#D38E31',
  '#5CB85C'
]

class MyChart extends React.Component {
  render() {
    return (
      <div>
        <div className="title">Overview</div>

        <div>
          <div className="sub-title">Transaction Count</div>
          <div className="row m-0">
            <div className="col-4">
              <CircularGauge
                title="Current Month"
                value={ConstantData.data_gauge_1.value}
              >
                <ValueIndicator
                  type="rangebar"
                  color="#5CB85C"
                ></ValueIndicator>
                <Scale
                  startValue={0}
                  endValue={ConstantData.data_gauge_1.total}
                  tickInterval={1000000}
                >
                  <Label customizeText={this.customizeText}></Label>
                </Scale>
                <Geometry startAngle={180} endAngle={0}></Geometry>
              </CircularGauge>
              <div className="text-center">
                <span className="h2">{ConstantData.data_gauge_1.value}</span>
                <span className="small">
                  {" "}
                  &nbsp;/&nbsp;{ConstantData.data_gauge_1.total}
                </span>
              </div>
              &nbsp;
            </div>

            <div className="col-4">
              <Chart
                title="Actual Achieved vs. Monthly target"
                palette={myPalette_1}
                dataSource={ConstantData?.data_bar_1}
              >
                <ArgumentAxis tickInterval={10} />

                <CommonSeriesSettings
                  argumentField="mediumOfTransaction"
                  type="bar"
                  hoverMode="allArgumentPoints"
                  selectionMode="allArgumentPoints"
                >
                  <Label visible={true}>
                    <Format type="fixedPoint" precision={0} />
                  </Label>
                </CommonSeriesSettings>

                <Series
                  argumentField="mediumOfTransaction"
                  valueField="target"
                  name="Target"
                />
                <Series valueField="achieved" name="Achieved" />
                <Legend
                  visible={true}
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                ></Legend>
              </Chart>
            </div>

            <div className="col-4">
              <Chart
                title="Actual Achieved vs. Yearly target"
                palette={myPalette_2}
                dataSource={ConstantData?.data_bar_2}
              >
                <ArgumentAxis tickInterval={10} />

                <CommonSeriesSettings
                  argumentField="mediumOfTransaction"
                  type="bar"
                  hoverMode="allArgumentPoints"
                  selectionMode="allArgumentPoints"
                >
                  <Label visible={true}>
                    <Format type="fixedPoint" precision={0} />
                  </Label>
                </CommonSeriesSettings>

                <Series
                  argumentField="mediumOfTransaction"
                  valueField="target"
                  name="Target"
                />
                <Series valueField="achieved" name="Achieved" />
                <Legend
                  visible={true}
                  verticalAlignment="bottom"
                  horizontalAlignment="center"
                ></Legend>
              </Chart>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default MyChart;
