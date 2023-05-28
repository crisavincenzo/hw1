function onJsonContent(json)
{
    console.log(json);
    const section=document.querySelector('#content');
    section.innerHTML='';

    const block=document.createElement('div');
    block.classList.add('block');

    const img=document.createElement('img');
    img.src=json.image;

    const info=document.createElement('div');
    info.classList.add('info');
    const titolo=document.createElement('h3');
    titolo.textContent=json.title;

    const quote=document.createElement('div');
    quote.classList.add('quote');

    const anno=document.createElement('p');
    anno.textContent=json.year;
    const voto=document.createElement('p');
    voto.textContent=json.imDbRating + "/10";

    const tipo=document.createElement('p');
    tipo.textContent=json.type + " - " + json.genres;

    const sinossi_testo=document.createElement('p');
    sinossi_testo.textContent="Sinossi:";
    sinossi_testo.classList.add('azzurro');
    const sinossi=document.createElement('p');
    sinossi.textContent=json.plotLocal;

    const durata=document.createElement('p');

    if(json.tvSeriesInfo!==null)
    {
        durata.textContent="Durata: " + json.tvSeriesInfo.seasons.length + " stagioni";
    }else if(json.runtimeStr!==null)
    {
        durata.textContent="Durata: " + json.runtimeStr;
    }else
    {
        durata.textContent="Durata: " + json.runtimeMins;
    }

    const cast=document.createElement('p');
    cast.textContent="Cast: " + json.stars;

    const premi=document.createElement('p');
    premi.textContent="Premi: " + json.awards;

    const trailer=document.createElement('a');
    trailer.href=json.linkEmbed;
    trailer.textContent="Trailer";

    const simili=document.createElement('p');
    simili.textContent="Simili:";

    const similar=document.createElement('div');
    similar.classList.add('similar');

    for(let i=0;i<3;i++)
    {
        const doc=json.similars[i];

        const container=document.createElement('a');
        container.href="#content";
        container.classList.add('container');
        container.dataset.id=doc.id;
        container.dataset.title=doc.title;
        container.dataset.image=doc.image;

        const titolo = document.createElement('h3');
        titolo.textContent=doc.title;
        const img = document.createElement('img');
        img.src=doc.image;

        container.addEventListener('click',fetch_content);

        container.appendChild(titolo);
        container.appendChild(img);
        similar.appendChild(container);


        if(!doc.selected)
        {
            const button=document.createElement('button');
            button.classList.add('button');
            button.textContent='Aggiungi alla lista';
            button.addEventListener('click',aggiungi);
            container.appendChild(button);
        }else
        {
            const already = document.createElement('p');
            already.textContent="Già in lista";
            container.appendChild(already);
        }
    }

    section.appendChild(block);

    block.appendChild(img);
    block.appendChild(info);

    info.appendChild(titolo);
    info.appendChild(quote);
    quote.appendChild(anno);
    quote.appendChild(voto);
    info.appendChild(tipo);
    info.appendChild(sinossi_testo);
    info.appendChild(sinossi);
    info.appendChild(durata);

    section.appendChild(cast);
    section.appendChild(premi);
    section.appendChild(trailer);
    section.appendChild(simili);
    section.appendChild(similar);

}

function onResponse(response) 
{
    return response.json();
}

function fetch_content(event)
{
    const id=event.currentTarget.dataset.id;
    fetch('content_data.php?q='+encodeURIComponent(id)).then(onResponse).then(onJsonContent);
}


function onJsonQuery(json)
{
    if (!json.ok) 
    {
        return null;
    }
}

function aggiungi(event)
{
    event.stopPropagation();
    event.preventDefault();

    const id = event.currentTarget.parentNode.dataset.id;
    const title = event.currentTarget.parentNode.dataset.title;
    const image = event.currentTarget.parentNode.dataset.image;


    const formData = new FormData();
    formData.append('id', id);
    formData.append('titolo',title);
    formData.append('poster',image);
    fetch("save_content.php", {method: 'post', body: formData}).then(onResponse).then(onJsonQuery);
    event.currentTarget.classList.add('hidden'); 
    const already = document.createElement('p');
    already.textContent="Aggiunto alla lista";
    event.currentTarget.parentNode.appendChild(already);
}

function onJsonContents(json)
{
    console.log(json);
    document.querySelector('.cerca input').value='';
    const view=document.querySelector('#view');
    view.innerHTML='';
    const section=document.querySelector('#content');
    section.innerHTML='';

    for(let i=0;i<6;i++)
    {
        const doc=json.results[i];

        const container=document.createElement('a');
        container.href="#content";
        container.classList.add('container');
        container.dataset.id=doc.id;
        container.dataset.title=doc.title;
        container.dataset.image=doc.image;

        const titolo = document.createElement('h3');
        titolo.textContent=doc.title;
        const img = document.createElement('img');
        img.src=doc.image;
        const descrizione = document.createElement('p');
        descrizione.textContent=doc.description;
        
        container.addEventListener('click',fetch_content);

        container.appendChild(titolo);
        container.appendChild(img);
        container.appendChild(descrizione);
        view.appendChild(container);

        if(!doc.selected)
        {
            const button=document.createElement('button');
            button.classList.add('button');
            button.textContent='Aggiungi alla lista';
            button.addEventListener('click',aggiungi);
            container.appendChild(button);
        }else
        {
            const already = document.createElement('p');
            already.textContent="Già in lista";
            container.appendChild(already);
        }

    }
}

function search(event)
{
    event.preventDefault();
    if(form.search.value.length !== 0)
    {
        const value = encodeURIComponent(form.search.value);
        fetch('imdb_request.php?q='+value).then(onResponse).then(onJsonContents);
    }
}

const form = document.forms['search'];
fetch('imdb_request.php?q='+encodeURIComponent(form.search.value)).then(onResponse).then(onJsonContents);
form.addEventListener('submit', search);
document.querySelector('.cerca img').addEventListener('click',search);

