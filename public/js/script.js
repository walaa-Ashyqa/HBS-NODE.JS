let form = document.getElementById("form1");

const locationf = document.getElementById("location");
const errorf = document.getElementById("error");
const wetherf = document.getElementById("weather");
var address;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(document.getElementById("address").value);
  address = document.getElementById("address").value;
  setTimeout(locationFun, 100);
  setTimeout(weatherFun, 500);
  setTimeout(form.reset(), 1000);
});

let weatherFun = async () => {
  try {
    console.log(address);
    const res = await fetch(
      "http://localhost:3001/search/weather?address=" + address
    );
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorf.innerText = data.error;
      locationf.innerText = "";
      wetherf.innerText = "";
    } else {
      wetherf.innerText = data.forecast;
      errorf.innerText = "";
    }
  } catch (e) {
    console.log(e);
  }
};
let locationFun = async () => {
  console.log(address);
  try {
    const res = await fetch(
      "http://localhost:3001/search/weather?address=" + address
    );
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorf.innerText = data.error;
      locationf.innerText = "";
      wetherf.innerText = "";
    } else {
      locationf.innerText = data.location;

      errorf.innerText = "";
    }
  } catch (e) {
    console.log(e);
  }
};
