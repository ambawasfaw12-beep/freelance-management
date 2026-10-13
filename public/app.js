import HTMLconst from "./const.js"

const getClient = async () => {
    const response = await fetch('/api/clients')

    if (!response.ok) {
        return null
    }

    const clients = await response.json()

    HTMLconst.clientsList.innerHTML = ""

    clients.forEach(client => {
        const tr = document.createElement("tr")

        const nameTd = document.createElement("td")
        nameTd.textContent = client.name

        const emailTd = document.createElement("td")
        emailTd.textContent = client.email

        const phoneTd = document.createElement("td")
        phoneTd.textContent = client.phone

        const actionTd = document.createElement("td")
        const btn = document.createElement("button")
        
        btn.className = "btn btn-danger"
        btn.textContent = 'Delete'
        
        btn.dataset.id = client.id

        actionTd.appendChild(btn)
        tr.append(nameTd, emailTd, phoneTd, actionTd)

        HTMLconst.clientsList.appendChild(tr)
    })
}

getClient()

const getProject = async () => {
    const response = await fetch('/api/projects')

    if (!response.ok) {
        return null
    }

    const projects = response.json()

    projects.forEach(project => {
        const tr = document.createElement("tr")
        const nameTd = document.createElement("td")
        const emailTd = document.createElement("td")
        const phoneTd = document.createElement("td")
    })
}