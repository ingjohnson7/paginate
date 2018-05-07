//  Fabian Johnson 05/07/2018
//  For learning purposes

//  Get page number
const uri = new URL(window.location.href);
let pageNumber = uri.searchParams.get('page');

const numberByPageE = document.getElementById('results-by-page');

if(sessionStorage.getItem('results-by-page') !== null) {
    numberByPageE.value = sessionStorage.getItem('results-by-page');
}

let resultsByPage = numberByPageE.value;

const allDataLength = getStaticData().length;

//  Check for valid page
if(pageNumber !== null && pageNumber > 0) {

} else {
    pageNumber = 1;
}


//  Listen for new results by page
numberByPageE.addEventListener('change', e => {
    
    resultsByPage = numberByPageE.value;
    sessionStorage.setItem('results-by-page', numberByPageE.value);
    
    try{
        paintData(getStaticData());
    }
    catch(err) {
        alert(err);
        window.location = 'index.html';
    }
});

//  When page loaded
document.addEventListener('DOMContentLoaded', () => {
    try{
        paintData(getStaticData());
    }
    catch(err) {
        alert(err);
        window.location = 'index.html';
    }
})

function paintData(data) {
    
    const tableBody = document.querySelector('table tbody');
    const to = pageNumber * resultsByPage;
    const from = to - resultsByPage;
    let content = '';

    console.log('from:', from);
    console.log('to:', to);
    console.log('pageNumber', pageNumber);

    if(to > data.length) {
        throw 'No data available';
    }

    for(let counter = from; counter < to; counter ++) {
        
        content += `
            <tr>
                <td>${data[counter].id}</td>
                <td>${data[counter].login}</td>                
            </tr>
        `;

    }

    tableBody.innerHTML = content;
    paintPagination();

}

function paintPagination() {

    const tableFooter = document.querySelector('table tfoot > tr > td');
    let pages = 1;
    let content = '';

    for(let i = 0; i < allDataLength; i += Number(resultsByPage)) {
        
        console.log(pages);
        
        if(pages !== 1) {

            content += ' | ';
        }

        if(pageNumber == pages) {
            content += `
                <b>
                    <a href="index.html?page=${pages}">${pages}</a>
                </b>     
            `;
        } else {
            content += `
                <a href="index.html?page=${pages}">${pages}</a> 
            `;
        }

        pages ++;

    }

    tableFooter.innerHTML = content;
}


function getStaticData() {
    const data = [];
    for(let i = 1; i < 31; i ++) {
        data.push({
            id: i,
            login: 'Bobby ' + i
        });
    }
    return data;
}