import React, { useEffect, useState } from 'react'
import { usePicker } from "../context.js"
import { GradientProps } from '../shared/types.js'
import { high, low } from '../utils/formatters.js'
import { getHandleValue } from '../utils/utils.js'

export const Handle = ({
  left,
  i,
  setDragging,
}: {
  left?: number
  i: number
  setDragging: (arg0: boolean) => void
}) => {
  const {
    colors,
    selectedColor,
    squareWidth,
    defaultStyles,
    createGradientStr,
  } = usePicker()
  const isSelected = selectedColor === i
  const leftMultiplyer = (squareWidth - 18) / 100

  const setSelectedColor = (index: number) => {
    const newGradStr = colors?.map((cc: GradientProps, i: number) => ({
      ...cc,
      value: i === index ? high(cc) : low(cc),
    }))
    createGradientStr(newGradStr)
  }

  const handleDown = (e: any) => {
    e.stopPropagation()
    setSelectedColor(i)
    setDragging(true)
  }

  // const handleFocus = () => {
  //   setInFocus('gpoint')
  //   setSelectedColor(i)
  // }

  // const handleBlur = () => {
  //   setInFocus(null)
  // }

  return (
    <div
      // tabIndex={0}
      // onBlur={handleBlur}
      // onFocus={handleFocus}
      id={`gradient-handle-${i}`}
      onMouseDown={(e) => handleDown(e)}
      style={{
        ...defaultStyles.rbgcpGradientHandleWrap,
        left: (left || 0) * leftMultiplyer,
      }}
    >
      <div
        style={{
          ...defaultStyles.rbgcpGradientHandle,
          ...(isSelected ? { boxShadow: '0px 0px 5px 1px rgba(86, 140, 245,.95)', border: '2px solid white' } : {}),
        }}
      >
        {isSelected && (
          <div
            id="selected-gradient-circle-bar"
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'white',
            }}
          />
        )}
      </div>
    </div>
  )
}

const GradientBar = () => {
  const {
    currentColor,
    createGradientStr,
    colors,
    value,
    handleGradient,
    squareWidth,
    gc
  } = usePicker()
  const [dragging, setDragging] = useState(false)
  // const [inFocus, setInFocus] = useState<string | null>(null)

  function force90degLinear(color: string) {
    return color.replace(
      /(radial|linear)-gradient\([^,]+,/,
      'linear-gradient(90deg,'
    )
  }

  const addPoint = (e: any) => {
    const left = getHandleValue(e)
    const newColors = [
      ...colors.map((c: any) => {
        return { ...c, value: low(c) }
      }),
      { value: currentColor, left: left },
    ]?.sort((a, b) => a.left - b.left)
    createGradientStr(newColors)
  }

  // useEffect(() => {
  //   const selectedEl = window?.document?.getElementById(
  //     `gradient-handle-${selectedColor}`
  //   )
  //   if (selectedEl) selectedEl.focus()
  // }, [selectedColor])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = (e: any) => {
    if (dragging) return;
    addPoint(e)
    setDragging(true)
    handleGradient(currentColor, getHandleValue(e))
  }

  const handleMove = (e: any) => {
      if (dragging) handleGradient(currentColor, getHandleValue(e));
  };

  // const handleKeyboard = (e: any) => {
  //   if (isGradient) {
  //     if (e.keyCode === 8) {
  //       if (inFocus === 'gpoint') {
  //         deletePoint()
  //       }
  //     }
  //   }
  // }

  const handleUp = () => {
    stopDragging()
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleUp)
    // window?.addEventListener('keydown', handleKeyboard)
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mouseup', handleUp)
      // window?.removeEventListener('keydown', handleKeyboard)
      window.removeEventListener('touchend', handleUp)
    }
  })

  return (
    <div
      style={{
        width: '100%',
        marginTop: 17,
        marginBottom: 4,
        position: 'relative',
      }}
      id="gradient-bar"
    >
      <div
        style={{
          height: 14,
          borderRadius: 10,
          width: squareWidth,
          backgroundImage: force90degLinear(gc),
        }}
        onMouseDown={(e) => handleDown(e)}
        onMouseMove={(e) => handleMove(e)}
        onTouchMove={(e) => {
          if (!e?.touches[0]) return
          const touchedElement = e.touches[0].target as HTMLDivElement
          if (touchedElement.id === 'selected-gradient-circle-bar') {
            handleMove({
              clientX: e.touches[0].clientX,
              target: {
                parentNode:
                  touchedElement.parentElement?.parentElement?.parentElement,
              },
            })
            return
          }
          handleMove(e.touches[0])
        }}
        />
      {colors?.map((c: any, i) => (
        <Handle
          i={i}
          left={c.left}
          key={`${i}-${c}`}
          setDragging={setDragging}
        />
      ))}
    </div>
  )
}

export default GradientBar
