////lec 7

//Express framework for node js
///it used to bulid web application
//CARD sys
// create=>post
// read => get
// update => patch
// delete => delete
//website domian: gloable domain local domain
//local node 3000 or  5000 //react 3000 //mango 27017
//express package install from npm
//npm init -y
//npm i express

//بدي اعرف اكمل الويب سايت
//1 insall express
const express = require("express");
const app = express();

//2 port
const port = process.env.POST || 3001;
//3 logic ,pages ,, end points

// app.get('/',(req,res)=>{
//     res.send("hello world!")
// })

app.get("/about", (req, res) => {
  res.send("about us ,n,n");
});
app.get("/page2", (req, res) => {
  res.send({ name: "wala", age: "26" });
});

////////////static page///////////
//path
const path = require("path");
const x = path.join(__dirname, "../public");
app.use(express.static(x));

//////////////////////////////////////
//hbs
app.set("view engine", "hbs");
const newDirctory = path.join(__dirname, "../temp/views");
app.set("views", newDirctory);
///////////////////////////
var hbs = require("hbs");

const PartialsPath = path.join(__dirname, "../temp/partials");
hbs.registerPartials(PartialsPath);
///////////////////////////
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    desc: "This Home Page",
  });
});

app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "profile Page",
    name: "WALAA",
    city: "palestine",
    age: "26",
    img: "images/img1.jpg",
  });
});
app.get("/team", (req, res) => {
  res.render("team", {
    title: "team Page",
    name: "WALAA",
    city: "palestine",
    age: "26",
  });
});
app.get("/search", (req, res) => {
  res.render("search", {
    title: "search Page",
    name: "WALAA",
    city: "palestine",
    age: "26",
  });
});

const mapbox = require("./tools/mapbox");
const WetherData = require("./tools/WetherData");

//app.get("/search", (req, res) => {
// if(!req.query.address){
//  return res.send({ error: "you must proived adress"});
// }
// mapbox(req.query.address,(error,data)=>{
//   if(error){
//     return res.send({error});
//   }
//     WetherData (data.Latitude,data.Longitude ,(error,weatherData)=>{
//       if(error){
//         return res.send({error});
//       }
//       res.render("search", {
//         title: "search Page",
//         name: weatherData,
//         city: req.query.address,
//         age: "26",
//       });
//     })
//   })

// });

app.get("/search/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must proived adress" });
  }
  mapbox(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    WetherData(data.Latitude, data.Longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: weatherData,
        location: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404 Page Not Founded");
});
///////////////////
//4 listen project on brower== كيف اخلي المشروع يسمع على براوزير
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
//npm i nodemon -g globle
