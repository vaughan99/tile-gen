import React, { Component } from "react";
import { Slider, Rail, Handles, GetRailProps,
    GetHandleProps,
    GetTrackProps,
    SliderItem } from "react-compound-slider";

const sliderStyle = {
  position: "relative" as "relative",
  width: "100%",
};

const domain = [100, 500];
const defaultValues = [100, 300, 400, 500];



// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: 60,
  //transform: 'translate(0%, -20%)',
  borderRadius: 0,
  cursor: 'pointer',
  backgroundImage: 'linear-gradient(to right, rgb(255, 0, 0) 15%, rgb(130,140,150) 30%, rgb(85, 130, 115) 40%, rgb(0, 70, 80) 15%)',
};

interface SliderRailProps {
  getRailProps: GetRailProps;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
    </>
  );
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  disabled?: boolean;
}

export const Handle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          // transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: 'pointer',
          backgroundColor: 'none',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, 0)',
          zIndex: 2,
          width: 10,
          height: 70,
          borderRadius: 0,
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: disabled ? '#666' : 'rgba(127, 127, 127, 0.8)',
        }}
      />
    </>
  );
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export const KeyboardHandle: React.FC<HandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: 'absolute',
        // transform: 'translate(-50%, -50%)',
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: 0,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: disabled ? '#666' : 'rgba(127, 127, 127, 0.2)',
      }}
      {...getHandleProps(id)}
    />
  );
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
}

export const Track: React.FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
  disabled = false,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        // transform: 'translate(0, 50%)',
        height: 5,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : 'rgba(127, 127, 127, 0.8)',
        borderRadius: 0,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
  tick: SliderItem;
  count: number;
  format?: (val: number) => string;
}

export const Tick: React.FC<TickProps> = ({
  tick,
  count,
  format = (d) => d,
}) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};



export class ColorMapSlider extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  };

  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
  };

  render() {
    const {
      state: { values, update },
    } = this;

    return (
      <div style={{ height: 200, width: "100%" }}>
        <Slider
          mode={1}
          step={5}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>

        </Slider>
      </div>
    );
  }
}
