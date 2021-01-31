import { reflectColorToFigmaColor } from "@bridged.xyz/design-sdk/lib/figma/converters/color.convert";
import { Color } from "@reflect.bridged.xyz/core/lib/color";
import { IconConfig } from "@reflect.bridged.xyz/core/lib/icon/icon.config";
import {
  ICON_DEFAULT_SIZE,
  ICON_MAX_SIZE,
} from "@reflect.bridged.xyz/core/lib/icon/icon.constants";

export type IconPlacement = { x: number; y: number } | "center";

/**
 * renders materila icon to figma canvas via icon name and icon svg data
 * @param name
 * @param data a svg data string
 */
export function renderSvgIcon(
  name: string,
  data: string,
  color: Color = "#000000",
  placement: IconPlacement = "center",
  config?: IconConfig
): FrameNode {
  console.log(`inserting icon with name ${name} and data ${data}`);

  const currentViewportLocation = figma.viewport.center;
  const pos =
    placement == "center"
      ? {
          x: currentViewportLocation.x,
          y: currentViewportLocation.y,
        }
      : placement;

  const node = figma.createNodeFromSvg(data);

  // todo replace naming creation with reflect core
  node.name = buildReflectIconNameForRender(name, config);
  node.setSharedPluginData("icon", "key", name);
  node.x = pos.x;
  node.y = pos.y;
  switchSvgColor(node, [
    {
      from: "#000000",
      to: color,
    },
  ]);

  // operate extra manipulation if config is available.
  if (config) {
    const size = Number(config.default_size);
    node.resize(size, size);
  }

  // safe override
  // 1. override icon size if miss configured.
  if (Math.max(node.width, node.height) > ICON_MAX_SIZE) {
    node.resize(ICON_DEFAULT_SIZE, ICON_DEFAULT_SIZE);
  }

  return node;
}

export function buildReflectIconNameForRender(
  name: string,
  config: IconConfig
): string {
  if (config.host == "material") {
    return `icons/mdi_${name}`;
  } else if (config.host == "ant-design") {
    return `icons/antd-${name}`;
  } else {
    return `icons/${name}`;
  }
}

export function switchSvgColor(
  node: FrameNode,
  sets: { from: Color; to: Color }[]
) {
  function switchIfVector(node: SceneNode) {
    if (node.type == "VECTOR") {
      const fills = node.fills as Paint[];
      if (fills && fills.length > 0) {
        // fills.forEach((f) => {

        // })
        // FIXME - implement target switching.
        // this currently only accepts single set.
        node.fills = [
          {
            type: "SOLID",
            color: reflectColorToFigmaColor(sets[0].to),
          },
        ];
      }
    } else if ("children" in node) {
      node.children.forEach((c) => {
        switchIfVector(c);
      });
    }
  }

  node.children.forEach((c) => {
    switchIfVector(c);
  });
}
