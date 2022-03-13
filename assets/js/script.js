document.addEventListener('DOMContentLoaded', function (){
    
    
    

    let searchButton = document.getElementById('search-button');

    let resultsContainer = document.createElement("div");
    resultsContainer.id = "results-container";
    resultsContainer.style.display = "none";
    resultsContainer.style.width = "50%";
    resultsContainer.style.height = "70%";
    resultsContainer.style.overflow = "scroll";
    resultsContainer.style.border = "1px solid black";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.borderRadius = "20px";
    resultsContainer.style.marginBottom = "10px";
    resultsContainer.style.boxShadow = "0px 0px 10px black";

    let pageContainer = document.getElementById('page-container');

    document.getElementById('page-container').appendChild(resultsContainer);

    
    let searchField = document.getElementById('search-field');

    let resContainerCloseBtn = document.createElement('button')
    resContainerCloseBtn.id = 'resContainer-close-btn'
    resContainerCloseBtn.style.position = 'relative'
    resContainerCloseBtn.style.width = '5%'
    resContainerCloseBtn.style.left = '50%'
    resContainerCloseBtn.style.marginBottom = '3px'
    resContainerCloseBtn.style.cursor = 'pointer'
    
    let resContainerCloseImg = document.createElement('img')
    resContainerCloseImg.id = 'resContainer-close-img'
    resContainerCloseImg.src = 'assets/img/close_icon.svg'
    resContainerCloseImg.style.width = '100%'

    let errorMsg = document.createElement('p')
    errorMsg.className = 'errorMsg'
    errorMsg.style.backgroundColor = 'red'

    document.getElementById('results-container').appendChild(resContainerCloseBtn)
    document.getElementById('resContainer-close-btn').appendChild(resContainerCloseImg)

    resContainerCloseBtn.addEventListener('click', function (){
        resultsContainer.style.display = 'none'
    })



    let resId = 0;
    let modId = 0;
    let modCloseId = 0;
    let modParaId = 0;
    let desc;
    
    document.getElementById('search-button').addEventListener('click', function(){
                
        resultsContainer.style.display = "flex";
        resultsContainer.style.flexDirection = "column";

        document.querySelectorAll(".results").forEach(el => el.remove());
        document.querySelectorAll(".modal").forEach(el => el.remove());
        document.querySelectorAll(".errorMsg").forEach(el => el.remove());

        if(searchField.value.split(' ').length > 1){
            searchField.value = searchField.value.split(' ').join('_')
        }
        
        fetch(`https://openlibrary.org/subjects/${searchField.value}.json`)
        .then(response =>  response.json())
        .then(data => {
            if('error' in data){
                resultsContainer.appendChild(errorMsg)
                errorMsg.innerText = `Errore, qualcosa e' andato storto: ${data.error}`
            }
            else if('work_count' in data && data.work_count < 1){
                resultsContainer.appendChild(errorMsg)
                errorMsg.innerText = 'Nessun risultato per il genere inserito.'
            }
            
            else{

                for(let x of data.works){
        
                    let result = document.createElement('p');
                    result.id = `result${resId}`;
                    result.className = 'results'
                    resId += 1;
                    result.innerText = x.title +' - '+ x.authors[0].name;
                    
                    let modal = document.createElement('div');
                    modal.id = `modal${modId}`;
                    modal.className = 'modal';
                    modal.style.lineHeight = '1.5'
                    modal.style.borderRadius = '10px'
                    modId +=1;
                    
                    let modalCloseBtn = document.createElement('button')
                    modalCloseBtn.id = `modal-close-btn${modCloseId}`
                    modalCloseBtn.style.position = 'relative'
                    modalCloseBtn.style.width = '5%'
                    modalCloseBtn.style.left = '95%'
                    modalCloseBtn.style.marginBottom = '3px'
                    modalCloseBtn.style.cursor = 'pointer'
                    
                    let modalCloseImg = document.createElement('img')
                    modalCloseImg.id = `modal-close-img${modCloseId}`
                    modalCloseImg.src = 'assets/img/close_icon.svg'
                    modalCloseImg.style.width = '100%'
                    
                    modCloseId += 1;

                    let modPara = document.createElement('p')
                    modPara.id = `modpara${modParaId}`
                    modPara.style.backgroundColor = '#5F9EA0'
                    modPara.style.borderRadius = ' 10px'
                    modPara.style.padding = '10px'
                    modParaId += 1;
                    
                    
                    document.getElementById('results-container').appendChild(result);
                    
                    document.getElementById('page-container').appendChild(modal);
                    desc = x.key;
    
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


                    fetch(`https://openlibrary.org${desc}.json`)
                    .then(response => response.json())
                    .then(data => {
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
                    })
                    
                }
            }

            resId = 0;
            modId = 0;
            modCloseId = 0;
            modParaId = 0;
            desc = '';

            
        
        })
        
    });

    document.getElementById('search-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
                       
            resultsContainer.style.display = "flex";
            resultsContainer.style.flexDirection = "column";
    
            document.querySelectorAll(".results").forEach(el => el.remove());
            document.querySelectorAll(".modal").forEach(el => el.remove());
            document.querySelectorAll(".errorMsg").forEach(el => el.remove());

            if(searchField.value.split(' ').length > 1){
                searchField.value = searchField.value.split(' ').join('_')
            }
            
            fetch(`https://openlibrary.org/subjects/${searchField.value}.json`)
            .then(response =>  response.json())
            .then(data => {
                if('error' in data){
                    resultsContainer.appendChild(errorMsg)
                    errorMsg.innerText = `Errore, qualcosa e' andato storto: ${data.error}`
                }
                else if('work_count' in data && data.work_count < 1){
                    resultsContainer.appendChild(errorMsg)
                    errorMsg.innerText = 'Nessun risultato per il genere inserito.'
                }
                
                else{
    
                    for(let x of data.works){
            
                        let result = document.createElement('p');
                        result.id = `result${resId}`;
                        result.className = 'results'
                        resId += 1;
                        result.innerText = x.title +' - '+ x.authors[0].name;
                        
                        let modal = document.createElement('div');
                        modal.id = `modal${modId}`;
                        modal.className = 'modal';
                        modal.style.lineHeight = '1.5'
                        modal.style.borderRadius = '10px'
                        modId +=1;
                        
                        let modalCloseBtn = document.createElement('button')
                        modalCloseBtn.id = `modal-close-btn${modCloseId}`
                        modalCloseBtn.style.position = 'relative'
                        modalCloseBtn.style.width = '5%'
                        modalCloseBtn.style.left = '95%'
                        modalCloseBtn.style.marginBottom = '3px'
                        modalCloseBtn.style.cursor = 'pointer'
                        
                        let modalCloseImg = document.createElement('img')
                        modalCloseImg.id = `modal-close-img${modCloseId}`
                        modalCloseImg.src = 'assets/img/close_icon.svg'
                        modalCloseImg.style.width = '100%'

                        modCloseId += 1;
                        

                        let modPara = document.createElement('p')
                        modPara.id = `modpara${modParaId}`
                        modPara.style.backgroundColor = '#5F9EA0'
                        modPara.style.borderRadius = ' 10px'
                        modPara.style.padding = '10px'

                        modParaId += 1;
                        
                        
                        document.getElementById('results-container').appendChild(result);
                        
                        document.getElementById('page-container').appendChild(modal);
                        desc = x.key;
        
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
                        
        
                        fetch(`https://openlibrary.org${desc}.json`)
                        .then(response => response.json())
                        .then(data => {
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
                        })
                        
                        
                    }
                }
    
                resId = 0;
                modId = 0;
                modCloseId = 0;
                modParaId = 0;
                desc = '';
            
            })
    
        }
    });
    
    

});