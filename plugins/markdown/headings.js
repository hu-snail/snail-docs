import escapeHtml from 'escape-html'


export const headingPlugin = (md) => {
    md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
        const title = tokens[i + 1].content
        tokens[i].attrJoin("id", title)
        tokens[i].attrJoin("class", "md-title")
        return self.renderToken(tokens, i, options)
        
    }
}