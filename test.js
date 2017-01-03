var http = require('http')
http.get('http://rap.alibaba-inc.com/api/queryRAPModel.do?projectId=1448', (res) => {
    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData)
            let model = eval('(' + parsedData.modelJSON + ')')
            console.log(JSON.stringify(model, null, 4))
            structure(model)
        } catch (e) {
            console.log(e.message)
        }
    })
})

// moduleList pageList actionList
// id name
function structure(root) {
    console.log(`
${root.name} ${root.id}
${root.moduleList.map(module => `
    ${module.name} ${module.id}
    ${module.pageList.map(page => `
        ${page.name} ${page.id}
        ${page.actionList.map(action => `
            ${action.name} ${action.id}
            ${action.requestParameterList.map(parameter => `
                ${parameter.name} ${parameter.id}
            `).join('')}    
            ${action.responseParameterList.map(parameter => `
                ${parameter.name} ${parameter.id}
            `).join('')}    
        `).join('')}
    `).join('')}
`).join('')}
    `)
}