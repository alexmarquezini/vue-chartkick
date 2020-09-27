import buble from "@rollup/plugin-buble";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";

const input = "src/index.js";
const outputName = "VueChartkick";
const external = Object.keys(pkg.peerDependencies).concat(Object.keys(pkg.dependencies));
const esExternal = external;
const globals = {
  chartkick: "Chartkick",
  vue: "Vue"
};
const banner =
`/*
 * Vue Chartkick
 * ${pkg.description}
 * ${pkg.repository.url}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default [
  {
    input: input,
    output: {
      name: outputName,
      file: pkg.main,
      format: "umd",
      banner: banner,
      globals: globals
    },
    external: external,
    plugins: [
      resolve(),
      commonjs(),
      buble()
    ]
  },
  {
    input: input,
    output: {
      name: outputName,
      file: pkg.main.replace(/\.js$/, ".min.js"),
      format: "umd",
      globals: globals
    },
    external: external,
    plugins: [
      resolve(),
      commonjs(),
      buble(),
      uglify()
    ]
  },
  {
    input: input,
    output: {
      file: pkg.module,
      format: "es",
      banner: banner
    },
    external: esExternal,
    plugins: [
      buble()
    ]
  }
];
