const cars = [
  {title:"Ronaldo Sport 2018", price:"3", gear:"Avtomatik", brand:"Ronaldo", img:"", phone:"+994 70 494 33 02"},
  {title:"Pista 2020", price:"5", gear:"Manual", brand:"Pista", img:"", phone:"+994 70 494 33 02"},
  {title:"City Sedan 2019", price:"4", gear:"Avtomatik", brand:"City", img:"", phone:"+994 70 494 33 02"},
  {title:"City Hatchback 2021", price:"6", gear:"Manual", brand:"City", img:"", phone:"+994 70 494 33 02"}
];


const carGrid = document.getElementById("carGrid");
const countEl = document.getElementById("count");
const totalAdsEl = document.getElementById("totalAds");
const newAdsEl = document.getElementById("newAds");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const gearFilter = document.getElementById("gearFilter");

function getGearLabel(gear){
  if(gear === "Avtomatik") return "Cizimli";
  if(gear === "Manual") return "Normal";
  return gear;
}

function renderCars(list){
  carGrid.innerHTML="";
  list.forEach((car,i)=>{
    const card=document.createElement("article");
    card.className="card fade-in";
    card.innerHTML=`
  <div class="thumb">Şəkil əlavə edin</div>
  <div class="card-body">
    <div class="car-title">
      <h4>${car.title || "Başlıq yoxdur"}</h4>
      <div class="price">${car.price ? car.price+" ₼" : "Qiymət yoxdur"}</div>
    </div>
    <div class="meta">Gear: ${getGearLabel(car.gear)}</div>
    <div class="contact">Əlaqə: ${car.phone || "Telefon yoxdur"}</div>
    <div class="cta-row">
      <button class="btn-outline">Ətraflı</button>
      <a href="tel:${car.phone}" class="btn">Əlaqə saxla</a>
    </div>
  </div>`;

    carGrid.appendChild(card);
    setTimeout(()=>card.classList.add("visible"),150*i);
  });
  countEl.textContent=list.length;
  totalAdsEl.textContent=cars.length;
  newAdsEl.textContent=list.filter(c=>c.gear==="Avtomatik").length;
}

function applyFilters(){
  const filtered = cars.filter(car=>{
    const search = searchInput.value.toLowerCase();
    if(search && !(car.title.toLowerCase().includes(search) || car.brand.toLowerCase().includes(search))) return false;
    if(brandFilter.value && car.brand!==brandFilter.value) return false;
    if(gearFilter.value && car.gear!==gearFilter.value) return false;
    if(car.price && car.price > parseInt(priceFilter.value)) return false;
    return true;
  });
  renderCars(filtered);
}

searchInput.addEventListener("input",applyFilters);
brandFilter.addEventListener("change",applyFilters);
gearFilter.addEventListener("change",applyFilters);
priceFilter.addEventListener("input",()=>{
  priceValue.textContent = priceFilter.value + " ₼";
  applyFilters();
});
document.getElementById("applyFilters").addEventListener("click",applyFilters);
document.getElementById("resetFilters").addEventListener("click",()=>{
  searchInput.value="";
  brandFilter.value="";
  gearFilter.value="";
  priceFilter.value=15;
  priceValue.textContent="15 ₼";
  renderCars(cars);
});

renderCars(cars);

// QR Code
window.addEventListener("load", function() {
  var qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // əvvəlki varsa sil
  new QRCode(qrContainer, {
    text: window.location.href,
    width: 120,
    height: 120,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
});




