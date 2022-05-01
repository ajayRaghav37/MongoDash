//input file is PS_20174392719_1491204439457_log 2.csv downloaded from https://www.kaggle.com/datasets/ealaxi/paysim1
const initDate = new Date('2018-01-29');
const initTime = initDate.getTime();
const csvToJson = require('csvtojson');
const fs = require('fs');
const { Parser } = require('json2csv');
const step = 20 * 24 * 60 * 60 * 1000;
const countries = ["Abkhazia", "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
    "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
    "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic",
    "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo (DRC)", "Congo (Republic)", "Cook Islands", "Costa Rica",
    "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
    "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam",
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

const freqs = [];
let freqSum = 0;

for (let i = 0; i < countries.length; i++) {
    const freq = Math.random() * 100;
    freqs.push(freq);
    freqSum += freq;
}

const freqCountries = ["Pakistan", "India", "Bangladesh", "Philippines", "Nepal", "Nigeria", "Kenya"];
const data2018 = [];
const data2019 = [];
const data2020 = [];

csvToJson().fromFile('./data.csv').then(
    rawData => {
        for (const data of rawData) {
            delete data.oldbalanceDest;
            delete data.newbalanceDest;
            delete data.oldbalanceOrg;
            delete data.newbalanceOrg;

            data.date = new Date(initTime + (step * (data.step - 1)));

            delete data.step;
            data.isFraud = data.isFraud === '1';
            data.isFlaggedFraud = data.isFlaggedFraud === '1';

            const randomFreq = Math.random() * freqSum;

            const findIndex = f => {
                let currSum = 0;

                for (let i = 0; i < freqs.length; i++) {
                    const currF = freqs[i];
                    currSum += currF;

                    if (currSum >= f) {
                        return i;
                    }
                }
            };

            data.country = Math.random() * 25 < 1 ? freqCountries[Math.floor(Math.random() * freqCountries.length)] :
                countries[findIndex(randomFreq)];

            if (!data.country) {
                console.log(randomFreq, freqSum, freqs);
            }

            if (data.date.getFullYear() === 2018) {
                data2018.push(data);
            }
            else if (data.date.getFullYear() === 2019) {
                data2019.push(data);
            }
            else if (data.date.getFullYear() === 2020) {
                data2020.push(data);
            }
        }

        console.log(data2018[data2018.length / 2]);
        console.log(data2020[Math.floor(data2020.length / 2)]);
        console.log(data2019[Math.floor(data2019.length / 2)]);

        try {
            const parser = new Parser();
            fs.writeFileSync('2018.csv', parser.parse(data2018));
            fs.writeFileSync('2019.csv', parser.parse(data2019));
            fs.writeFileSync('2020.csv', parser.parse(data2020));
            const parserF = new Parser();
            fs.writeFileSync('freqs.csv', parserF.parse(countries.map(x => ({
                country: x,
                freq: rawData.filter(y => y.country === x).length
            }))));
        } catch (err) {
            console.error(err);
        }
    }
);

