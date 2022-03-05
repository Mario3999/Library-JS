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
    resultsContainer.style.boxShadow = '0px 0px 10px black'

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
    // modalCloseImg.style.position = 'relative'
    resContainerCloseImg.style.width = '100%'
    // modalCloseImg.style.left = '95%'
    // modalCloseImg.style.marginBottom = '3px'

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
        

        // resultsContainer.innerHTML = '';

        document.querySelectorAll(".results").forEach(el => el.remove());
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
                    // modalCloseImg.style.position = 'relative'
                    modalCloseImg.style.width = '100%'
                    // modalCloseImg.style.left = '95%'
                    // modalCloseImg.style.marginBottom = '3px'
                    modCloseId += 1;
                    
                    
                    
                    // let modalHeader = document.createElement('H1');
                    // var t = document.createTextNode("Description"); 
                    // modalHeader.appendChild(t);
                    // modalHeader.style.width = '2vw';

                    let modPara = document.createElement('p')
                    modPara.id = `modpara${modParaId}`
                    modPara.style.backgroundColor = '#5F9EA0'
                    modPara.style.borderRadius = ' 10px'
                    modPara.style.padding = '10px'
                    // modPara.style.width = '30%'
                    // modPara.style.height = '30%'
                    modParaId += 1;
                    
                    
                    document.getElementById('results-container').appendChild(result);
                    
                    document.getElementById('page-container').appendChild(modal);
                    desc = x.key;
    
                    document.getElementById(modal.id).appendChild(modalCloseBtn);                
                    
                    document.getElementById(modalCloseBtn.id).appendChild(modalCloseImg);
                    // document.getElementById(modal.id).appendChild(modalHeader);
                    
                    document.getElementById(modal.id).appendChild(modPara);

                    document.getElementById(result.id).addEventListener('click', function(){
                        if(modal.style.display != 'flex'){
                            // modalHeader.style.display = 'block';
                            modal.style.display = 'flex';
                            modal.style.flexDirection = 'column';
                            // pageContainer.style.filter = 'blur(5px)'
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
                    
                    // fetch(`https://openlibrary.org${desc}.json`)
                    // .then(response => response.json())
                    // .then(data => {
                    //     if(data.description in data){
                    //         if(typeof data.description === 'object'){
                    //             modal.innerHTML += data.description.value
                    //             document.getElementById(modalCloseDiv.id).addEventListener('click', function(){
                    //                 if(modal.style.display == 'flex'){
                    //                     modal.style.display = 'none'
                    //                 }
                    //             })
                    //         }
                    //         else{
                    //             modal.innerHTML += data.description;
                    //             document.getElementById(modalCloseDiv.id).addEventListener('click', function(){
                    //                 if(modal.style.display == 'flex'){
                    //                     modal.style.display = 'none'
                    //                 }
                    //             })
                    //         }

                    //     }
                    // })
                    

                    

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
            
    
            // resultsContainer.innerHTML = '';
            // resultsContainer.innerText = '';
    
            document.querySelectorAll(".results").forEach(el => el.remove());
            document.querySelectorAll(".modal").forEach(el => el.remove());
            document.querySelectorAll(".errorMsg").forEach(el => el.remove());

            if(searchField.value.split(' ').length > 1){
                searchField.value = searchField.value.split(' ').join('_')
            }
            
            fetch(`https://openlibrary.org/subjects/${searchField.value}.json`)
            .then(response =>  response.json())
            // .then(response => response.json())
            .then(data => {
                // console.log(typeof data)
                if('error' in data){
                    // resultsContainer.innerText = `Errore, qualcosa e' andato storto: ${data.error}`
                    resultsContainer.appendChild(errorMsg)
                    errorMsg.innerText = `Errore, qualcosa e' andato storto: ${data.error}`
                }
                else if('work_count' in data && data.work_count < 1){
                    // resultsContainer.innerText = 'Nessun risultato per il genere inserito.'
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
                        // modalCloseImg.style.position = 'relative'
                        modalCloseImg.style.width = '100%'
                        // modalCloseImg.style.left = '95%'
                        // modalCloseImg.style.marginBottom = '3px'
                        modCloseId += 1;
                        
                        
                        
                        // let modalHeader = document.createElement('H1');
                        // var t = document.createTextNode("Description"); 
                        // modalHeader.appendChild(t);
                        // modalHeader.style.width = '2vw';

                        let modPara = document.createElement('p')
                        modPara.id = `modpara${modParaId}`
                        modPara.style.backgroundColor = '#5F9EA0'
                        modPara.style.borderRadius = ' 10px'
                        modPara.style.padding = '10px'
                        // modPara.style.width = '30%'
                        // modPara.style.height = '30%'
                        modParaId += 1;
                        
                        
                        document.getElementById('results-container').appendChild(result);
                        
                        document.getElementById('page-container').appendChild(modal);
                        desc = x.key;
        
                        document.getElementById(modal.id).appendChild(modalCloseBtn);                
                        
                        document.getElementById(modalCloseBtn.id).appendChild(modalCloseImg);
                        // document.getElementById(modal.id).appendChild(modalHeader);
                        
                        document.getElementById(modal.id).appendChild(modPara);

                        document.getElementById(result.id).addEventListener('click', function(){
                            if(modal.style.display != 'flex'){
                                // modalHeader.style.display = 'block';
                                modal.style.display = 'flex';
                                modal.style.flexDirection = 'column';
                                // pageContainer.style.filter = 'blur(5px)'
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
                        
                        // fetch(`https://openlibrary.org${desc}.json`)
                        // .then(response => response.json())
                        // .then(data => {
                        //     if(data.description in data){
                        //         if(typeof data.description === 'object'){
                        //             modal.innerHTML += data.description.value
                        //             document.getElementById(modalCloseDiv.id).addEventListener('click', function(){
                        //                 if(modal.style.display == 'flex'){
                        //                     modal.style.display = 'none'
                        //                 }
                        //             })
                        //         }
                        //         else{
                        //             modal.innerHTML += data.description;
                        //             document.getElementById(modalCloseDiv.id).addEventListener('click', function(){
                        //                 if(modal.style.display == 'flex'){
                        //                     modal.style.display = 'none'
                        //                 }
                        //             })
                        //         }

                        //     }
                        // })
                        

                        

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