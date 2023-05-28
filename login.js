function mostra_pwd(event)
{
    if(form.password.type==="password")
    {
        form.password.type="text";
    }else 
    {
        form.password.type="password";
    }
}

function validazione(event)
{
    if(form.username.value.length == 0 ||
       form.password.value.length == 0)
    {

        const errore=document.querySelector(".errore");
        errore.classList.remove("hidden");

        event.preventDefault();

        const errorephp=document.querySelector(".errorephp");
        errorephp.classList.add('hidden');
       
    }
        
}

const form = document.forms['login'];
form.addEventListener('submit', validazione);

const button = document.querySelector(".show");
button.addEventListener('click',mostra_pwd);