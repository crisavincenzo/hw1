function onResponse(response) 
{
    if (!response.ok) return null;
    return response.json();
}

function removeError(event)
{
    if(form.genere.value.length === 0)
    {     
        document.querySelector("#err_genere").classList.remove("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_genere").classList.add("hidden");
    }
}

function checkName(event) 
{
    const input = event.currentTarget;
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿáéíóúÁÉÍÓÚñÑ \-'`]{2,50}$/;
    
    if(!regex.test(input.value))
    {
        document.querySelector("#err_name_regex").classList.remove("hidden");
        document.querySelector("#err_empty_name").classList.add("hidden");     
    }else
    {
        document.querySelector("#err_name_regex").classList.add("hidden");
        document.querySelector("#err_empty_name").classList.add("hidden");
    }
}

function checkSurname(event) 
{
    const input = event.currentTarget;
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿáéíóúÁÉÍÓÚñÑ \-'`]{2,50}$/;
    
    if(!regex.test(input.value))
    {
        document.querySelector("#err_surname_regex").classList.remove("hidden");
        document.querySelector("#err_empty_surname").classList.add("hidden");

    }else
    {
        document.querySelector("#err_surname_regex").classList.add("hidden");
        document.querySelector("#err_empty_surname").classList.add("hidden");
    }
}

function jsonCheckEmail(json) 
{
    document.querySelector("#err_empty_email").classList.add("hidden");
    document.querySelector("#err_email_regex").classList.add("hidden");
    if (!json.exists) 
    {
        document.querySelector("#err_email").classList.add("hidden");
    } else 
    {
        document.querySelector("#err_email").classList.remove("hidden");
    }
}

function checkEmail(event) 
{
    const input = event.currentTarget;
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase())) 
    {
        document.querySelector("#err_email_regex").classList.remove("hidden");
        document.querySelector("#err_empty_email").classList.add("hidden");
        document.querySelector("#err_email").classList.add("hidden");

    }else 
    {
        fetch("check_email.php?q="+encodeURIComponent(String(input.value).toLowerCase())).then(onResponse).then(jsonCheckEmail);
    }
}

function jsonCheckUsername(json) 
{
    document.querySelector("#err_empty_username").classList.add("hidden");
    document.querySelector("#err_username_regex").classList.add("hidden");
    if (!json.exists) 
    {
        document.querySelector("#err_username").classList.add("hidden");
    } else 
    {
        document.querySelector("#err_username").classList.remove("hidden");
    }
}

function checkUsername(event) 
{
    const input = event.currentTarget;
    const regex = /^[a-zA-Z0-9_]{4,16}$/;

    if(!regex.test(input.value)) 
    {
        document.querySelector("#err_username_regex").classList.remove("hidden");
        document.querySelector("#err_empty_username").classList.add("hidden");
        document.querySelector("#err_username").classList.add("hidden");
    }else 
    {
        fetch("check_username.php?q="+encodeURIComponent(input.value)).then(onResponse).then(jsonCheckUsername);
    }    
}

function checkPassword(event) 
{
    const input = event.currentTarget;
    const regex = /[!@#$&^&*(),.?":{}|<>]/;
    if (regex.test(input.value)) 
    {
        document.querySelector("#err_low_password").classList.add("hidden");
    } else 
    {
        document.querySelector("#err_low_password").classList.remove("hidden");
    }
    if(input.value.length>=8)
    {
        document.querySelector("#err_low_password").classList.add("hidden");
    } else 
    {
        document.querySelector("#err_low_password").classList.remove("hidden");
    }
}

function checkConfirmPassword(event) 
{
    const input = event.currentTarget;
    
    if (input.value === document.querySelector('#password input').value) 
    {
        document.querySelector("#err_different_password").classList.add("hidden");
        document.querySelector("#err_password2").classList.add("hidden");

    } else 
    {
        document.querySelector("#err_different_password").classList.remove("hidden");
        document.querySelector("#err_password2").classList.add("hidden");
    }
}


function validazione(event)
{
    
    if(form.name.value.length === 0)
    {     
        document.querySelector("#err_empty_name").classList.remove("hidden"); 
        document.querySelector("#err_name_regex").classList.add("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_empty_name").classList.add("hidden");
    }
    
    if(form.surname.value.length === 0)
    {     
        document.querySelector("#err_empty_surname").classList.remove("hidden");
        document.querySelector("#err_surname_regex").classList.add("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_empty_surname").classList.add("hidden");
    }

    if(form.genere.value.length === 0)
    {     
        document.querySelector("#err_genere").classList.remove("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_genere").classList.add("hidden");
    }
    
    if(form.email.value.length === 0)
    {     
        document.querySelector("#err_empty_email").classList.remove("hidden");
        document.querySelector("#err_email").classList.add("hidden");
        document.querySelector("#err_email_regex").classList.add("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_empty_email").classList.add("hidden");
    }
    
    if(form.username.value.length === 0)
    {   
        document.querySelector("#err_empty_username").classList.remove("hidden");
        document.querySelector("#err_username").classList.add("hidden");
        document.querySelector("#err_username_regex").classList.add("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_empty_username").classList.add("hidden");
    }
    
    if(form.password.value.length === 0)
    {    
        document.querySelector("#err_low_password").classList.remove("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_low_password").classList.add("hidden");
    }

    if(form.confirm_password.value.length === 0)
    {
        document.querySelector("#err_password2").classList.remove("hidden");
        document.querySelector("#err_different_password").classList.add("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_password2").classList.add("hidden");
    }

    if(!form.allow.checked)
    {
        document.querySelector("#err_allow").classList.remove("hidden");
        event.preventDefault();
    }else
    {
        document.querySelector("#err_allow").classList.add("hidden");
    }

}

const form = document.forms['signup'];
form.addEventListener('submit', validazione);
document.querySelector('#name input').addEventListener('blur', checkName);
document.querySelector('#surname input').addEventListener('blur', checkSurname);
document.querySelector('#email input').addEventListener('blur', checkEmail);
document.querySelector('#username input').addEventListener('blur', checkUsername);
document.querySelector('#password input').addEventListener('blur', checkPassword);
document.querySelector('#confirm_password input').addEventListener('blur', checkConfirmPassword);


document.querySelector('#genere input').addEventListener('change', removeError);


function mostra_pwd(event)
{
    const label=event.currentTarget.parentNode;
    const input=label.querySelector('input');
    if(input.type==="password")
    {
        input.type="text";
    }else 
    {
        input.type="password";
    }
}

const buttons = document.querySelectorAll(".show");
for (const b of buttons)
{
    b.addEventListener('click',mostra_pwd);
}
