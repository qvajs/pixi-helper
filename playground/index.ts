import { Polygon } from "pixi.js";
import { polygonsOverlap } from "../src";

console.log(
  polygonsOverlap(
    new Polygon(0, 0, 0, 1, 1, 1, 1, 0),
    new Polygon(0.5, 0.5, 0.5, 1.5, 1.5, 1.5, 1.5, 0.5),
  ),
);
