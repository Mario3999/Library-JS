document.addEventListener('DOMContentLoaded', function (){
    
    
    

    let searchButton = document.getElementById('search-button');

    let resultsContainer = document.createElement('div');
    resultsContainer.id = 'results-container';
    resultsContainer.style.display = 'none';
    resultsContainer.style.width = '50%';
    resultsContainer.style.height = '70%';
    resultsContainer.style.overflow = 'scroll';
    resultsContainer.style.border = '1px solid black';
    resultsContainer.style.backgroundColor = 'white';
    resultsContainer.style.borderRadius = '20px';
    resultsContainer.style.marginBottom = '10px';

    let pageContainer = document.getElementById('page-container');

    document.getElementById('page-container').appendChild(resultsContainer);

    // let resultsShow = document.createElement('p');
    // resultsShow.style.width = '100%';
    // resultsShow.style.height = '100%';
    // resultsShow.style.overflow = 'scroll';
    // resultsShow.style.backgroundColor = 'red';
    // resultsShow.innerHTML = fetch('https://openlibrary.org/subjects/fantasy.json')
    



    // document.getElementById('results-container').appendChild(resultsShow);
    let searchField = document.getElementById('search-field');

    let resId = 0;
    let modId = 0;
    let modCloseId = 0;
    let desc;
    
    document.getElementById('search-button').addEventListener('click', function(){
                
        resultsContainer.style.display = "flex";
        resultsContainer.style.flexDirection = "column";
        

        resultsContainer.innerHTML = '';

        document.querySelectorAll(".modal").forEach(el => el.remove());
        
        
        fetch(`https://openlibrary.org/subjects/${searchField.value}.json`)
        .then(response => response.json())
        // .then(response => response.json())
        .then(data => {

            if('error' in data){
                resultsContainer.innerText = `Errore, qualcosa e' andato storto: ${data.error}`
            }
            else if('work_count' in data && data.work_count < 1){
                resultsContainer.innerText = 'Nessun risultato per il genere inserito'
            }
            
            else{
                
                for(let x of data.works){
        
                    let result = document.createElement('p');
                    result.id = `result${resId}`;
                    resId += 1;
                    result.innerHTML = x.title +' - '+ x.authors[0].name;
                    
                    let modal = document.createElement('div');
                    modal.id = `modal${modId}`;
                    modal.className = 'modal';
                    modal.style.lineHeight = '1.5'
                    modId +=1;
                    
                    let modalClose = document.createElement('img')
                    modalClose.id = `modal-close${modCloseId}`
                    modalClose.src = 'assets/img/close_icon.svg'
                    modalClose.style.position = 'relative'
                    modalClose.style.width = '5%'
                    modalClose.style.left = '95%'
                    modalClose.style.marginBottom = '3px'
                    modCloseId += 1;
                    
                    // let modalHeader = document.createElement('H1');
                    // var t = document.createTextNode("Description"); 
                    // modalHeader.appendChild(t);
                    // modalHeader.style.width = '2vw';
                    
                    
                    document.getElementById('results-container').appendChild(result);
                    
                    document.getElementById('page-container').appendChild(modal);
                    desc = x.key;
    
                    document.getElementById(modal.id).appendChild(modalClose);                
                    
                    // document.getElementById(modal.id).appendChild(modalHeader);
                    
                    
                    document.getElementById(result.id).addEventListener('click', function(){
                        if(modal.style.display != 'flex'){
                            // modalHeader.style.display = 'block';
                            modal.style.display = 'flex';
                            modal.style.flexDirection = 'column';
    
                            
                        }
                        
                    })//QUI SOTTO: DEVI METTERE L'IMMAGINE IN UN BOTTONE, COSI CI PUOI AGGIUNGERE L'EVENTO
                    document.getElementById(modalClose.id).addEventListener('click', function(){
                        if(modal.style.display == 'flex'){
                            modal.style.display = 'none';
                        }
                    })
    
                    fetch(`https://openlibrary.org${desc}.json`)
                    .then(response => response.json())
                    .then(data => {if(typeof data.description === 'object'){
                        modal.innerHTML += data.description.value}
                        else{
                            modal.innerHTML += data.description;
                        }
                    })
                }
            }

            resId = 0;
            modId = 0;
            modCloseId = 0;
            desc = '';

            
        
        })
        
        
        

        
    });

    document.getElementById('search-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
                       
            resultsContainer.style.display = "flex";
            resultsContainer.style.flexDirection = "column";
            
    
            resultsContainer.innerHTML = '';
    
            document.querySelectorAll(".modal").forEach(el => el.remove());
            
            
            fetch(`https://openlibrary.org/subjects/${searchField.value}.json`)
            .then(response =>  response.json())
            // .then(response => response.json())
            .then(data => {
                // console.log(typeof data)
                if('error' in data){
                    resultsContainer.innerText = `Errore, qualcosa e' andato storto: ${data.error}`
                }
                else if('work_count' in data && data.work_count < 1){
                    resultsContainer.innerText = 'Nessun risultato per il genere inserito'
                }
                
                else{
                    
                    for(let x of data.works){
            
                        let result = document.createElement('p');
                        result.id = `result${resId}`;
                        resId += 1;
                        result.innerHTML = x.title +' - '+ x.authors[0].name;
                        
                        let modal = document.createElement('div');
                        modal.id = `modal${modId}`;
                        modal.className = 'modal';
                        modal.style.lineHeight = '1.5'
                        modId +=1;
                        
                        let modalCloseDiv = document.createElement('div')
                        modalCloseDiv.id = `modal-close-div${modCloseId}`
                        modalCloseDiv.src = 'assets/img/close_icon.svg'
                        modalCloseDiv.style.position = 'relative'
                        modalCloseDiv.style.width = '5%'
                        modalCloseDiv.style.left = '95%'
                        modalCloseDiv.style.marginBottom = '3px'
                        
                        let modalCloseImg = document.createElement('img')
                        modalCloseImg.id = `modal-close-img${modCloseId}`
                        modalCloseImg.src = 'assets/img/close_icon.svg'
                        // modalCloseImg.style.position = 'relative'
                        modalCloseImg.style.width = '5%'
                        // modalCloseImg.style.left = '95%'
                        // modalCloseImg.style.marginBottom = '3px'
                        modCloseId += 1;
                        
                        // let modalHeader = document.createElement('H1');
                        // var t = document.createTextNode("Description"); 
                        // modalHeader.appendChild(t);
                        // modalHeader.style.width = '2vw';
                        
                        
                        document.getElementById('results-container').appendChild(result);
                        
                        document.getElementById('page-container').appendChild(modal);
                        desc = x.key;
        
                        document.getElementById(modal.id).appendChild(modalCloseDiv);                
                        
                        document.getElementById(modalCloseDiv.id).appendChild(modalCloseImg);
                        // document.getElementById(modal.id).appendChild(modalHeader);
                        
                        
                        document.getElementById(result.id).addEventListener('click', function(){
                            if(modal.style.display != 'flex'){
                                // modalHeader.style.display = 'block';
                                modal.style.display = 'flex';
                                modal.style.flexDirection = 'column';
        
                                
                            }
                            
                        })//QUI SOTTO: DEVI METTERE L'IMMAGINE IN UN BOTTONE, COSI CI PUOI AGGIUNGERE L'EVENTO
                        document.getElementById(modalCloseDiv.id).addEventListener('click', function(){
                            if(modal.style.display == 'flex'){
                                modal.style.display = 'none';
                            }
                        })
        
                        fetch(`https://openlibrary.org${desc}.json`)
                        .then(response => response.json())
                        .then(data => {if(typeof data.description === 'object'){
                            modal.innerHTML += data.description.value}
                            else{
                                modal.innerHTML += data.description;
                            }
                        })
                    }
                }
    
                resId = 0;
                modId = 0;
                modCloseId = 0;
                desc = '';
    
                
            
            })
    
        }
    });
    

    
    
    
    // resultsShow.innerText = fetch('https://openlibrary.org/subjects/fantasy.json')
    //     .then(response => response.json())
    //     .then( data => console.log(data));

    
    
    
    

        //fetch(`https://openlibrary.org/works/${}`))
        // .then( function () {document.getElementById('modal').addEventListener('click', function(){
        //     if(modal.style.display == 'block'){
        //         document.getElementById('modal').style.display = 'none';

        //     }
        // })})
    


    
    
    // let resForLoop = document.getElementsByClassName('result');
    
    // alert(typeof resForLoop[0])
    // alert(typeof resultsContainer)

    // document.getElementById('meca').addEventListener('click', function(){
    //     document.body.style.backgroundColor = 'red';
    // })

    // document.getElementById('result0').addEventListener('click', function(){
    //     document.body.style.backgroundColor = 'red';
    // })
    
    // for(let k=0; k < resForLoop.length; k++){
    //     document.getElementsByClassName('result')[k].addEventListener('click', function(){
    //         document.body.style.backgroundColor = 'red';
    //     })
    // }


    // fetch('https://openlibrary.org/subjects/fantasy.json')

    //     .then(response => response.json())
    //     .then( data => console.log(data));
        
    // function cazzo(){
    //     alert(ciao);
    // }
    // cazzo;

    

});