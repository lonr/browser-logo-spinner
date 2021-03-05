import "../index";
import { setAttrs } from "./utils";

export default {
  title: "Spinners/All",
  argTypes: {
    width: {
      name: "style.width",
      description: "you should add a width",
      control: "text",
      defaultValue: "100px",
    },
    loading: {
      description:
        "Initial loading status. Use `Auto Detection story - Knobs` to change loading status **dynamically**",
      control: "boolean",
      defaultValue: true,
    },
    // delay: { description: 'delay after loading', control: 'number', defaultValue: 200 },
    // fasterRate: {
    //   name: 'faster-rate',
    //   description: 'faster animate after loading',
    //   control: 'number',
    //   defaultValue: 2,
    // },
  },
};

const Template = (attrs) => {
  const div = document.createElement("div");
  const browsers = ["chrome", "edge", "firefox", "opera", "safari"];
  browsers.forEach((browser) => {
    const spinner = document.createElement(`${browser}-spinner`);
    setAttrs(spinner, attrs);
    div.append(spinner);
  });
  return div;
};

export const DefaultBehavior = Template.bind({});
DefaultBehavior.args = {
  width: "100px",
};
