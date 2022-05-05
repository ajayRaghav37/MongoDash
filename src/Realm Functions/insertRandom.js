exports = async function(dateTime){
    const dt = {date: (new Date()).toString()};
    dt.type = ['CASH_IN', 'CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER', 'BALANCE_CORRECTION'][Math.floor(Math.random() * 6)];
    
    dt.amount = parseFloat((Math.random() * 1000000).toFixed(2));
    
    dt.nameOrig = 'C' + Math.floor(Math.random() * 100000000);
    dt.nameDest = 'C' + Math.floor(Math.random() * 100000000);
    dt.isFraud = Math.random() < 0.5 ? 'false': 'true';
    dt.isFlaggedFraud = dt.isFraud || (Math.random() < 0.002 ? 'true': 'false');
    dt.date = (new Date()).toISOString();
    
    const countries = ["Abkhazia", "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
      "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
      "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
      "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic",
      "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo (DRC)", "Congo (Republic)", "Cook Islands", "Costa Rica",
      "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
      "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
      "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guadeloupe", "Guam",
      "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
      "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
      "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia (FYROM)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
      "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco",
      "Mozambique", "Myanmar (Burma)", "Nagorno-Karabakh Republic", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand",
      "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Cyprus", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
      "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russia", "Rwanda",
      "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
      "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Korea",
      "South Ossetia", "South Sudan", "Spain", "Sri Lanka", "St. Barthélemy", "St. Kitts and Nevis", "St. Lucia", "St. Martin", "Sudan", "Suriname", "Svalbard and Jan Mayen",
      "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Transnistria",
      "Trinidad and Tobago", "Tristan da Cunha", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "U.S. Virgin Islands", "Uganda", "Ukraine",
      "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wallis and Futuna",
      "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
  
    dt.sourceCountry = Math.random() < 0.5 ? countries[Math.floor(Math.random() * countries.length)] : ['Greenland', 'Antarctica'][Math.round(Math.random())];
    dt.destinationCountry = Math.random() < 0.8 ? dt.sourceCountry :
    (Math.random() < 0.5 ? countries[Math.floor(Math.random() * countries.length)] : ['Greenland', 'Antarctica'][Math.round(Math.random())]);
  
    console.log(JSON.stringify(dt,null,2));
    
    const mongodb = context.services.get("mongodb-atlas");
    
    const txns = mongodb.db('fraudtxns').collection('txns');
    
    const docInserted = {_id: (await txns.insertOne(dt)).insertedId, ...dt};
    
      const docsInserted = await txns.count({date:{$gte: dateTime}});
    return {docInserted, docsInserted};
  };