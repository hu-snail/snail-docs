import { marked } from 'marked';

function createRenderer (content) {
    let headingIndex = 0
    const renderer = {
        heading: (text, level) => {
            const id = text.replace(/ /g, '-')
            headingIndex++
            return `<h${level} id="heading-${headingIndex}" class="md-title">${text}</h${level}>`;
        },
    }
    marked.use({renderer})
    return marked.parse(content)
}

export default createRenderer