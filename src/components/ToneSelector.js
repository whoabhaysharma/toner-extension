import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/all'
import { roundToDecimalPlaces } from '../util/MathUtil'

// Register the plugins
gsap.registerPlugin(useGSAP, Draggable)

const Box = ({label = ""}) => {
    return (
        <div className="w-full h-full bg-[#383838] rounded-md flex justify-center items-center">
            {label && <span className="text-[8px]">{label}</span>}
        </div>
    )
}

const Row = ({children}) => {
    return (
        <div className="flex flex-row h-full w-full gap-1">
            {children}
        </div>
    )
}

const Column = ({children}) => {
    return (
        <div className="flex flex-col h-full w-full gap-1">
            {children}
        </div>
    )
}

export default function ToneSelector({onToneChange = () => {}}) {
    const container = useRef(null)
    const handle = useRef(null)

    useGSAP(() => {
        const containerEl = container.current
        const handleEl = handle.current

        if (!containerEl || !handleEl) return

        const containerRect = containerEl.getBoundingClientRect()
        const handleRect = handleEl.getBoundingClientRect()

        Draggable.create(handleEl, {
            type: 'x,y',
            bounds: containerEl,
            inertia: true,
            onDrag: function () {
                // Calculate the position of the top-left corner of the handle
                const handleLeftEdge = this.x;
                const handleTopEdge = this.y;

                // Calculate the maximum x and y positions
                const maxX = containerRect.width - handleRect.width;
                const maxY = containerRect.height - handleRect.height;

                // Clamp the handle's position between 0 and max values
                const clampedX = Math.max(0, Math.min(maxX, handleLeftEdge));
                const clampedY = Math.max(0, Math.min(maxY, handleTopEdge));

                // Calculate the percentage of the handle's position
                const xPercentage = clampedX / maxX;
                const yPercentage = clampedY / maxY;

                // Calculate the values to return
                const returnX = xPercentage * containerRect.width;
                const returnY = yPercentage * containerRect.height;

                // Update the handle's position
                this.x = clampedX;
                this.y = clampedY;

                const xMapped = returnX / containerRect.width
                const yMapped = returnY / containerRect.height

                onToneChange({ x: roundToDecimalPlaces(xMapped, 1), y: 1 - roundToDecimalPlaces(yMapped, 1) })
            }
        })

        // Initialize handle position to center
        gsap.set(handleEl, { x: (containerRect.width - handleRect.width) / 2, y: (containerRect.height - handleRect.height) / 2 })
    }, { scope: container})

    return (
        <div ref={container} className="relative h-full w-full bg-[#2C2C2C] rounded-lg overflow-hidden">
            <div className="h-full w-full absolute top-0 left-0 p-3">
                <Column>
                    <Row>
                        <Box />
                        <Box label="Professional"/>
                        <Box />
                    </Row>
                    <Row>
                        <Box label="Consise" />
                        <Box />
                        <Box label="Expand"/>
                    </Row>
                    <Row>
                        <Box />
                        <Box label='Casual'/>
                        <Box />
                    </Row>
                </Column>
            </div>
            <div
                ref={handle}
                className="absolute h-[30px] w-[30px] bg-[#ffffff] rounded-full cursor-move shadow-md transition-shadow duration-300 ease-in-out p-1"
            >
                <div className="h-full w-full bg-[#F65009] rounded-full"></div>
            </div>
        </div>
    )
}