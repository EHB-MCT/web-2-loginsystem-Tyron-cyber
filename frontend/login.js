window.onload = function () {


    document.getElementById('loginform').addEventListener('submit', (e) => {

        e.preventDefault();
        console.log('processing');
        // value van de form ophalen //
        let user = {}
        user.email = document.getElementById('exampleInputEmail1').value
        user.password = document.getElementById('exampleInputPassword1').value
        console.log(user)

        login();


        // Post request // 
        async function login() {
            let resp = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            })

            let data = await resp.json()
            console.log(data)


        }

    })


}