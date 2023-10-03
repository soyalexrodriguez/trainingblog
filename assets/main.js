const API = 'https://instapi.fly.dev/';
const content = null || document.getElementById('content');

async function fetchData(urlApi) {
    const response = await fetch(urlApi)
    const data = await response.json()
    return data
}

(async () => {
    try {
        let videos = []
        const apiData = await fetchData(API)
        for (const item of apiData.data) {
            if (item.media_type === 'VIDEO') {
                videos.push(item)
            }
        }
        let view = `
    ${videos.map(video =>`
        <div class="max-w-sm shadow-xl w-full lg:max-w-full lg:flex">
            <div class="h-max lg:h-72 lg:w-48 flex-none bg-cover rounded-t lg:rounded-r-none lg:rounded-l text-center overflow-hidden">
                <video autoplay muted loop playsinline poster="https://i.pinimg.com/originals/9d/be/09/9dbe09c59b38a67379f64ff1b1c89b33.jpg">
                    <source src="${video.media_url}" type="video/mp4">
                    <source src="${video.media_url}" type="video/ogg">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8">
                    <p class="text-sm text-gray-600 flex items-center">
                        <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                        Members only
                    </p>
                    <div class="text-gray-900 font-bold text-xl mb-2">${new Date(video.timestamp).toLocaleString('es-PE')}</div>
                    <p class="text-gray-700 text-base">${video.caption}</p>
                </div>
                <div class="flex items-center">
                    <img class="w-10 h-10 rounded-full mr-4" src="https://lh3.googleusercontent.com/drive-viewer/AK7aPaDAW9EqH7DqbayjG8Xj1H7oYIenHsF5cCW0fJAjBH7VP3YKtVPVNOBLKFW4eRdg8DFPhLXZUGqdL9gUuXX3lVcUWadgvg=w1366-h619">
                    <div class="text-sm">
                        <p class="text-gray-900 leading-none">Alex Rodriguez</p>
                        <p class="text-gray-600">@${video.username}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('')}`
        content.innerHTML = view
    } catch (error) {
        console.log(error)
    }
})()
