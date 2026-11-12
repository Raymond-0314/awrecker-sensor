// markdown-it-attrs expects style="..."; accept style = "..." after images too.
export default function imageStyleAttributes(md) {
  md.core.ruler.after('inline', 'image_style_attributes', state => {
    for (const block of state.tokens) {
      const tokens = block.children || []
      for (let index = 0; index < tokens.length - 1; index++) {
        if (tokens[index].type !== 'image' || tokens[index + 1].type !== 'text') continue
        tokens[index + 1].content = tokens[index + 1].content.replace(
          /^(\{[^}\n]*?\bstyle)\s*=\s*(?=["'])/,
          '$1='
        )
      }
    }
  })
}
