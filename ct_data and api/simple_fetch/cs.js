

  console.log("fetching");

  catchHouse().catch(error => {
    console.log("Log an Error");
    console.log(error);
  });
  catchPoem().catch(error => {
    console.log("Log an Error");
    console.log(error);
  });

  async function catchHouse(){
    const response = await fetch("./house.jpg");
    const blob = await response.blob();
    document.getElementById('house').src=URL.createObjectURL(blob);
  }

  async function catchPoem(){
    const res = await fetch("./poem.txt");
    const text= await res.text();
    const  p= document.getElementById('poem');
    p.innerText=text;
    console.log(p);
  }
  /*
  fetch("./house.jpg").then(response => {
        console.log(response);
      return response.blob();
    }).then(blob =>{
          console.log(blob);
          document.getElementById('house').src=URL.createObjectURL(blob);
  }).catch(error => {
    console.log("Error!")
    console.log(error);
  });
*/
