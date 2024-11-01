'use client'

import React, { useRef, useEffect } from 'react'

const vertexShaderSource = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`

const fragmentShaderSource = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;
  void main() {
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = (vUv * 2.0 - 1.0) * uResolution.xy / mr;
    vec2 mouseDir = uMouse - uv;
    float distance = length(mouseDir);
    float gravity = 1.0 / (distance + 0.1);
    float d = -uTime * 0.5;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x + gravity);
      d += sin(uv.y * i + a + gravity * mouseDir.x);
    }
    d += uTime * 0.5;
    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
    gl_FragColor = vec4(col, 1.0);
  }
`

export function WebGLAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile failed:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link failed:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return
    }

    gl.useProgram(program)

    const positionAttribute = gl.getAttribLocation(program, 'position')
    const uvAttribute = gl.getAttribLocation(program, 'uv')

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(positionAttribute)
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(uvAttribute)
    gl.vertexAttribPointer(uvAttribute, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'uTime')
    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uMouse = gl.getUniformLocation(program, 'uMouse')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const render = (time: number) => {
      time *= 0.001

      gl.uniform1f(uTime, time)
      gl.uniform3f(uResolution, canvas.width, canvas.height, 1.0)
      gl.uniform2fv(uMouse, mousePos.current)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

    // const handleMouseMove = (event: MouseEvent) => {
    //   mousePos.current = [
    //     (event.clientX / window.innerWidth) * 2 - 1,
    //     1 - (event.clientY / window.innerHeight) * 2
    //   ]
    // }

    // window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    //   window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}