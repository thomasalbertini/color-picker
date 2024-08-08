import React, { useRef } from 'react'
import PickerContextWrapper from '../context.tsx'
import { ColorPickerProps } from '../shared/types.ts'
import Picker from './Picker.tsx'
import { objectToString } from '../utils/utils.ts'
import { getStyles } from '../styles/styles.ts'
import { defaultLocales } from '../constants.ts'

export function ColorPicker({
  value = 'rgba(175, 51, 242, 1)',
  onChange,
  hideControls = false,
  hideInputs = false,
  hideOpacity = false,
  hidePresets = false,
  hideHue = false,
  presets = [],
  hideEyeDrop = false,
  hideAdvancedSliders = false,
  hideColorGuide = false,
  hideInputType = false,
  hideColorTypeBtns = false,
  hideGradientType = false,
  hideGradientAngle = false,
  hideGradientStop = false,
  hideGradientControls = false,
  locales = defaultLocales,
  width = 294,
  hideAllExceptEyeDrop = true,
  height = 294,
  style = {},
  className,
  disableDarkMode = false,
}: ColorPickerProps) {
  const safeValue = objectToString(value)
  const contRef = useRef<HTMLDivElement>(null)
  const defaultStyles = getStyles(disableDarkMode)

  return (
    <div
      ref={contRef}
      className={className}
      style={{ ...defaultStyles.body, ...style, width: width }}
    >
      <PickerContextWrapper
        value={safeValue}
        onChange={onChange}
        squareWidth={width}
        squareHeight={height}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
      >
        <Picker
          hideControls={hideControls}
          hideInputs={hideInputs}
          hidePresets={hidePresets}
          hideOpacity={hideOpacity}
          hideAllExceptEyeDrop={hideAllExceptEyeDrop}
          hideHue={hideHue}
          presets={presets}
          hideEyeDrop={hideEyeDrop}
          hideAdvancedSliders={hideAdvancedSliders}
          hideColorGuide={hideColorGuide}
          hideInputType={hideInputType}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
          hideGradientControls={hideGradientControls}
          locales={locales}
        />
      </PickerContextWrapper>
    </div>
  )
}
