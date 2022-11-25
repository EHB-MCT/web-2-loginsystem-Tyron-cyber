window.onload = function () {
    //eventlistener for submitbutton//
    document.getElementById('register').addEventListener('submit', (e) => {
        e.preventDefault()
        let user = {

        }
        user.email = document.getElementById('exampleInputEmail1').value
        user.username = document.getElementById('inputUsername').value
        user.password = document.getElementById('InputPassword').value
        user.repeated = document.getElementById('repeatInputPassword').value

        console.log(user)

        if (user.password === user.repeated) {
            console.log("passwords are matching ")
            register()
        } else {
            console.log("passwords not matching")
        }

        //post request// 
        async function register() {
            let res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    username: user.username,
                    password: user.password
                })
            })
            let data = await res.json()
            console.log(data)

        }
    })


};