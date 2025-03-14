document.getElementById("loginForm").addEventListener('submit', event => {
    event.preventDefault();
    getData();
});
async function getData()
{
    const { createClient } = supabase;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password_hash = CryptoJS.MD5(password);
    const client = createClient('https://unhnavtynugljizgpqch.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuaG5hdnR5bnVnbGppemdwcWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5OTg2MTIsImV4cCI6MjAyMzU3NDYxMn0.Di9XDnJgC6x1hJUxwvUPzWBM8efv8v3SSDjc6gehwZI');
    const {data}=await client
    .from ("users")
    .select()
    .eq("userid",username)
    .eq("password_hash",password_hash);
    if(data.length>0)
    {
    const role=data[0].role;
    document.getElementById("loginForm").style.display = "none";
    let table = document.getElementById("user_table");
    document.getElementById("fetch_again").style.display = "block";
    table.style.display = "block";
    if(role=="basic")
    {
        let row = table.insertRow();
        let useridCell = row.insertCell();
        let password_hashCell = row.insertCell();
        let roleCell = row.insertCell();
        useridCell.innerHTML = username;
        roleCell.innerHTML = role;
        password_hashCell.innerHTML = password_hash;
    }
    else
    {
        const {data}=await client
        .from ("users")
        .select();
        data.forEach((user) => {
        let row = table.insertRow();
        let userid = row.insertCell();
        let password_hash = row.insertCell();
        let role = row.insertCell();            
        userid.innerHTML = user.userid;
        role.innerHTML = user.role;
        password_hash.innerHTML = user.password_hash;

        })
    }
    }
    else
    {
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("Error").style.display = "block";
            document.getElementById("fetch_again").style.display = "block";
    }
}
