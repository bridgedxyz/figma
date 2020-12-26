/**
 * renders materila icon to figma canvas via icon name and icon svg data
 * @param name 
 * @param data a svg data string
 */
export function renderSvgIcon(name: string, data: string): FrameNode {
    console.log(`inserting icon with name ${name} and data ${data}`)

    const currentViewportLocation = figma.viewport.center
    const node = figma.createNodeFromSvg(data)
    // todo replace naming creation with reflect core
    node.name = `icons/mdi_${name}`
    node.setSharedPluginData('icon', 'key', name)
    node.x = currentViewportLocation.x
    node.y = currentViewportLocation.y
    return node
}