//Creo elemento 'results-container'
let resultsContainer = document.createElement("div");
resultsContainer.id = "results-container";

//Creo reference per il 'page-container' (DIV che contiene l'intera pagina)
let pageContainer = document.getElementById('page-container');

//Appendo alla pagina la box dei risultati
document.getElementById('page-container').appendChild(resultsContainer);

//Creo reference al text-box
let searchField = document.getElementById('search-field');

//Creo il Close Button per il box dei risultati
let resContainerCloseBtn = document.createElement('button')
resContainerCloseBtn.id = 'resContainer-close-btn'

//Immagine della 'X' per il Close Button della box dei risultati
let resContainerCloseImg = document.createElement('img')
resContainerCloseImg.id = 'resContainer-close-img'
resContainerCloseImg.src = 'assets/img/close_icon.svg'

//Creo elemento 'p' per i messaggi di errore
let errorMsg = document.createElement('p')
errorMsg.className = 'errorMsg'

//Appendo il Close Button con relativa immagine al box dei risultati
document.getElementById('results-container').appendChild(resContainerCloseBtn)
document.getElementById('resContainer-close-btn').appendChild(resContainerCloseImg)

//Al click del Close Button della box dei risultati chiudo la box dei risultati
resContainerCloseBtn.addEventListener('click', function (){
    resultsContainer.style.display = 'none'
})

//Al click del 'search-button'
document.getElementById('search-button').addEventListener('click', fetchApi);

//Alla pressione del tasto Enter nel 'text-box'
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {

        fetchApi();
    }
});



//Creo variabili da utilizzare per l'assegnazione degli IDs agli elementi che credo quando fetcho
let resId = 0;
let modId = 0;
let modCloseId = 0;
let modParaId = 0;

async function fetchApi() {

    resultsContainer.style.display = "flex";
    resultsContainer.style.flexDirection = "column";

    //Pulisco il results container ogni volta che la funzione viene invocata
    document.querySelectorAll(".results").forEach(el => el.remove());
    document.querySelectorAll(".modal").forEach(el => el.remove());
    document.querySelectorAll(".errorMsg").forEach(el => el.remove());

    if(searchField.value.split(' ').length > 1){
        searchField.value = searchField.value.split(' ').join('_')
    }

    try {
        const subResponse = await axios.get(`https://openlibrary.org/subjects/${searchField.value}.json`, {
            validateStatus: function (status) {
            return status != 500 && status != 404 && status != 403 && status != 400;
            }
        })
        
        let workCount = _.get(subResponse, 'data.work_count')

        if(workCount < 1){
            resultsContainer.appendChild(errorMsg)
            errorMsg.innerText = 'Nessun risultato per il genere inserito.'
            return
        }

        let dataWorks = _.get(subResponse, 'data.works')

        for(let x of dataWorks){
            let result = document.createElement('p');
            result.id = `result${resId}`;
            result.className = 'results'
            resId += 1;
            result.innerText = _.get(x, 'title') +' - '+ _.get(x, 'authors[0].name');
            
            let modal = document.createElement('div');
            modal.id = `modal${modId}`;
            modal.className = 'modal';
            
            modId +=1;
            
            let modalCloseBtn = document.createElement('button')
            modalCloseBtn.id = `modal-close-btn${modCloseId}`
            modalCloseBtn.className = 'modal-close-btn'
            
            let modalCloseImg = document.createElement('img')
            modalCloseImg.id = `modal-close-img${modCloseId}`
            modalCloseImg.className = "modal-close-img"
            modalCloseImg.src = 'assets/img/close_icon.svg'

            modCloseId += 1;

            let modPara = document.createElement('p')
            modPara.id = `modpara${modParaId}`
            modPara.className = 'modpara'

            modParaId += 1;
            
            document.getElementById('results-container').appendChild(result);
            
            document.getElementById('page-container').appendChild(modal);

            document.getElementById(modal.id).appendChild(modalCloseBtn);                
            
            document.getElementById(modalCloseBtn.id).appendChild(modalCloseImg);
            
            document.getElementById(modal.id).appendChild(modPara);

            document.getElementById(result.id).addEventListener('click', function(){
                if(modal.style.display != 'flex'){
                    modal.style.display = 'flex';
                    modal.style.flexDirection = 'column';
                    resultsContainer.style.pointerEvents = 'none'
                    resultsContainer.style.filter = 'blur(5px)'
                }
            })

            document.getElementById(modalCloseBtn.id).addEventListener('click', function(){
                if(modal.style.display == 'flex'){
                    modal.style.display = 'none'
                    resultsContainer.style.removeProperty('pointer-events')
                    resultsContainer.style.removeProperty('filter')
                }
            })
            
            //Il workCode mi serve per fetchare le api della descrizione dei libri
            let workCode = _.get(x, 'key')
            
            try{
                const descResponse = await axios.get(`https://openlibrary.org${workCode}.json`, {
                validateStatus: function (status) {
                return status != 500 && status != 404 && status != 403 && status != 400;
                }})
                
                let data =_.get(descResponse, 'data')
                
                if('description' in data){
                    if(typeof data.description === 'object'){
                        modPara.innerText = data.description.value;                                    
                        
                    }
                    else{
                        modPara.innerText = data.description;
                        
                    }
                }
                else{
                    modPara.innerText = 'Nessuna descrizione trovata per il presente libro.'
                    modPara.style.backgroundColor = 'red'
                }

            }
            catch (error){
                modPara.innerText = `Non è stato possibile recuperare la descrizione del libro all'indirizzo specificato.`
                modPara.style.backgroundColor = 'red'
            }
            
        }
        
    }
    catch (error) {
        resultsContainer.appendChild(errorMsg)
        errorMsg.innerText = `Messaggio d'errore: ${error.message}. Legenda errori = 400: errore nell'input inserito (caratteri speciali etc...), 404: pagina non trovata, 500: Internal Server Error.`
    }
    
    //Pulisco le variabili
    resId = 0;
    modId = 0;
    modCloseId = 0;
    modParaId = 0;
};




