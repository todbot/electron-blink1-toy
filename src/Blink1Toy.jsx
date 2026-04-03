import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import tinycolor from 'tinycolor2'

const COLORS = [
  '#000000', '#ff0000', '#00ff00', '#0000ff',
  '#ff00ff', '#00ffff', '#ffff00', '#ffffff'
]

export default function Blink1Toy() {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    const loadDevices = async () => {
      const devs = await window.electronAPI.getDevices()
      setDevices(devs)
    }
    loadDevices()
  }, [])

  const handleRescan = async () => {
    const devs = await window.electronAPI.rescan()
    setDevices(devs)
  }

  const changeColor = async (colorstr) => {
    const c = tinycolor(colorstr).toRgb()
    await window.electronAPI.setColor(c.r, c.g, c.b)
  }

  return (
    <Container style={{ padding: 25 }}>
      <Row>
        <Col>
          <h1>Electron blink(1) Toy!</h1>
          <h4>
            {devices.length > 0
              ? `blink(1) device found: ${devices[0]}`
              : 'No blink(1) devices found'}
          </h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Click to change color</h3>
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              style={{ width: 40, height: 40, margin: 5, background: color }}
              onClick={() => changeColor(color)}
            />
          ))}
        </Col>
      </Row>

      <Row>
        <Col>
          <button type="button" onClick={handleRescan}>Rescan</button>
        </Col>
      </Row>
    </Container>
  )
}
