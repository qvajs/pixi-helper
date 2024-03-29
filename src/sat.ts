import type { Polygon } from "pixi.js";

export type Point = {
  x: number;
  y: number;
};

function isSeparated(p1: number[], p2: number[]) {
  const min1 = Math.min(...p1);
  const max1 = Math.max(...p1);
  const min2 = Math.min(...p2);
  const max2 = Math.max(...p2);

  return max1 < min2 || max2 < min1;
}

function projectPolygon(axis: Point, polygon: Polygon) {
  return polygon.points
    .filter((_, index) => index % 2 === 0)
    .map((point, index) => {
      const x = point;
      const y = polygon.points[index * 2 + 1];
      return x * axis.x + y * axis.y;
    });
}

function getAxes(polygon: Polygon) {
  const points = polygon.points;
  const axes: Point[] = [];
  for (let i = 0; i < points.length; i += 2) {
    const p1 = { x: points[i], y: points[i + 1] };
    const p2 = {
      x: points[(i + 2) % points.length],
      y: points[(i + 3) % points.length],
    };
    const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
    const normal = { x: -edge.y, y: edge.x };
    axes.push(normal);
  }
  return axes;
}

/**
 * 对两个 Polygon 进行边界碰撞检测
 * @param polygon1
 * @param polygon2
 * @returns 是否碰撞 true: 碰撞 false: 未碰撞
 */
export function polygonsOverlap(polygon1: Polygon, polygon2: Polygon) {
  const axes1 = getAxes(polygon1);
  const axes2 = getAxes(polygon2);
  for (const axis of [...axes1, ...axes2]) {
    const p1 = projectPolygon(axis, polygon1);
    const p2 = projectPolygon(axis, polygon2);
    if (isSeparated(p1, p2)) {
      return false;
    }
  }
  return true;
}
