const axios = require('axios');

function getRandomDate() {
  const start = new Date(1950, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomPincode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendCitizenDetails() {
  for (let i = 1; i <= 5; i++) {
    const citizenDetails = {
      first_name: `Citizen${i}`,
      last_name: `World${i+2}`,
      date_of_birth: getRandomDate().toISOString(),
      gender: Math.random() > 0.5 ? "male" : "female",
      address: `Address ${i}`,
      city: `City ${i}`,
      state: "assam",
      pincode: getRandomPincode()
    };

    const url = 'http://localhost:8000';

    try {
      const response = await axios.post(url, citizenDetails);
      console.log(`Citizen ${i} added successfully`, response.data);
    } catch (error) {
      console.error(`Error adding citizen ${i}`, error.response || error.message);
    }
  }
}

sendCitizenDetails();
