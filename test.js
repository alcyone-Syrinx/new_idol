
testFucntion = (categoryName, codeValue) => {
    const { codeCategory } = this.state;
    const data = codeCategory.filter(a => a.categoryKey === categoryName)[0]?.detail
    const string = JSON.stringify(data.map(a => {
        const key = a.stringValue
        return {
            [key]: a.explanation
        }
    }))
    const test = string.replaceAll("{", "").replaceAll("}", "").replaceAll("[", "").replaceAll("]", "")
    console.log(test)
}