import React, { useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { TabView, TabPanel } from "primereact/tabview";
import { Toolbar } from "primereact/toolbar";
import { Chart } from "primereact/chart";
import { ToggleButton } from "primereact/togglebutton";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Resizable, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";
import "./App.css";
import { TileProfile, defaultProfile } from "./profile";
import {
  TileDrawState,
  drawTilesEmpty,
  drawTiles,
  drawTilesWorking,
} from "./draw";
import { createPerformanceChartData, performanceOptions } from "./performance";

const DRAW_TIMEOUT = 2500;

const App = () => {
  const [profile, setProfile] = useState<TileProfile>(defaultProfile);
  const [drawState, setDrawState] = useState<TileDrawState>("empty");
  const [undoHistory, setUndoHistory] = useState<Array<TileProfile>>([]);
  const [redoHistory, setRedoHistory] = useState<Array<TileProfile>>([]);
  const [performance, setPerformance] = useState(
    createPerformanceChartData(0, 0, 0)
  );
  const [drawTimer, setDrawTimer] = useState<number>();
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [showFootprint, setShowFootprint] = useState<boolean>(false);
  const [canvasSizeObserver, setCanvasSizeObserver] =
    useState<ResizeObserver | null>(null);
  const tileCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasParentRef = React.useRef<HTMLDivElement>(null);

  const updateProfile = <T extends keyof TileProfile>(
    property: T,
    value: TileProfile[T]
  ): void => {
    setProfile({ ...profile, [property]: value });
    if (drawTimer) {
      clearTimeout(drawTimer);
    }
    setDrawState("working");
    setDrawTimer(
      setTimeout(() => {
        // generate the tile

        // afterwards, set done and draw the tile
        setTimeout(() => {
          setDrawState("done");
        }, DRAW_TIMEOUT);
      }, DRAW_TIMEOUT) as unknown as number
    );
  };

  const onFootprintResize = (
    e: React.SyntheticEvent<Element, Event>,
    data: ResizeCallbackData
  ) => {
    updateProfile("size", { height: Math.round(data.size.height), width: Math.round(data.size.width) });
  };

  // Use this to draw the tiles canvas when things change.
  React.useEffect(() => {
    if (tileCanvasRef.current) {
      if (drawState === "empty") {
        drawTilesEmpty(tileCanvasRef.current, profile);
      } else if (drawState === "working") {
        setPerformance(createPerformanceChartData(0, 0, 0));
        drawTilesWorking(tileCanvasRef.current, profile);
      } else if (drawState === "done") {
        setPerformance(createPerformanceChartData(1, 45, 10));
        drawTiles(tileCanvasRef.current, profile);
      }
    }
  }, [profile, tileCanvasRef, drawState]);

  // Use this to tie the canvas size to the parent.
  React.useEffect(() => {
    const parent = canvasParentRef.current;
    const tileCanvas = tileCanvasRef.current;
    if (parent && tileCanvas) {
      if (canvasSizeObserver) {
        canvasSizeObserver.disconnect();
        canvasSizeObserver.observe(canvasParentRef.current);
      } else {
        const callback: ResizeObserverCallback = () => {
          console.log(
            `Resizing canvas ${parent.clientWidth} x ${parent.clientHeight}`
          );
          tileCanvas.width = parent.clientWidth;
          tileCanvas.height = parent.clientHeight;
        };
        const observer = new ResizeObserver(callback);
        setCanvasSizeObserver(observer);
      }
    }
  }, [canvasParentRef, tileCanvasRef, canvasSizeObserver, profile]);

  // Use this to cause changes to Undo/Redo buttons
  // React.useEffect(() => {
  // }, [undoHistory, redoHistory]);

  return (
    <div className="App" style={{ height: "100%", width: "100%" }}>
      <div
        className="flex flex-column"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="flex-row">
          <Toolbar className="flex-grow-1" />
        </div>
        <div className="flex flex-grow-1 flex-row">
          <Splitter className="flex-grow-1">
            <SplitterPanel>
              <TabView>
                <TabPanel header="Color Map"></TabPanel>
                <TabPanel header="Axis">Axis Metadata</TabPanel>
                <TabPanel header="Pattern">Pattern Text</TabPanel>
                <TabPanel header="Normalization">
                  Normalization Metadata
                </TabPanel>
              </TabView>
            </SplitterPanel>
            <SplitterPanel className="flex flex-column">
              <div
                style={{ position: "relative" }}
                className="flex-grow-1"
                ref={canvasParentRef}
              >
                <canvas
                  ref={tileCanvasRef}
                  className="absolute top-0 left-0 z-0"
                  width={0}
                  height={0}
                />
                <Resizable
                  height={profile.size.height}
                  width={profile.size.width}
                  lockAspectRatio={lockAspectRatio}
                  className="absolute top-0 left-0 z-1"
                  handleSize={[10, 10]}
                  minConstraints={[20, 20]}
                  maxConstraints={[800, 800]}
                  onResize={onFootprintResize}
                >
                  <div
                    hidden={!showFootprint}
                    style={{
                      height: profile.size.height,
                      width: profile.size.width,
                      backgroundColor: "rgba(127, 127, 127, 0.2)",
                      verticalAlign: "center",
                    }}
                  >
                    {profile.size.width} x {profile.size.height}
                  </div>
                </Resizable>
              </div>
              <div style={{ height: "45px" }}>
                <ToggleButton
                  style={{
                    height: "25px",
                    width: "225px",
                    margin: "10px",
                    padding: "10px",
                  }}
                  checked={showFootprint}
                  onIcon="pi pi-th-large"
                  onLabel={`Footprint (${profile.size.width} x ${profile.size.height})`}
                  offIcon="pi pi-table"
                  offLabel={`Footprint (${profile.size.width} x ${profile.size.height})`}
                  onChange={(e) => setShowFootprint(e.value)}
                />
                <ToggleButton
                  style={{
                    height: "25px",
                    width: "150px",
                    margin: "10px",
                    padding: "10px",
                  }}
                  disabled={!showFootprint}
                  checked={lockAspectRatio}
                  onIcon="pi pi-lock"
                  onLabel="Aspect Ratio"
                  offLabel="Aspect Ratio"
                  offIcon="pi pi-lock-open"
                  onChange={(e) => setLockAspectRatio(e.value)}
                />
              </div>
            </SplitterPanel>
          </Splitter>
        </div>
        <div className="flex flex-none flex-row">
          <Chart
            className="flex-grow-1"
            type="bar"
            style={{ height: "80px" }}
            data={performance}
            options={performanceOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
