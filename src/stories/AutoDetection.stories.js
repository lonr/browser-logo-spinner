import "../index";
import { setAttrs } from "./utils";
import {
  array,
  boolean,
  button,
  color,
  date,
  select,
  withKnobs,
  text,
  number,
} from "@storybook/addon-knobs";

export default {
  title: "Spinners/Auto Detection",
  // argTypes: {
  //   width: { name: 'style.width', control: 'text', defaultValue: '100px' },
  //   loading: { description: 'loading at the beginning', control: 'boolean', defaultValue: true },
  //   delay: { description: 'delay after loading', control: 'number', defaultValue: 200 },
  //   fasterRate: {
  //     name: 'faster-rate',
  //     description: 'animate faster after loading',
  //     control: 'number',
  //     defaultValue: 2,
  //   },
  // },
  decorators: [withKnobs],
};

const spinner = document.createElement("browser-logo-spinner");
export const Template = (attrs) => {
  setAttrs(spinner, {
    loading: boolean("loading", true),
    width: text("width", "100px"),
    delay: number("delay", 200),
    fasterRate: number("faster-rate", 2),
  });
  return spinner;
};
