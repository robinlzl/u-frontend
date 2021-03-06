const regExp = /^(https?:\/\/)?(\w+\.)?(\w+\.)(\w+)([\w\?\&\=\-]?)*(\/[\w\?\&\=\-]*)*$/g

const isValidUrl = url => url.match(regExp) != null

const handleSubmit = async function (event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (!isValidUrl(formText)) {
        document.getElementById('polarity').innerHTML = `Please input a valid URL`
        return
    }
    // Client.checkForName(formText)
    console.log(formText)
    console.log("::: Form Submitted :::")
    const response = await fetch('http://localhost:8081/textapi',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({formText : formText})
        }
    )
    try {
        const data = await response.json()
        console.log(data)
        document.getElementById('polarity').innerHTML = `polarity : ${data.polarity}`
        document.getElementById('polarity_confidence').innerHTML = `polarity_confidence : ${data.polarity_confidence}`
        document.getElementById('text').innerHTML = `text : ${data.text}`
        document.getElementById('subjectivity').innerHTML = `subjectivity : ${data.subjectivity} `
        document.getElementById('subjectivity_confidence').innerHTML = `subjectivity_confidence : ${data.subjectivity_confidence}`

    } catch(error) {
        console.log('error', e)
    }
}

export { handleSubmit }
