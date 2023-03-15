import React, { useEffect } from 'react'
import type { ArticleInfo } from '../Types'

import * as d3 from 'd3'

const RED = '#C63C26' // rgb(198, 60, 38)
const BLUE = '#234783' // rgb(35, 71, 131)

interface Grid { x: number, y: number, c: string }

interface Point { x: number, y: number }

interface GraphSize {
  figureSize: number
  pixels: number
  offsetX: number
  offsetY: number
}

function MultiSampling (): JSX.Element {
  return (
        <div>
          <p>
            Traditional Super-sampled antialiasing (SSAA) renders in higher resolution that will be downscaled to a final display resolution.
            This can be very slow, so Multisampling antialiasing (MSAA) strikes a promise between speed and quality. We will use MSAA 4x as an example.
          </p>
          <p>
            With MSAA 4x, we have 4 sample points in each pixel. If a triangle covers one of the sample point, we treat it as if it covers that pixel.
            For each covered pixel, the pixel shader will only execute once; the output value is assigned to all covered sample points in that pixel.
            And the output is stored in a higher resolution frame buffer (only for the sample points inside the triangle).
            The pixel shader for the blue triangle executes 3 times and the red 4 times (as oppose to SSAA 2x executing 5 and 7 times).
          </p>
          <p>
            Then the result is stored in higher resolution framebuffer corresponding to each sample point as shown.
            The framebuffer will downscale to the 3x3 output size by taking the average of each 2x2 pixels.
          </p>
          {MSAAGraph()}
          <div>
            Reference:
            <ul>
              <li><a href="https://therealmjp.github.io/posts/msaa-overview/">https://therealmjp.github.io/posts/msaa-overview/</a></li>
              <li><a href="https://www.amazon.com/Foundations-Game-Engine-Development-Rendering/dp/0985811757">Foundations of Game Engine Development, Volume 2: Rendering</a></li>
            </ul>
          </div>
        </div>
  )
}

function MSAAGraph (): JSX.Element {
  useEffect(() => {
    clearGraph('#msaa-graph')
    // Row 1 Left diagram
    drawGrid({ figureSize: 200, pixels: 3, offsetY: 10, offsetX: 10 }, '#msaa-graph')
    drawSamplePoints({ figureSize: 200, pixels: 3, offsetY: 10, offsetX: 10 }, '#msaa-graph')
    // Row 1 Right diagram
    const fillGrids: Grid[] = [
      { x: 1, y: 1, c: BLUE }, { x: 2, y: 1, c: BLUE }, { x: 3, y: 1, c: BLUE },
      { x: 3, y: 2, c: BLUE }, { x: 3, y: 3, c: BLUE },
      { x: 1, y: 2, c: RED }, { x: 1, y: 3, c: RED }, { x: 2, y: 2, c: RED }, { x: 2, y: 3, c: RED },
      { x: 1, y: 5, c: RED }, { x: 2, y: 4, c: RED }, { x: 3, y: 4, c: RED }
    ]
    fillGrid({ figureSize: 200, pixels: 6, offsetY: 10, offsetX: 300 }, '#msaa-graph', fillGrids)
    drawGrid({ figureSize: 200, pixels: 6, offsetY: 10, offsetX: 300 }, '#msaa-graph')

    // Row 2 Right diagram
    const fillGrids2: Grid [] = [
      { x: 0, y: 0, c: 'rgb(200,209,224)' },
      { x: 1, y: 0, c: 'rgb(145,163,193)' },

      { x: 0, y: 1, c: 'rgb(227,158,147)' },
      { x: 1, y: 1, c: 'rgb(117,66,85)' },

      { x: 0, y: 2, c: 'rgb(218,184,178)' },
      { x: 1, y: 2, c: 'rgb(227,158,147)' }
    ]
    fillGrid({ figureSize: 200, pixels: 3, offsetY: 300, offsetX: 300 }, '#msaa-graph', fillGrids2)
    drawGrid({ figureSize: 200, pixels: 3, offsetY: 300, offsetX: 300 }, '#msaa-graph')
    d3.select('#msaa-graph').append('g').append('text').attr('x', 338).attr('y', 290).text('output by MSAA 4x')

    // Row 2 Left diagram
    const fillGrids3: Grid [] = [
      { x: 1, y: 1, c: 'rgb(117,66,85)' }
    ]
    fillGrid({ figureSize: 200, pixels: 3, offsetY: 300, offsetX: 10 }, '#msaa-graph', fillGrids3)
    drawGrid({ figureSize: 200, pixels: 3, offsetY: 300, offsetX: 10 }, '#msaa-graph')
    d3.select('#msaa-graph').append('g').append('text').attr('x', 68).attr('y', 290).text('output w/o AA')
    // Draw arrow
    drawArrow('M220 100 250 100', '#msaa-graph')
    drawArrow('M400 230 400 260', '#msaa-graph')
  }, [])
  return <svg id="msaa-graph" width = "520" height="520"></svg>
}

function clearGraph (selector: string): void {
  d3.select(selector).selectAll('g').remove()
}

function fillGrid (graphDim: GraphSize, selector: string, grids: Grid[]): void {
  const pixelSize = graphDim.figureSize / graphDim.pixels
  d3.select(selector).append('g').selectAll('rect').data(grids)
    .join('rect')
    .attr('width', pixelSize)
    .attr('height', pixelSize)
    .attr('fill', (p: Grid) => p.c)
    .attr('x', (p: Grid) => graphDim.offsetX + p.x * pixelSize)
    .attr('y', (p: Grid) => graphDim.offsetY + p.y * pixelSize)
    .exit()
    .remove()
}

function drawSamplePoints (graphDim: GraphSize, selector: string): void {
  const coord = []
  const radius = 4
  const samplePoints = graphDim.pixels * 2
  const pixelSize = graphDim.figureSize / graphDim.pixels
  const halfPixelSize = pixelSize * 0.5
  const checkerSize = pixelSize / 4
  const startX = graphDim.offsetX + checkerSize
  const startY = graphDim.offsetY + checkerSize
  // checkerSize = 0
  for (let i = 0; i < samplePoints; i++) {
    for (let j = 0; j < samplePoints; j++) {
      let x, y
      let color = '#888'
      if (i % 2 === 0 && j % 2 === 0) {
        x = i * halfPixelSize - 0.5 * checkerSize + startX
        y = j * halfPixelSize + 0.5 * checkerSize + startY
      } else if (i % 2 === 0 && j % 2 === 1) {
        x = i * halfPixelSize + 0.5 * checkerSize + startX
        y = j * halfPixelSize + 0.5 * checkerSize + startY
      } else if (i % 2 === 1 && j % 2 === 0) {
        x = i * halfPixelSize - 0.5 * checkerSize + startX
        y = j * halfPixelSize - 0.5 * checkerSize + startY
      } else {
        x = i * halfPixelSize + 0.5 * checkerSize + startX
        y = j * halfPixelSize - 0.5 * checkerSize + startY
      }
      // Check if it is in the first triangle
      let intersectionCountTriangleOne = 0
      if (checkIntersect({ x: 40, y: 60 }, { x: 60, y: 190 }, { x, y }, { x: 0, y: 0 })) {
        intersectionCountTriangleOne += 1
      }
      if (checkIntersect({ x: 150, y: 150 }, { x: 60, y: 190 }, { x, y }, { x: 0, y: 0 })) {
        intersectionCountTriangleOne += 1
      }
      if (checkIntersect({ x: 40, y: 60 }, { x: 150, y: 150 }, { x, y }, { x: 0, y: 0 })) {
        intersectionCountTriangleOne += 1
      }
      // Check if it is in the second triangle
      let intersectionCountTriangleTwo = 0
      if (checkIntersect({ x: 40, y: 60 }, { x: 140, y: 20 }, { x, y }, { x: 0, y: 0 })) {
        intersectionCountTriangleTwo += 1
      }
      if (checkIntersect({ x: 150, y: 150 }, { x: 140, y: 20 }, { x, y }, { x: 0, y: 0 })) {
        intersectionCountTriangleTwo += 1
      }
      if (checkIntersect({ x: 40, y: 60 }, { x: 150, y: 150 }, { x, y }, { x: 0, y: 0 })) {
        intersectionCountTriangleTwo += 1
      }

      if (intersectionCountTriangleOne % 2 === 1) {
        color = RED // Red
      } else if (intersectionCountTriangleTwo % 2 === 1) {
        color = BLUE // Blue
      }
      coord.push({ x, y, c: color })
    }
  }

  d3.select(selector).append('g').selectAll('circle').data(coord)
    .join('circle')
    .attr('cx', (p: Grid) => p.x)
    .attr('cy', (p: Grid) => p.y)
    .attr('r', `${radius}px`)
    .attr('fill', (p: Grid) => p.c)
    .exit()

  const polygons: Record<string, string> = {
    '40, 60, 60, 190, 150, 150': RED, // red
    '40, 60, 140, 20, 150, 150': BLUE // blue
  }
  d3.select(selector).append('g').selectAll('polygon').data(Object.keys(polygons))
    .join('polygon')
    .attr('points', d => d)
    .attr('fill', d => polygons[d])
    .attr('opacity', 0.2)
    .exit()
}

function drawGrid (graphDim: GraphSize, selector: string): void {
  const gridLineWidth = 2
  // draw grid.
  const horizontalLines = []
  const pixelSize = graphDim.figureSize / graphDim.pixels
  for (let i = 0; i < graphDim.pixels + 1; i++) {
    horizontalLines.push(graphDim.offsetY + i * pixelSize)
  }
  d3.select(selector).append('g').selectAll('line').data(horizontalLines)
    .join('line').attr('x1', graphDim.offsetX)
    .attr('x2', graphDim.offsetX + graphDim.figureSize)
    .attr('y1', d => d)
    .attr('y2', d => d)
    .attr('fill', 'none')
    .attr('shape-rendering', 'crispEdges')
    .attr('stroke', 'black')
    .attr('stroke-width', `${gridLineWidth}px`)
    .exit()

  const verticalLines = []
  for (let i = 0; i < graphDim.pixels + 1; i++) {
    verticalLines.push(graphDim.offsetX + i * pixelSize)
  }

  d3.select(selector).append('g').selectAll('line').data(verticalLines)
    .join('line').attr('x1', d => d)
    .attr('x2', d => d)
    .attr('y1', graphDim.offsetY - gridLineWidth / 2)
    .attr('y2', graphDim.offsetY + graphDim.figureSize + gridLineWidth / 2)
    .attr('fill', 'none')
    .attr('shape-rendering', 'crispEdges')
    .attr('stroke', 'black')
    .attr('stroke-width', `${gridLineWidth}px`)
    .exit()
}

// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
// For line segment (p1, p2) and (p3, p4)
function checkIntersect (p1: Point, p2: Point, p3: Point, p4: Point): boolean {
  const d = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x)
  let t = (p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)
  t = t / d
  let u = (p1.x - p3.x) * (p1.y - p2.y) - (p1.y - p3.y) * (p1.x - p2.x)
  u = u / d
  return t >= 0 && t <= 1 && u >= 0 && u <= 1
}

function drawArrow (path: string, selector: string): void {
  const svg = d3.select(selector).append('g')
  svg.append('svg:defs').append('svg:marker')
    .attr('id', 'triangle')
    .attr('refX', 12)
    .attr('refY', 12)
    .attr('markerWidth', 80)
    .attr('markerHeight', 80)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 24 12 0 24')
    .style('fill', 'black')

  // path
  svg.append('path')
    .attr('marker-end', 'url(#triangle)')
    .attr('d', path)
    .attr('stroke', 'black')
    .attr('stroke-width', '6')
    .attr('fill', 'transparent')
    .attr('class', 'edges')
}

const INFO: ArticleInfo = {
  title: 'Multisampling (MSAA)',
  key: 'multisampling',
  subject: 'cg',
  EL: MultiSampling,
  date: '2023/03/14'
}

export default INFO
