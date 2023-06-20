function store(){

    var tcno = document.getElementById('tcno');
    var adsoyad = document.getElementById('adsoyad');
    var telefon = document.getElementById('telefon');
    var email = document.getElementById('email');
    
    var pw = document.getElementById('pw');

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(email.value.length == 0 || pw.value.length == 0){
        alert('Lütfen Email veya şifre giriniz.');
        
    }
    else if(pw.value.length < 4)
        alert('EN AZ 4 KARAKTER UZUNLUĞUNDA OLMALI');
    else if(!pw.value.match(numbers)){
        alert('LÜTFEN EN AZ 1 SAYI GİRİNİZ');
    }else if(!pw.value.match(upperCaseLetters)){
        alert('LÜTFEN EN AZ 1 BÜYÜK HARF GİRİNİZ');

    }else if(!pw.value.match(lowerCaseLetters)){
        alert('LÜTFEN EN AZ 1 KÜÇÜK HARF GİRİNİZ');

    }else{
        localStorage.setItem('tcno', tcno.value);
        localStorage.setItem('adsoyad', adsoyad.value);
        localStorage.setItem('telefon', telefon.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('pw', pw.value);
        alert('KAYDINIZ YAPILDI!');
    }
}

//checking
function check(){
    var storedName = localStorage.getItem('email');
    var storedPw = localStorage.getItem('pw');
    var email = document.getElementById('email');
    var userPw = document.getElementById('userPw');
    
    if(email.value == storedName && userPw.value == storedPw){
        alert('GİRİŞ YAPILDI!');    
        sessionStorage.setItem("email", email.value);
        window.open("index.html");
    }else{
        alert('EMAİL VEYA ŞİFRE YANLIŞ!');
    }
}