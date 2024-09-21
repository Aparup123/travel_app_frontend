const registerForm=document.getElementById('registerForm')

registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const username=document.getElementById('username')
    const password=document.getElementById('password')
    const body={
        username:username.value,
        password:password.value
    }
    console.log(body)
    const data=await fetch('http://localhost:3001/api/users', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            
        },
        credentials:'include',
        method:'POST',
        body:JSON.stringify(body)
    })

    d=await data.json()
    console.log(d)
})

const loginButton=document.getElementById('loginButton')
loginButton.addEventListener('click', async ()=>{
    const res=await fetch('http://localhost:3001/login/', {
    credentials: 'include'      
    })
       

    body=await res.json()
    console.log(body)
})

const logoutButton=document.getElementById('logoutButton')
logoutButton.addEventListener('click', async()=>{
    const res=await fetch('http://localhost:3001/logout/', {
        method:'POST',
        credentials:'include'
    })
    const data=await res.json();
    console.log(data)
})