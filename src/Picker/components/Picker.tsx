import { usePicker } from "../context";
import { LocalesProps } from "../shared/types";
import Controls from "./Controls";
import GradientBar from "./GradientBar";
import Hue from "./Hue";
import Inputs from "./Inputs";
import Opacity from "./Opacity";
import Presets from "./Presets";
import Square from "./Square";



const Picker = ({
  locales,
  presets,
  hideHue,
  hideInputs,
  hidePresets,
  hideOpacity,
  hideEyeDrop,
  hideControls,
  hideInputType,
  hideColorGuide,
  hideGradientType,
  hideGradientStop,
  hideGradientAngle,
  hideColorTypeBtns,
  hideAdvancedSliders,
  hideGradientControls,
  hideAllExceptEyeDrop
}: PickerProps) => {
  const { isGradient } = usePicker();

  return (
    <div style={{ userSelect: "none" }} id="rbgcp-wrapper">
      <Square />
      {!hideControls && (
        <Controls
          locales={locales}
          hideEyeDrop={hideEyeDrop}
          hideInputType={hideInputType}
          hideColorGuide={hideColorGuide}
          hideGradientType={hideGradientType}
          hideAllExceptEyeDrop={hideAllExceptEyeDrop}
          hideGradientStop={hideGradientStop}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientAngle={hideGradientAngle}
          hideAdvancedSliders={hideAdvancedSliders}
          hideGradientControls={hideGradientControls}
        />
      )}
      {isGradient && <GradientBar />}
      {!hideHue && <Hue />}
      {!hideOpacity && <Opacity />}
      {!hideInputs && <Inputs />}
      {!hidePresets && <Presets presets={presets} />}
    </div>
  );
};

export default Picker;

type PickerProps = {
  hideControls?: boolean;
  hideInputs?: boolean;
  hidePresets?: boolean;
  hideOpacity?: boolean;
  hideHue?: boolean;
  presets?: string[];
  hideEyeDrop?: boolean;
  hideAdvancedSliders?: boolean;
  hideColorGuide?: boolean;
  hideInputType?: boolean;
  hideColorTypeBtns?: boolean;
  hideGradientType?: boolean;
  hideGradientAngle?: boolean;
  hideGradientStop?: boolean;
  hideGradientControls?: boolean;
  locales?: LocalesProps;
  hideAllExceptEyeDrop?: boolean;
};
