import React from 'react'
import { useState } from "react";
import { config } from "../constants.js";
import { usePicker } from "../context.js";
import { LocalesProps } from "../shared/types.js";
import {
  colorTypeBtnStyles,
  controlBtnStyles,
  modalBtnStyles,
} from "../styles/styles.js";
import AdvancedControls from "./AdvancedControls.js";
import ComparibleColors from "./ComparibleColors.js";
import EyeDropper from "./EyeDropper.js";
import GradientControls from "./GradientControls.js";
import { InputsIcon, PaletteIcon, SlidersIcon } from "./icon.js";
const { defaultColor, defaultGradient } = config;

const ColorTypeBtns = ({
  hideColorTypeBtns,
  isGradient,
  setSolid,
  setGradient,
  locales,
}: {
  hideColorTypeBtns?: boolean;
  isGradient?: boolean;
  setSolid: () => void;
  setGradient: () => void;
  locales?: LocalesProps;
}) => {
  const { defaultStyles } = usePicker();

  if (hideColorTypeBtns) {
    return <div style={{ width: 1 }} />;
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          ...defaultStyles.rbgcpControlBtnWrapper,
        }}
      >
        <div
          onClick={setSolid}
          id="rbgcp-solid-btn"
          style={colorTypeBtnStyles(!isGradient, defaultStyles)}
        >
          {locales?.CONTROLS?.SOLID}
        </div>
        <div
          onClick={setGradient}
          id="rbgcp-gradient-btn"
          style={colorTypeBtnStyles(isGradient || false, defaultStyles)}
        >
          {locales?.CONTROLS?.GRADIENT}
        </div>
      </div>
    );
  }
};

const InputTypeDropdown = ({
  openInputType,
  setOpenInputType,
}: {
  openInputType?: boolean;
  setOpenInputType: (arg0: boolean) => void;
}) => {
  const { inputType, setInputType, defaultStyles } = usePicker();
  const vTrans = openInputType
    ? "visibility 0ms linear"
    : "visibility 100ms linear 150ms";
  const zTrans = openInputType
    ? "z-index 0ms linear"
    : "z-index 100ms linear 150ms";
  const oTrans = openInputType
    ? "opacity 120ms linear"
    : "opacity 150ms linear 50ms";

  const handleInputType = (e: any, val: string) => {
    if (openInputType) {
      e.stopPropagation();
      setInputType(val);
      setOpenInputType(false);
    }
  };

  return (
    <div
      style={{
        visibility: openInputType ? "visible" : "hidden",
        zIndex: openInputType ? "" : -100,
        opacity: openInputType ? 1 : 0,
        transition: `${oTrans}, ${vTrans}, ${zTrans}`,
        ...defaultStyles.rbgcpColorModelDropdown,
      }}
    >
      <div
        onClick={(e) => handleInputType(e, "rgb")}
        style={modalBtnStyles(inputType === "rgb", defaultStyles)}
      >
        RGB
      </div>
      <div
        onClick={(e) => handleInputType(e, "hsl")}
        style={modalBtnStyles(inputType === "hsl", defaultStyles)}
      >
        HSL
      </div>
      <div
        onClick={(e) => handleInputType(e, "hsv")}
        style={modalBtnStyles(inputType === "hsv", defaultStyles)}
      >
        HSV
      </div>
      <div
        onClick={(e) => handleInputType(e, "cmyk")}
        style={modalBtnStyles(inputType === "cmyk", defaultStyles)}
      >
        CMYK
      </div>
    </div>
  );
};

const Controls = ({
  locales,
  hideEyeDrop = false,
  hideAdvancedSliders = false,
  hideColorGuide = false,
  hideInputType = false,
  hideColorTypeBtns = false,
  hideGradientControls = false,
  hideGradientType = false,
  hideGradientAngle = false,
  hideGradientStop = false,
  hideAllExceptEyeDrop = true,
}: {
  locales?: LocalesProps;
  hideEyeDrop?: boolean;
  hideAdvancedSliders?: boolean;
  hideColorGuide?: boolean;
  hideInputType?: boolean;
  hideColorTypeBtns?: boolean;
  hideGradientControls?: boolean;
  hideGradientType?: boolean;
  hideGradientAngle?: boolean;
  hideGradientStop?: boolean;
  hideAllExceptEyeDrop?: boolean;
}) => {
  const { onChange, isGradient, handleChange, previous, defaultStyles } =
    usePicker();
  const [openComparibles, setOpenComparibles] = useState(false);
  const [openInputType, setOpenInputType] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);

  const noTools =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;

  const solidColor = previous?.color || defaultColor;
  const gradientColor = previous?.gradient || defaultGradient;

  const setSolid = () => {
    onChange(solidColor);
  };

  const setGradient = () => {
    onChange(gradientColor);
  };

  const allRightControlsHidden =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;

  const allControlsHidden = allRightControlsHidden && hideColorTypeBtns;

  if (allControlsHidden) {
    if (isGradient && !hideGradientControls) {
      return (
        <GradientControls
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
        />
      );
    } else {
      return null;
    }
  } else {
    return (
      <div style={{ paddingTop: 9.77, paddingBottom: 4 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ColorTypeBtns
            hideColorTypeBtns={hideColorTypeBtns}
            setGradient={setGradient}
            isGradient={isGradient}
            setSolid={setSolid}
            locales={locales}
          />
          {!allRightControlsHidden && (
            <div
              style={{
                display: noTools ? "none" : "",
                ...defaultStyles.rbgcpControlBtnWrapper,
                backgroundColor: "initial",
              }}
            >
              {isGradient && !hideGradientControls && (
                <GradientControls
                  hideGradientType={hideGradientType}
                  hideGradientAngle={hideGradientAngle}
                  hideGradientStop={hideGradientStop}
                />
              )}

              {!hideEyeDrop && (
                <div
                  style={{
                    height: "28px",
                    background: "rgb(236, 236, 233)",
                    borderRadius: "6px",
                    padding: "2px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    boxSizing: "border-box",
                    width: "30px"
                  }}
                >
                  <EyeDropper onSelect={handleChange} />
                </div>
              )}
              {!hideAllExceptEyeDrop && (
                <>
                  <div
                    id="rbgcp-advanced-btn"
                    onClick={() => setOpenAdvanced(!openAdvanced)}
                    style={{
                      display: hideAdvancedSliders ? "none" : "flex",
                      ...controlBtnStyles(openAdvanced, defaultStyles),
                    }}
                  >
                    <SlidersIcon color={openAdvanced ? "#568CF5" : ""} />
                  </div>
                  <div
                    id="rbgcp-comparibles-btn"
                    style={{
                      display: hideColorGuide ? "none" : "flex",
                      ...controlBtnStyles(openComparibles, defaultStyles),
                    }}
                    onClick={() => setOpenComparibles(!openComparibles)}
                  >
                    <PaletteIcon color={openComparibles ? "#568CF5" : ""} />
                  </div>
                  <div
                    id="rbgcp-color-model-btn"
                    onClick={() => setOpenInputType(!openInputType)}
                    style={{
                      display: hideInputType ? "none" : "flex",
                      ...controlBtnStyles(openInputType, defaultStyles),
                    }}
                  >
                    <InputsIcon color={openInputType ? "#568CF5" : ""} />
                    <InputTypeDropdown
                      openInputType={openInputType}
                      setOpenInputType={setOpenInputType}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {!hideAdvancedSliders && (
          <AdvancedControls openAdvanced={openAdvanced} />
        )}
        {!hideColorGuide && (
          <ComparibleColors openComparibles={openComparibles} />
        )}
      </div>
    );
  }
};

export default Controls;
